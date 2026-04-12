import type { StudioContent } from '@/lib/types';

export const Studio = ({ content }: { content: StudioContent }) => {
  return (
    <section id="estudio" className="py-32 bg-canvas text-stone-900 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-8 sticky top-32">{content.label}</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg md:text-3xl lg:text-4xl font-light leading-[1.1] tracking-tight mb-6">
              {content.leadParagraph}
            </p>
            <p className="text-base md:text-lg font-light leading-snug tracking-tight text-stone-500 mb-12">
              {content.subParagraph}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-stone-500 mb-12">
              <div className="flex flex-col gap-8">
                {content.column1.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="flex flex-col gap-8">
                {content.column2.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-stone-400 italic">{content.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
