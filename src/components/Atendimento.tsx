import Reveal from './ui/Reveal';
import { atendimento } from '@/content/site';

export default function Atendimento() {
  return (
    <section
      aria-labelledby="atendimento-titulo"
      className="bg-areia-200 py-20 sm:py-28"
    >
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="sobretitulo">{atendimento.sobretitulo}</p>
          <h2 id="atendimento-titulo" className="titulo-secao">
            {atendimento.titulo}
          </h2>
        </Reveal>

        <div className="relative mt-16 pl-8 sm:pl-0">
          {/* Traço vertical que se desenha conforme a seção entra na tela (mobile) */}
          <Reveal
            variante="linha"
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-dourado-400/40 sm:hidden"
          >
            <span className="sr-only" />
          </Reveal>

          <ol className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {atendimento.etapas.map((etapa, i) => (
              <Reveal as="li" key={etapa.titulo} delay={i * 150} className="relative">
                {/* Marcador mobile */}
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-dourado-500/70 bg-areia-200 sm:hidden"
                >
                  <span className="h-1 w-1 rounded-full bg-dourado-500" />
                </span>

                {/* Segmento do traço até o próximo ponto — desenha em sequência,
                    dando o efeito de continuidade 1 ──› 2 ──› 3 ──› 4 (telas largas) */}
                {i < atendimento.etapas.length - 1 && (
                  <Reveal
                    variante="linha-h"
                    delay={i * 850}
                    className="absolute left-[15px] top-[15px] hidden h-px w-[calc(100%+2rem)] bg-tinta-400/35 lg:block"
                  />
                )}

                {/* Marcador numerado — tablet/desktop, sobre o traço contínuo */}
                <span
                  aria-hidden="true"
                  className="relative z-10 hidden h-[30px] w-[30px] place-items-center rounded-full
                             border border-dourado-500/70 bg-areia-200 font-serif text-[0.85rem]
                             text-dourado-600 sm:grid"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h3 className="mt-4 font-serif text-[1.16rem] leading-snug text-tinta-800 sm:mt-5">
                  <span className="mr-2 font-sans text-[0.8rem] text-dourado-600 sm:hidden">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {etapa.titulo}
                </h3>
                <p className="mt-3 text-[0.94rem] leading-[1.7] text-tinta-500">
                  {etapa.texto}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
