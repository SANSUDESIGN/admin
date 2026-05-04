import { NextRequest, NextResponse } from 'next/server';
import { getStudioContent, writeKv } from '@/lib/content';
import type { StudioContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getStudioContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as StudioContent;
  await writeKv('studio', data);
  return NextResponse.json({ ok: true });
}
