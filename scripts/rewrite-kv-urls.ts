/**
 * One-time: rewrite Vercel Blob image URLs stored in Upstash Redis to the R2
 * public host. Pure host swap — the object path is preserved, which is why the
 * copy step (migrate-blob-to-r2.ts) keys objects by their Blob pathname.
 *
 * Idempotent: re-running after a successful swap is a no-op (nothing left to match).
 *
 * Requires (in .env.local / .env.development.local):
 *   KV_REST_API_URL, KV_REST_API_TOKEN, R2_PUBLIC_BASE
 *
 * Run:  npx tsx scripts/rewrite-kv-urls.ts --dry-run   # preview diffs
 *       npx tsx scripts/rewrite-kv-urls.ts             # write changes
 */
import { loadEnvConfig } from '@next/env';
import { Redis } from '@upstash/redis';

loadEnvConfig(process.cwd(), true);

const DRY_RUN = process.argv.includes('--dry-run');
const KEYS = ['hero', 'works', 'values', 'studio', 'faq', 'footer', 'products'] as const;

// Matches any Vercel Blob host, e.g. https://abc123.public.blob.vercel-storage.com
const BLOB_HOST_RE = /https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com/gi;

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function rewrite(value: unknown, base: string): { value: unknown; count: number } {
  let count = 0;
  const walk = (node: unknown): unknown => {
    if (typeof node === 'string') {
      const next = node.replace(BLOB_HOST_RE, () => {
        count += 1;
        return base;
      });
      return next;
    }
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node)) out[k] = walk(v);
      return out;
    }
    return node;
  };
  const result = walk(value);
  return { value: result, count };
}

async function run(): Promise<void> {
  const base = (process.env.R2_PUBLIC_BASE ?? '').replace(/\/+$/, '');
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN || !base) {
    console.error('Missing env: KV_REST_API_URL, KV_REST_API_TOKEN, R2_PUBLIC_BASE');
    process.exit(1);
  }
  console.log(`${DRY_RUN ? '[dry-run] ' : ''}Rewriting Blob URLs → ${base}\n`);

  let totalReplacements = 0;
  for (const key of KEYS) {
    const current = await redis.get(key);
    if (current == null) {
      console.log(`- ${key}: (empty, skipped)`);
      continue;
    }
    const { value, count } = rewrite(current, base);
    totalReplacements += count;
    if (count === 0) {
      console.log(`= ${key}: no Blob URLs`);
      continue;
    }
    if (DRY_RUN) {
      console.log(`+ ${key}: would replace ${count} URL(s)`);
      continue;
    }
    await redis.set(key, value);
    console.log(`+ ${key}: replaced ${count} URL(s)`);
  }

  console.log(`\nDone. total replacements${DRY_RUN ? '(would)' : ''}=${totalReplacements}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
