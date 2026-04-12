import { NextRequest, NextResponse } from 'next/server';
import { getFooterContent, writeYaml } from '@/lib/content';
import type { FooterContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getFooterContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as FooterContent;
  writeYaml('footer.yml', data);
  return NextResponse.json({ ok: true });
}
