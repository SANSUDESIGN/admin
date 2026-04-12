import { NextRequest, NextResponse } from 'next/server';
import { getProductsData, writeYaml } from '@/lib/content';
import type { ProductsData } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getProductsData());
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as ProductsData;
  writeYaml('products.yml', data);
  return NextResponse.json({ ok: true });
}
