import { NextRequest, NextResponse } from 'next/server';
import { getStudioContent, writeYaml } from '@/lib/content';
import type { StudioContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getStudioContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as StudioContent;
  writeYaml('studio.yml', data);
  return NextResponse.json({ ok: true });
}
