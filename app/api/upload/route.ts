import { put, list } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 500 * 1024 * 1024; // 500 MB

function randomId(length = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

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
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  if (!filename) {
    return NextResponse.json({ error: 'filename is required' }, { status: 400 });
  }

  const mimeType = request.headers.get('content-type')?.split(';')[0].trim() ?? '';
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return NextResponse.json(
      { error: 'Only JPEG, PNG, and WebP are allowed' },
      { status: 400 },
    );
  }

  const contentLength = parseInt(request.headers.get('content-length') ?? '0', 10);
  if (contentLength > MAX_BYTES) {
    return NextResponse.json({ error: 'File must be under 500 MB' }, { status: 400 });
  }

  try {
    const blob = await put(`products/${randomId()}-${filename}`, request.body!, {
      access: 'public',
      contentType: mimeType,
    });
    return NextResponse.json(blob);
  } catch (err) {
    console.error('[upload] Vercel Blob error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
