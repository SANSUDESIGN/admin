'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expired = searchParams.get('expired') === '1';

  const [password, setPassword] = useState('');
  const [error, setError] = useState(expired ? 'Tu sesión expiró. Ingresa nuevamente.' : '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.ok) {
        router.push('/admin');
        return;
      }
    }

    setError('Contraseña incorrecta.');
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Admin</p>
        <h1 className="font-bold text-lg tracking-tight uppercase mb-10">SANSU/ DESIGN</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs uppercase tracking-widest text-stone-500">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-900 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-wait"
          >
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
