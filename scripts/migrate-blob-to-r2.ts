/**
 * One-time: copy every object from Vercel Blob to Cloudflare R2.
 *
 * The R2 key is set to the object's Blob pathname (decoded), so the stored URLs
 * in Upstash Redis can later be migrated with a pure host swap (see
 * rewrite-kv-urls.ts). Idempotent: objects already present in R2 are skipped.
 *
 * Requires (in .env.local / .env.development.local):
 *   BLOB_READ_WRITE_TOKEN, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID,
 *   R2_SECRET_ACCESS_KEY, R2_BUCKET
 *
 * Run:  npx tsx scripts/migrate-blob-to-r2.ts --dry-run   # preview only
 *       npx tsx scripts/migrate-blob-to-r2.ts             # perform the copy
 */
import { loadEnvConfig } from '@next/env';
import { list } from '@vercel/blob';
import { S3Client, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

loadEnvConfig(process.cwd(), true);

const DRY_RUN = process.argv.includes('--dry-run');
const BUCKET = process.env.R2_BUCKET!;
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

function requireEnv(...names: string[]): void {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    console.error(`Missing env: ${missing.join(', ')}`);
    process.exit(1);
  }
}

async function existsInR2(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch (err) {
    const name = (err as { name?: string }).name;
    const status = (err as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
    if (name === 'NotFound' || name === 'NoSuchKey' || status === 404) return false;
    throw err;
  }
}

async function run(): Promise<void> {
  requireEnv('BLOB_READ_WRITE_TOKEN', 'R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET');
  console.log(`${DRY_RUN ? '[dry-run] ' : ''}Copying Vercel Blob → R2 bucket "${BUCKET}"\n`);

  let cursor: string | undefined;
  let total = 0;
  let copied = 0;
  let skipped = 0;
  let failed = 0;

  do {
    const page = await list({ cursor, limit: 1000 });
    for (const blob of page.blobs) {
      total += 1;
      const key = blob.pathname; // decoded object path; matches the URL path after host swap

      try {
        if (await existsInR2(key)) {
          skipped += 1;
          console.log(`= skip   ${key}`);
          continue;
        }
        if (DRY_RUN) {
          copied += 1;
          console.log(`+ would  ${key}`);
          continue;
        }

        const resp = await fetch(blob.url);
        if (!resp.ok) throw new Error(`fetch ${resp.status}`);
        const bytes = Buffer.from(await resp.arrayBuffer());
        const contentType = resp.headers.get('content-type') ?? 'application/octet-stream';

        await s3.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: bytes,
            ContentType: contentType,
            CacheControl: CACHE_CONTROL,
          }),
        );
        copied += 1;
        console.log(`+ copied ${key} (${bytes.length} bytes, ${contentType})`);
      } catch (err) {
        failed += 1;
        console.error(`! FAIL   ${key}: ${(err as Error).message}`);
      }
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  console.log(
    `\nDone. total=${total} copied${DRY_RUN ? '(would)' : ''}=${copied} skipped=${skipped} failed=${failed}`,
  );
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
