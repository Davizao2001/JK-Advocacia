'use client';

import Reveal from './ui/Reveal';
import { IconeCoracao, IconeMaleta, IconePlay } from './ui/Icones';
import { useStories } from './StoriesProvider';
import { conteudo } from '@/content/site';

const iconePorTema: Record<string, typeof IconeCoracao> = {
  Família: IconeCoracao,
  Trabalho: IconeMaleta,
};

/**
 * Seção "Conteúdo informativo" no formato de Stories do Instagram: um bolinha
 * por tema, que abre o visualizador em tela cheia (compartilhado com o atalho
 * flutuante do site via `StoriesProvider`/`useStories`). Enquanto os vídeos
 * reais não chegam, cada história mostra um selo "Em breve" — assim que o
 * campo `video` de um artigo for preenchido em site.ts, ela passa a tocar
 * automaticamente, sem precisar mexer neste componente.
 */
export default function Conteudo() {
  const { grupos, abrirGrupo } = useStories();

  if (grupos.length === 0) return null;

  return (
    <section
      id="conteudo-informativo"
      aria-labelledby="conteudo-titulo"
      className="scroll-mt-24 bg-areia-100 py-20 sm:py-28"
    >
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="sobretitulo">{conteudo.sobretitulo}</p>
          <h2 id="conteudo-titulo" className="titulo-secao">
            {conteudo.titulo}
          </h2>
          <p className="texto-secao">{conteudo.texto}</p>
        </Reveal>

        {/* Bolinhas de histórias, uma por tema — mesma lógica do Instagram */}
        <Reveal variante="escala" delay={100} className="mt-12">
          <ul className="flex flex-wrap gap-x-7 gap-y-6">
            {grupos.map((grupo, i) => {
              const Icone = iconePorTema[grupo.tema] ?? IconePlay;
              return (
                <li key={grupo.tema}>
                  <button
                    type="button"
                    onClick={() => abrirGrupo(i)}
                    className="group flex flex-col items-center gap-2.5"
                  >
                    <span
                      className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full
                                 bg-gradient-to-tr from-dourado-300 via-dourado-500 to-marinho-600 p-[3px]
                                 transition-transform duration-300 ease-suave group-hover:scale-[1.06] group-active:scale-95"
                    >
                      <span className="grid h-full w-full place-items-center rounded-full border-[3px] border-areia-100 bg-marinho-800">
                        <Icone className="h-7 w-7 text-areia-50" />
                      </span>
                    </span>
                    <span className="text-[0.78rem] font-medium text-tinta-600">{grupo.tema}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 border-l border-dourado-400/45 pl-4 text-[0.86rem] italic leading-relaxed text-tinta-400">
            {conteudo.aviso}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
