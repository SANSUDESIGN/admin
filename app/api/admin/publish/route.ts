import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const maxDuration = 120;

export async function POST() {
  const cwd = process.cwd();
  const date = new Date().toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  try {
    // Step 1: build
    await execAsync('npm run build', { cwd, env: { ...process.env, FORCE_COLOR: '0' } });
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message?: string };
    return NextResponse.json(
      { ok: false, step: 'build', error: error.stdout ?? error.message ?? String(err) },
      { status: 500 }
    );
  }

  try {
    // Step 2: commit content changes and push
    await execAsync('git add content/', { cwd });
    await execAsync(`git commit -m "Content update ${date}"`, { cwd });
    await execAsync('git push', { cwd });
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message?: string };
    return NextResponse.json(
      { ok: false, step: 'push', error: error.stderr ?? error.message ?? String(err) },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
