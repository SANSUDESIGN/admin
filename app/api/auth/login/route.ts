import { createHmac } from 'crypto';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const SEVEN_DAYS = 60 * 60 * 24 * 7;

function computeToken(password: string): string {
  return createHmac('sha256', password).update('session').digest('hex');
}

export async function POST(req: Request) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = computeToken(adminPassword);
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SEVEN_DAYS,
    path: '/',
  });

  return res;
}
