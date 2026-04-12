import { NextRequest, NextResponse } from 'next/server';
import { getWorksContent, writeYaml } from '@/lib/content';
import type { WorksContent } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getWorksContent());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as WorksContent;
  writeYaml('works.yml', data);
  return NextResponse.json({ ok: true });
}
