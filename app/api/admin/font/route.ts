import { NextRequest, NextResponse } from 'next/server';
import { getFontContent, writeKv } from '@/lib/content';
import type { FontContent } from '@/lib/types';

function isValidFontName(name: string): boolean {
  return typeof name === 'string' && /^[A-Za-z0-9 ]+$/.test(name.trim()) && name.trim().length > 0;
}

export async function GET() {
  return NextResponse.json(await getFontContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as FontContent;

  if (!isValidFontName(data.headingFont) || !isValidFontName(data.bodyFont)) {
    return NextResponse.json({ ok: false, error: 'Invalid font name' }, { status: 400 });
  }

  const payload: FontContent = {
    headingFont: data.headingFont.trim(),
    bodyFont: data.bodyFont.trim(),
  };

  await writeKv('font', payload);
  return NextResponse.json({ ok: true });
}
