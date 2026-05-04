import { NextRequest, NextResponse } from 'next/server';
import { getFaqContent, writeKv } from '@/lib/content';
import type { FaqContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getFaqContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as FaqContent;
  await writeKv('faq', data);
  return NextResponse.json({ ok: true });
}
