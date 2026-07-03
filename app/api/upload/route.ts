import { ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';
import { r2Client, R2_BUCKET, publicUrl } from '@/lib/r2';

const COOKIE_NAME = 'admin_session';
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
const MAX_BYTES = 500 * 1024 * 1024; // 500 MB
const CACHE_CONTROL = 'public, max-age=31536000, immutable';
const PUT_EXPIRY_SECONDS = 600;

async function computeToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('session'));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const expected = await computeToken(adminPassword);
  return cookie === expected;
}

// Gallery: list previously uploaded objects under products/ from R2.
export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const out = await r2Client().send(
      new ListObjectsV2Command({ Bucket: R2_BUCKET, Prefix: 'products/', MaxKeys: 100 }),
    );
    const blobs = (out.Contents ?? [])
      .filter((o) => o.Key && o.Key !== 'products/')
      .sort((a, b) => (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0))
      .map((o) => ({
        url: publicUrl(o.Key!),
        pathname: o.Key!,
        size: o.Size ?? 0,
        uploadedAt: o.LastModified?.toISOString() ?? null,
      }));
    return NextResponse.json({ blobs });
  } catch (err) {
    console.error('[upload] R2 list error:', err);
    return NextResponse.json({ error: 'Failed to list objects' }, { status: 500 });
  }
}

type PresignRequest = {
  pathname?: unknown;
  contentType?: unknown;
  size?: unknown;
};

// Mint a presigned PUT URL so the browser uploads directly to R2.
export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: PresignRequest;
  try {
    body = (await request.json()) as PresignRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { pathname, contentType, size } = body;

  if (typeof pathname !== 'string' || !pathname.startsWith('products/')) {
    return NextResponse.json({ error: 'Invalid pathname' }, { status: 400 });
  }
  if (typeof contentType !== 'string' || !ALLOWED_MIME_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  }
  if (typeof size !== 'number' || !Number.isFinite(size) || size <= 0 || size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 });
  }

  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: pathname,
      ContentType: contentType,
      CacheControl: CACHE_CONTROL,
    });
    const uploadUrl = await getSignedUrl(r2Client(), command, { expiresIn: PUT_EXPIRY_SECONDS });

    // The browser MUST send these exact headers on the PUT or the signature won't match.
    return NextResponse.json({
      uploadUrl,
      url: publicUrl(pathname),
      requiredHeaders: {
        'Content-Type': contentType,
        'Cache-Control': CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error('[upload] presign error:', err);
    return NextResponse.json({ error: 'Failed to prepare upload' }, { status: 500 });
  }
}
