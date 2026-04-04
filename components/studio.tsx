export const Studio = () => {
  return (
    <section id="estudio" className="py-32 bg-canvas text-stone-900 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-8 sticky top-32">Sobre mí</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-12">
              Arte que comienza en las manos y termina en tu espacio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-stone-500">
              <p>
                Sansu es el trabajo de una sola artista. Cada escultura y detalle de interior está construido a mano, con formas orgánicas inspiradas en el mundo natural — arcilla, textura, peso y silencio.
              </p>
              <p>
                El estudio se mueve con su creadora. El trabajo sucede en distintos países, con diferente luz, con diferente tierra bajo los pies. Esa inquietud da forma a cada pieza — arte hecho en movimiento, enraizado en el oficio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
