import { NextRequest, NextResponse } from 'next/server';
import { getValuesContent, writeKv } from '@/lib/content';
import type { ValuesContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getValuesContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as ValuesContent;
  await writeKv('values', data);
  return NextResponse.json({ ok: true });
}
