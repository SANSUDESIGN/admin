import { S3Client } from '@aws-sdk/client-s3';

// Cloudflare R2 (S3-compatible) config. Env is set in the Vercel project for
// Production and in `.env.development.local` for local dev:
//   R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET / R2_PUBLIC_BASE
export const R2_BUCKET = process.env.R2_BUCKET!;

// Public serving origin (r2.dev now, cdn.sansu.design later). Trailing slash stripped.
const R2_PUBLIC_BASE = (process.env.R2_PUBLIC_BASE ?? '').replace(/\/+$/, '');

let client: S3Client | null = null;

export function r2Client(): S3Client {
  if (client) return client;
  client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
  return client;
}

// Build the public URL for a stored object key (e.g. "products/abc my photo.jpg").
// Each path segment is URL-encoded so keys with spaces/unicode resolve correctly.
export function publicUrl(key: string): string {
  const path = key
    .replace(/^\/+/, '')
    .split('/')
    .map(encodeURIComponent)
    .join('/');
  return `${R2_PUBLIC_BASE}/${path}`;
}
