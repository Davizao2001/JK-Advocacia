'use client';

import { useEffect, useState } from 'react';
import HeroImagem from './HeroImagem';
import TriagemContato from './TriagemContato';
import { IconeEstrela, IconeSeta } from './ui/Icones';
import { hero, site } from '@/content/site';

export default function Hero() {
  const imagens = site.imagens.hero;
  const [ativo, setAtivo] = useState(0);

  // O índice ativo mora aqui (não mais dentro de HeroImagem) porque o texto
  // também precisa saber qual foto está visível — cada foto tem seu próprio
  // enquadramento, e o texto muda de lado para nunca cobrir o letreiro da
  // parede na foto do escritório.
  useEffect(() => {
    if (imagens.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const intervalo = window.setInterval(() => {
      setAtivo((i) => (i + 1) % imagens.length);
    }, 6500);

    return () => window.clearInterval(intervalo);
  }, [imagens.length]);

  const imagemAtiva = imagens[ativo];
  const naEsquerda = imagemAtiva?.textoPosicao === 'esquerda';

  // Propriedades como alinhamento de texto, `order` e o lado da margem não
  // têm como ser animadas suavemente pelo CSS — a troca é sempre um salto.
  // Em vez de lutar contra isso, escondemos o salto: o bloco de texto some
  // (fade + leve deslocamento) antes da troca, o alinhamento muda enquanto
  // ele está invisível, e então ele reaparece já no novo lado. O resultado
  // visual é uma transição fluida, mesmo por baixo sendo um corte.
  const [naEsquerdaExibida, setNaEsquerdaExibida] = useState(naEsquerda);
  const [textoVisivel, setTextoVisivel] = useState(true);
  useEffect(() => {
    if (naEsquerda === naEsquerdaExibida) return;
    setTextoVisivel(false);
    const trocarLado = window.setTimeout(() => setNaEsquerdaExibida(naEsquerda), 620);
    const reaparecer = window.setTimeout(() => setTextoVisivel(true), 680);
    return () => {
      window.clearTimeout(trocarLado);
      window.clearTimeout(reaparecer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naEsquerda]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-marinho-900 sm:items-center"
      aria-labelledby="hero-titulo"
    >
      {/* Fotografia em tela cheia, atrás de todo o conteúdo */}
      <div className="absolute inset-0">
        <HeroImagem imagens={imagens} ativo={ativo} />
      </div>

      {/* Véu escuro uniforme — garante leitura do texto em qualquer parte da foto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-marinho-900/35"
      />

      {/* Mobile: gradiente de baixo para cima, texto ancorado na base da tela */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-marinho-900/92 via-marinho-900/55 to-transparent sm:hidden"
      />

      {/* Desktop: o degradê escurece o lado onde o texto está, preservando o
          resto da foto totalmente visível. Duas camadas sobrepostas, uma para
          cada lado, que fazem crossfade entre si — trocar a direção de um
          gradiente de uma vez só não é algo que o CSS consiga animar, então
          em vez disso uma desaparece enquanto a outra aparece. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-marinho-900/90 via-marinho-900/45 to-transparent transition-opacity duration-[1400ms] ease-suave sm:block ${
          naEsquerdaExibida ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-marinho-900/90 via-marinho-900/45 to-transparent transition-opacity duration-[1400ms] ease-suave sm:block ${
          naEsquerdaExibida ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="container-site relative w-full pb-14 pt-[calc(104px+2.5rem)] sm:pb-24 sm:pt-[120px]">
        <div
          className={`max-w-[34rem] transition-all duration-[560ms] ease-suave sm:max-w-[36rem] ${
            naEsquerdaExibida ? 'mr-auto text-left' : 'ml-auto text-right'
          } ${textoVisivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          <p className="animate-fade-up text-[0.72rem] font-medium uppercase tracking-[0.18em] text-dourado-400">
            Advocacia em São Paulo
          </p>

          {/* Título com efeito de "portal se abrindo" — uma cortina escura
              desliza revelando o texto, ecoando o motivo de arco da assinatura visual. */}
          <div className="relative mt-6 overflow-hidden">
            <h1
              id="hero-titulo"
              className="font-serif text-[2rem] font-normal leading-[1.16] text-areia-50 sm:text-[2.75rem] lg:text-[3.2rem]"
            >
              {hero.titulo}
            </h1>
            <span
              aria-hidden="true"
              className="cortina-abertura absolute inset-0 animate-abrir-porta bg-marinho-900 [animation-delay:150ms]"
            />
          </div>

          <p
            className={`mt-6 max-w-[30rem] animate-fade-up text-[1.02rem] leading-[1.75] text-areia-100/90 [animation-delay:900ms] ${
              naEsquerdaExibida ? 'mr-auto' : 'ml-auto'
            }`}
          >
            {hero.texto}
          </p>

          <div
            className={`mt-8 flex animate-fade-up flex-col items-stretch gap-3 [animation-delay:980ms] sm:flex-row sm:items-center ${
              naEsquerdaExibida ? 'sm:justify-start' : 'sm:justify-end'
            }`}
          >
            <TriagemContato
              rotuloBotao={hero.botaoPrimario}
              className={`btn-primario order-1 ${naEsquerdaExibida ? 'sm:order-1' : 'sm:order-2'}`}
            />
            <a href="#areas" className={`btn-secundario-claro group order-2 ${naEsquerdaExibida ? 'sm:order-2' : 'sm:order-1'}`}>
              {hero.botaoSecundario}
              <IconeSeta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Elemento de confiança — discreto, sem aparência de marketplace */}
          <div
            className={`mt-8 flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-2 [animation-delay:1060ms] ${
              naEsquerdaExibida ? 'justify-start' : 'justify-end'
            }`}
          >
            <span className="flex items-center gap-2 text-[0.92rem] text-areia-100/90">
              <IconeEstrela className="h-4 w-4 text-dourado-400" />
              <strong className="font-medium text-areia-50">{site.google.nota} no Google</strong>
              <span className="text-areia-200/70">· {site.google.quantidade} avaliações</span>
            </span>
          </div>

          <p
            className={`mt-6 max-w-sm animate-fade-up text-[0.86rem] italic leading-relaxed text-areia-200/65 [animation-delay:1140ms] ${
              naEsquerdaExibida ? 'mr-auto border-l border-dourado-400/45 pl-4' : 'ml-auto border-r border-dourado-400/45 pr-4'
            }`}
          >
            {hero.observacao}
          </p>
        </div>
      </div>

      {/* Indicador discreto de rolagem — some sozinho com prefers-reduced-motion */}
      <a
        href="#areas"
        aria-label="Rolar para conhecer as áreas de atuação"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-areia-50/60 transition-colors duration-300 hover:text-areia-50 sm:block"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path d="M12 4v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
