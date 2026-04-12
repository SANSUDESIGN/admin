import { NextRequest, NextResponse } from 'next/server';
import { getHeroContent, writeYaml } from '@/lib/content';
import type { HeroContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getHeroContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as HeroContent;
  writeYaml('hero.yml', data);
  return NextResponse.json({ ok: true });
}
