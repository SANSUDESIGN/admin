import { NextRequest, NextResponse } from 'next/server';
import { getProductsData, writeKv } from '@/lib/content';
import type { ProductsData } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getProductsData());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as ProductsData;
  await writeKv('products', data);
  return NextResponse.json({ ok: true });
}
