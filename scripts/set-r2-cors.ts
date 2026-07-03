/**
 * One-time: configure CORS on the R2 bucket so the admin browser can PUT
 * directly to presigned URLs. Run again any time origins change.
 *
 * Origins: http://localhost:3001 is always allowed; add production admin
 * origin(s) via R2_CORS_ORIGINS (comma-separated), e.g.
 *   R2_CORS_ORIGINS="https://admin.sansu.design,https://admin-xxxx.vercel.app"
 *
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
 * Run: npx tsx scripts/set-r2-cors.ts
 */
import { loadEnvConfig } from '@next/env';
import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';

loadEnvConfig(process.cwd(), true);

const BUCKET = process.env.R2_BUCKET!;

const origins = [
  'http://localhost:3001',
  ...(process.env.R2_CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
];

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function run(): Promise<void> {
  for (const n of ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET']) {
    if (!process.env[n]) {
      console.error(`Missing env: ${n}`);
      process.exit(1);
    }
  }

  await s3.send(
    new PutBucketCorsCommand({
      Bucket: BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: origins,
            AllowedMethods: ['PUT', 'GET', 'HEAD'],
            AllowedHeaders: ['*'],
            ExposeHeaders: ['ETag'],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    }),
  );

  console.log(`CORS set on "${BUCKET}" for origins:\n  ${origins.join('\n  ')}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
