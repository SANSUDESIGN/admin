export const Studio = () => {
  return (
    <section id="estudio" className="py-32 bg-canvas text-stone-900 border-t border-stone-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-8 sticky top-32">Sobre mí</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg md:text-3xl lg:text-4xl font-light leading-[1.1] tracking-tight mb-6">
              SANSU es un estudio dedicado a la escultura contemporánea y a piezas murales en relieve.
            </p>
            <p className="text-base md:text-lg font-light leading-snug tracking-tight text-stone-500 mb-12">
              Cada obra se desarrolla como una pieza única, concebida para integrarse al espacio con precisión y presencia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-stone-500 mb-12">
              <div className="flex flex-col gap-8">
                <p>
                  Fundado por una artista mexicana radicada en Argentina, el estudio surge de una práctica centrada en la exploración de la forma, el volumen y la superficie. A través de técnicas mixtas, cada pieza dialoga con la luz y el entorno que la rodea.
                </p>
                <p>
                  Cada obra es realizada en su totalidad por la artista: desde la estructura inicial hasta los acabados finales. El proceso es directo y manual, guiado por la observación y la repetición, con particular atención al detalle, la proporción y el ritmo de cada forma.
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <p>
                  El trabajo nace de una práctica constante y consciente, donde la relación con los materiales y el tiempo es lo que define el resultado. Las piezas no responden a una lógica decorativa, sino que se conciben como elementos que estructuran, acompañan y transforman el espacio desde la sobriedad.
                </p>
                <p>
                  SANSU existe en el cruce entre el arte y el diseño. Las obras están pensadas para integrarse a la arquitectura, sumando textura, ritmo y carácter.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-stone-400 italic">
              Piezas que no compiten con el espacio, pero que tampoco pasan inadvertidas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
