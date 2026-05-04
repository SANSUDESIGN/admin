import { NextRequest, NextResponse } from 'next/server';
import { getFooterContent, writeKv } from '@/lib/content';
import type { FooterContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getFooterContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as FooterContent;
  await writeKv('footer', data);
  return NextResponse.json({ ok: true });
}
