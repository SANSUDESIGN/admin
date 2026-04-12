import { NextRequest, NextResponse } from 'next/server';
import { getValuesContent, writeYaml } from '@/lib/content';
import type { ValuesContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getValuesContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as ValuesContent;
  writeYaml('values.yml', data);
  return NextResponse.json({ ok: true });
}
