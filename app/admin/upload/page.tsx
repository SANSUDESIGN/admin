'use client';

import type { ListBlobResultBlob, PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef, useEffect } from 'react';

function randomId(length = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

type FileResult =
  | { name: string; status: 'uploading' }
  | { name: string; status: 'success'; blob: PutBlobResult }
  | { name: string; status: 'error'; error: string };

export default function UploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<FileResult[]>([]);
  const [gallery, setGallery] = useState<ListBlobResultBlob[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    fetch('/api/upload')
      .then((r) => r.json())
      .then((data: { blobs?: ListBlobResultBlob[] }) => setGallery(data.blobs ?? []))
      .catch(() => {})
      .finally(() => setGalleryLoading(false));
  }, []);

  function updateResult(name: string, next: FileResult) {
    setResults((prev) => prev.map((r) => (r.name === name ? next : r)));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const files = inputFileRef.current?.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const fileList = Array.from(files);

    setResults((prev) => [
      ...prev,
      ...fileList.map((f): FileResult => ({ name: f.name, status: 'uploading' })),
    ]);

    try {
      for (const file of fileList) {
        try {
          const pathname = `products/${randomId()}-${file.name}`;
          const blob = await upload(pathname, file, {
            access: 'public',
            handleUploadUrl: '/api/upload',
          });
          updateResult(file.name, { name: file.name, status: 'success', blob });
          setGallery((prev) => [blob as unknown as ListBlobResultBlob, ...prev]);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Upload failed';
          updateResult(file.name, { name: file.name, status: 'error', error: message });
        }
      }
    } finally {
      setUploading(false);
      if (inputFileRef.current) inputFileRef.current.value = '';
    }
  }

  const successResults = results.filter((r): r is Extract<FileResult, { status: 'success' }> => r.status === 'success');

  function copyAll() {
    navigator.clipboard.writeText(successResults.map((r) => r.blob.url).join('\n'));
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1500);
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
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <p className="text-xs uppercase tracking-widest text-stone-400">URLs generadas</p>
              {successResults.length > 1 && (
                <button
                  onClick={copyAll}
                  className="text-xs uppercase tracking-widest text-stone-900 underline underline-offset-4"
                >
                  Copiar todas
                </button>
              )}
            </div>

            {results.map((result) => {
              if (result.status === 'uploading') {
                return (
                  <div key={result.name} className="flex gap-4 items-center border-b border-stone-100 pb-4">
                    <div className="w-16 h-16 bg-stone-100 shrink-0 animate-pulse" />
                    <p className="text-xs text-stone-400">{result.name} — Subiendo…</p>
                  </div>
                );
              }

              if (result.status === 'error') {
                return (
                  <div key={result.name} className="flex gap-4 items-start border-b border-stone-100 pb-4">
                    <div className="w-16 h-16 bg-red-50 shrink-0 flex items-center justify-center">
                      <span className="text-red-400 text-lg">✕</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-stone-500">{result.name}</p>
                      <p className="text-xs text-red-500">{result.error}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={result.blob.url} className="flex gap-4 items-start border-b border-stone-100 pb-4">
                  <img src={result.blob.url} alt="" className="w-16 h-16 object-cover bg-stone-100 shrink-0" />
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-xs text-stone-400 truncate">{result.blob.pathname}</p>
                    <p className="text-xs font-mono text-stone-700 break-all">{result.blob.url}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.blob.url)}
                      className="w-fit text-xs uppercase tracking-widest text-stone-900 underline underline-offset-4 mt-1"
                    >
                      Copiar URL
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Persistent gallery */}
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-3 mb-6">
            Subidas anteriores
          </p>

          {galleryLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-stone-100 animate-pulse" />
              ))}
            </div>
          ) : gallery.length === 0 ? (
            <p className="text-xs text-stone-400">No hay imágenes subidas aún.</p>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {gallery.slice(0, visibleCount).map((blob) => (
                  <button
                    key={blob.url}
                    onClick={() => copyUrl(blob.url)}
                    title={blob.pathname}
                    className="relative aspect-square bg-stone-100 overflow-hidden group focus:outline-none"
                  >
                    <img
                      src={blob.url}
                      alt=""
                      className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-60"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {copiedUrl === blob.url ? '¡Copiado!' : 'Copiar URL'}
                    </span>
                  </button>
                ))}
              </div>
              {visibleCount < gallery.length && (
                <button
                  onClick={() => setVisibleCount((n) => n + 4)}
                  className="mt-4 text-xs uppercase tracking-widest text-stone-900 underline underline-offset-4"
                >
                  Mostrar 4 más ({gallery.length - visibleCount} restantes)
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
