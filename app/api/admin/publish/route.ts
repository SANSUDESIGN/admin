import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST() {
  const hookUrl = process.env.DEPLOY_HOOK_URL;
  if (!hookUrl) {
    return NextResponse.json({ ok: false, error: 'DEPLOY_HOOK_URL not configured' }, { status: 500 });
  }

  const res = await fetch(hookUrl, { method: 'POST' });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: `Deploy hook responded with ${res.status}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
