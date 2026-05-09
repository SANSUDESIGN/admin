/**
 * One-time migration: reads YAML content files and writes them to Vercel KV.
 * Requires KV_REST_API_URL and KV_REST_API_TOKEN in .env.local.
 *
 * Run: npx tsx scripts/seed-kv.ts
 */
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Redis } from '@upstash/redis';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd(), true);

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const contentDir = path.join(process.cwd(), 'content');

const sections = ['hero', 'works', 'values', 'studio', 'faq', 'footer', 'products', 'font'] as const;

async function seed() {
  for (const key of sections) {
    const filePath = path.join(contentDir, `${key}.yml`);
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(raw);
    await redis.set(key, data);
    console.log(`✓ Seeded "${key}"`);
  }
  console.log('\nAll sections seeded successfully.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
