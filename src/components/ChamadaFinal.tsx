'use client';

import { useEffect, useRef, useState } from 'react';
import DivisorArco from './ui/DivisorArco';
import TriagemContato from './TriagemContato';
import { chamadaFinal } from '@/content/site';

/**
 * Fecha o site em tela cheia, ecoando a hero — o vídeo do escritório ocupa
 * a seção inteira e entra com um leve zoom conforme a página chega até
 * aqui. Só toca enquanto está visível, para não gastar recursos à toa.
 */
export default function ChamadaFinal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisivel(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisivel(entry.isIntersecting);
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="chamada-final-titulo"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-marinho-900 text-areia-100"
    >
      {/* Vídeo em tela cheia, atrás de todo o conteúdo */}
      <div
        aria-hidden="true"
        data-visivel={visivel}
        className="video-zoom-entrada absolute inset-0"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/images/escritorio-video-poster.jpg"
          className="h-full w-full object-cover object-[66%_50%] sm:object-center"
        >
          <source src="/videos/escritorio.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Véu escuro — garante leitura do texto sobre o vídeo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-marinho-900/55" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-marinho-900/95 via-marinho-900/35 to-marinho-900/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-marinho-700/30 blur-3xl"
      />

      <div className="container-site relative w-full py-24 sm:py-28">
        <DivisorArco className="mb-10 opacity-90" />

        <div data-visivel={visivel} className="reveal mx-auto max-w-3xl text-center">
          <h2
            id="chamada-final-titulo"
            className="font-serif text-[1.85rem] leading-[1.25] text-areia-50 sm:text-[2.4rem]"
          >
            {chamadaFinal.titulo}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-[1.75] text-areia-200/85">
            {chamadaFinal.texto}
          </p>

          <TriagemContato rotuloBotao={chamadaFinal.botao} className="btn-claro mt-9" />

          <p className="mx-auto mt-8 max-w-md text-[0.83rem] leading-relaxed text-areia-200/60">
            {chamadaFinal.observacao}
          </p>
        </div>
      </div>
    </section>
  );
}
