import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';

async function computeToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('session'));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    // No password configured — block access entirely
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const expected = await computeToken(adminPassword);
  if (cookie !== expected) {
    const res = NextResponse.redirect(new URL('/login?expired=1', req.url));
    res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
