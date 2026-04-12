import { NextRequest, NextResponse } from 'next/server';
import { getFaqContent, writeYaml } from '@/lib/content';
import type { FaqContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getFaqContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as FaqContent;
  writeYaml('faq.yml', data);
  return NextResponse.json({ ok: true });
}
