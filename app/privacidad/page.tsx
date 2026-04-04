import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Información sobre el tratamiento de datos personales conforme a la Ley 25.326 de la República Argentina.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-canvas text-stone-900 font-sans">
      <div className="container mx-auto px-6 pt-36 pb-32 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">Legal</p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-16">
          Política de privacidad
        </h1>

        <div className="flex flex-col gap-12 text-sm text-stone-600 leading-relaxed">

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Responsable del tratamiento</h2>
            <p>
              Sansu Design es una marca unipersonal. Ante cualquier consulta relacionada con el tratamiento
              de tus datos personales podés escribir a{' '}
              <a href="mailto:hello@sansu.design" className="text-stone-900 underline underline-offset-4">
                hello@sansu.design
              </a>.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Datos que recopilamos</h2>
            <p>
              Este sitio no utiliza formularios de contacto ni registros de usuario.
              Los únicos datos que podemos recibir son los que vos nos enviás voluntariamente
              al iniciar una conversación por correo electrónico, WhatsApp o Instagram.
            </p>
            <p>
              Esos datos pueden incluir: nombre, dirección de correo electrónico, número de teléfono
              y cualquier información que decidas compartir en el mensaje.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Finalidad del tratamiento</h2>
            <p>
              Utilizamos tus datos exclusivamente para responder a tu consulta o gestionar una compra.
              No los usamos para enviar comunicaciones comerciales no solicitadas.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Transferencia a terceros</h2>
            <p>
              Tus datos personales no son vendidos, cedidos ni compartidos con terceros,
              salvo obligación legal expresa.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Cookies y analítica</h2>
            <p>
              Este sitio utiliza Vercel Analytics para medir el tráfico de forma anónima y
              sin cookies de seguimiento. No se almacena ningún identificador personal
              ni se comparte información con plataformas de publicidad.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Tus derechos</h2>
            <p>
              Conforme a la Ley 25.326 de Protección de Datos Personales de la República Argentina,
              tenés derecho a acceder, rectificar, actualizar y suprimir tus datos personales.
              Para ejercer cualquiera de estos derechos, escribinos a{' '}
              <a href="mailto:hello@sansu.design" className="text-stone-900 underline underline-offset-4">
                hello@sansu.design
              </a>{' '}
              indicando tu nombre y el derecho que querés ejercer. Responderemos en un plazo máximo
              de 5 días hábiles.
            </p>
            <p>
              La Dirección Nacional de Protección de Datos Personales es el organismo de control
              encargado de atender las denuncias y reclamos en materia de protección de datos personales.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Conservación de datos</h2>
            <p>
              Conservamos los datos de contacto únicamente mientras sean necesarios para la finalidad
              por la que fueron recibidos. Una vez resuelta la consulta o finalizada la relación
              comercial, los datos son eliminados.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-900">Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política en cualquier momento. Los cambios entran en vigencia
              desde su publicación en este sitio. Te recomendamos revisarla periódicamente.
            </p>
            <p className="text-stone-400">Última actualización: abril de 2025.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
