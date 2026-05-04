import { NextRequest, NextResponse } from 'next/server';
import { getHeroContent, writeKv } from '@/lib/content';
import type { HeroContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getHeroContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as HeroContent;
  await writeKv('hero', data);
  return NextResponse.json({ ok: true });
}
