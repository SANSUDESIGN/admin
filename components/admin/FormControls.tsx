'use client';

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function Field({ label, value, onChange, placeholder }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-stone-400">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-stone-900 transition-colors"
      />
    </div>
  );
}

interface TextareaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}

export function Textarea({ label, value, onChange, rows = 4, placeholder }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-stone-400">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="border border-stone-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-stone-900 transition-colors resize-y"
      />
    </div>
  );
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function SaveButton({ status, onSave }: { status: SaveStatus; onSave: () => void }) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <button
        onClick={onSave}
        disabled={status === 'saving'}
        className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-700 disabled:opacity-40 transition-colors"
      >
        {status === 'saving' ? 'Guardando…' : 'Guardar'}
      </button>
      {status === 'saved' && <span className="text-xs text-green-700 uppercase tracking-widest">Guardado</span>}
      {status === 'error' && <span className="text-xs text-red-600 uppercase tracking-widest">Error al guardar</span>}
    </div>
  );
}
