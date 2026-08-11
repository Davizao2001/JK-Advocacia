'use client';

import { useEffect } from 'react';
import Reveal from './ui/Reveal';
import { IconeInstagram, IconeSeta } from './ui/Icones';
import { reels, site } from '@/content/site';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/**
 * Seção de Reels do Instagram.
 * Usa o embed oficial da Meta (sem raspagem de dados) — cada vídeo aparece
 * exatamente como no perfil, com curtidas, legenda e link de origem.
 *
 * A seção só é renderizada quando `reels.itens` (em src/content/site.ts)
 * tiver pelo menos um link. Até lá, fica oculta — nada de placeholder.
 */
export default function Reels() {
  const itens = reels.itens;

  useEffect(() => {
    if (itens.length === 0) return;

    const existente = document.getElementById('script-instagram-embed');
    if (existente) {
      window.instgrm?.Embeds.process();
      return;
    }

    const script = document.createElement('script');
    script.id = 'script-instagram-embed';
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, [itens.length]);

  if (itens.length === 0) return null;

  return (
    <section
      id="reels"
      aria-labelledby="reels-titulo"
      className="scroll-mt-24 bg-areia-200 py-20 sm:py-28"
    >
      <div className="container-site">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="sobretitulo">{reels.sobretitulo}</p>
            <h2 id="reels-titulo" className="titulo-secao">
              {reels.titulo}
            </h2>
            <p className="texto-secao">{reels.texto}</p>
          </div>

          <a
            href={site.contato.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sutil group shrink-0"
          >
            <IconeInstagram className="h-[1.05rem] w-[1.05rem]" />
            {reels.botao}
            <IconeSeta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>

        {/*
          items-start evita que o grid estique os cartões mais curtos até a
          altura do mais alto — cada embed do Instagram tem uma proporção
          própria (post quadrado ou reel vertical), então cada coluna se
          ajusta à sua própria altura, sem espaços em branco no fim do card.
        */}
        <div className="mt-12 grid items-start justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item, i) => (
            <Reveal
              key={item.url}
              delay={i * 110}
              className="w-full max-w-[340px] border border-tinta-400/15 bg-areia-50 p-3 shadow-[0_1px_2px_rgba(16,30,53,0.06)]"
            >
              {/* overflow-hidden aparara a barra de rolagem interna que o
                  embed do Instagram às vezes injeta, mantendo o cartão limpo */}
              <div className="overflow-hidden">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={item.url}
                  data-instgrm-version="14"
                  style={{ margin: '0 auto', width: '100%', maxWidth: '326px', minWidth: '236px' }}
                />
              </div>
              {item.legenda && (
                <p className="mt-3 px-1 text-center text-[0.88rem] text-tinta-500">
                  {item.legenda}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
