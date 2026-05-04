import { NextRequest, NextResponse } from 'next/server';
import { getWorksContent, writeKv } from '@/lib/content';
import type { WorksContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getWorksContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as WorksContent;
  await writeKv('works', data);
  return NextResponse.json({ ok: true });
}
