import { list } from '@vercel/blob';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
const MAX_BYTES = 500 * 1024 * 1024; // 500 MB

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

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: 'products/', limit: 100 });
    return NextResponse.json({ blobs });
  } catch (err) {
    console.error('[upload] Vercel Blob list error:', err);
    return NextResponse.json({ error: 'Failed to list blobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  // Completion callbacks come from Vercel's servers (no cookie) — verified internally by handleUpload.
  // Token generation requests come from the browser and must be authenticated.
  if (body.type === 'blob.generate-client-token') {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ALLOWED_MIME_TYPES,
          maximumSizeInBytes: MAX_BYTES,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[upload] completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error('[upload] handleUpload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
