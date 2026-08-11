'use client';

import { useId, useState } from 'react';
import Reveal from './ui/Reveal';
import { duvidas } from '@/content/site';

export default function Duvidas() {
  // A primeira pergunta fica fixa, já respondida, na coluna da esquerda —
  // preenche o espaço que antes ficava vazio ali e funciona como uma
  // resposta imediata para a dúvida mais comum. As demais seguem no
  // acordeão da direita.
  const [primeira, ...resto] = duvidas.itens;
  const [aberto, setAberto] = useState<number | null>(null);
  const idBase = useId();

  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-titulo"
      className="scroll-mt-24 bg-areia-200 py-20 sm:py-28"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
        <Reveal>
          <p className="sobretitulo">{duvidas.sobretitulo}</p>
          <h2 id="duvidas-titulo" className="titulo-secao">
            {duvidas.titulo}
          </h2>

          {primeira && (
            <div className="mt-9 border-t border-tinta-400/15 pt-7">
              <p className="font-serif text-[1.08rem] leading-snug text-tinta-800">
                {primeira.pergunta}
              </p>
              <p className="mt-3 max-w-prose text-[0.95rem] leading-[1.75] text-tinta-500">
                {primeira.resposta}
              </p>
            </div>
          )}
        </Reveal>

        <Reveal delay={120}>
          <ul className="border-t border-tinta-400/15">
            {resto.map((item, i) => {
              const estaAberto = aberto === i;
              const botaoId = `${idBase}-botao-${i}`;
              const painelId = `${idBase}-painel-${i}`;

              return (
                <li key={item.pergunta} className="border-b border-tinta-400/15">
                  <h3>
                    <button
                      type="button"
                      id={botaoId}
                      aria-expanded={estaAberto}
                      aria-controls={painelId}
                      onClick={() => setAberto(estaAberto ? null : i)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left
                                 transition-colors duration-300 hover:text-marinho-700"
                    >
                      <span className="font-serif text-[1.06rem] leading-snug text-tinta-800">
                        {item.pergunta}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative mt-1.5 block h-3.5 w-3.5 shrink-0 text-marinho-600"
                      >
                        <span className="absolute left-0 top-1/2 block h-px w-3.5 -translate-y-1/2 bg-current" />
                        <span
                          className={`absolute left-1/2 top-0 block h-3.5 w-px -translate-x-1/2 bg-current
                                      transition-transform duration-300 ease-suave ${
                                        estaAberto ? 'scale-y-0' : 'scale-y-100'
                                      }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={painelId}
                    role="region"
                    aria-labelledby={botaoId}
                    data-aberto={estaAberto}
                    className="acordeao-conteudo"
                  >
                    <div>
                      <p className="max-w-prose pb-7 pr-8 text-[0.95rem] leading-[1.75] text-tinta-500">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
