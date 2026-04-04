import { Mail, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contacto" className="bg-night text-white pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-medium tracking-tight">Hablemos de arte.</h3>
            <a
              href="mailto:hello@sansu.design"
              className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors text-lg"
            >
              <Mail size={20} />
              hello@sansu.design
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-2">Estudio</h4>
            <p className="text-sm leading-relaxed text-stone-300">
              El mundo es mi estudio.<br />
              Viajo constantemente y creo desde donde esté — Buenos Aires, un pueblo de montaña, una mesa prestada. Cada pieza se envía desde donde esté la arcilla.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-2">Redes</h4>
            <a
              href="https://www.instagram.com/sansuart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors"
            >
              <Instagram size={16} /> @sansuart
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-stone-700 pt-8">
          <div className="mb-8 md:mb-0">
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-stone-800 uppercase select-none pointer-events-none">
              Sansu
            </h1>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-8 text-xs text-stone-500 uppercase tracking-widest">
              <a href="/privacidad" className="hover:text-white transition-colors">Política de privacidad</a>
              <span>© 2025 Sansu Design</span>
            </div>
            <p className="text-xs text-stone-600 max-w-xs text-right leading-relaxed">
              Conforme a la Ley 25.326 de Protección de Datos Personales (Argentina). Tus datos nunca son compartidos con terceros.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
