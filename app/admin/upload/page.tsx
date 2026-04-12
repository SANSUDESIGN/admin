'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

export default function UploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<PutBlobResult[]>([]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const files = inputFileRef.current?.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploaded: PutBlobResult[] = [];

    for (const file of Array.from(files)) {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const blob = (await response.json()) as PutBlobResult;
      uploaded.push(blob);
    }

    setResults((prev) => [...prev, ...uploaded]);
    setUploading(false);
    if (inputFileRef.current) inputFileRef.current.value = '';
  }

  function copyAll() {
    const urls = results.map((r) => r.url).join('\n');
    navigator.clipboard.writeText(urls);
  }

  return (
    <main className="min-h-screen bg-stone-50 font-sans p-12">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">Admin</p>
        <h1 className="text-3xl font-light tracking-tighter mb-10">Subir imágenes al CDN</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
          <input
            ref={inputFileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            required
            className="text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:border file:border-stone-900 file:text-xs file:uppercase file:tracking-widest file:bg-transparent file:cursor-pointer hover:file:bg-stone-900 hover:file:text-white transition-colors"
          />
          <button
            type="submit"
            disabled={uploading}
            className="w-fit px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-700 transition-colors disabled:opacity-40"
          >
            {uploading ? 'Subiendo...' : 'Subir'}
          </button>
        </form>

        {results.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <p className="text-xs uppercase tracking-widest text-stone-400">URLs generadas</p>
              <button
                onClick={copyAll}
                className="text-xs uppercase tracking-widest text-stone-900 underline underline-offset-4"
              >
                Copiar todas
              </button>
            </div>

            {results.map((blob) => (
              <div key={blob.url} className="flex gap-4 items-start border-b border-stone-100 pb-4">
                <img src={blob.url} alt="" className="w-16 h-16 object-cover bg-stone-100 shrink-0" />
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-xs text-stone-400 truncate">{blob.pathname}</p>
                  <p className="text-xs font-mono text-stone-700 break-all">{blob.url}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(blob.url)}
                    className="w-fit text-xs uppercase tracking-widest text-stone-900 underline underline-offset-4 mt-1"
                  >
                    Copiar URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
