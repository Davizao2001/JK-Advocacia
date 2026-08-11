import Image from 'next/image';
import Reveal from './ui/Reveal';
import DivisorArco from './ui/DivisorArco';
import { acolhimento, site } from '@/content/site';

export default function Acolhimento() {
  return (
    <section
      aria-labelledby="acolhimento-titulo"
      className="relative overflow-hidden bg-areia-200 pb-20 pt-12 sm:pb-28 sm:pt-16"
    >
      {/* Primeiro divisor narrativo: da apresentação para o convite ao acolhimento */}
      <DivisorArco className="mb-12 sm:mb-16" />

      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.82fr_1fr] lg:gap-20">
        <Reveal
          variante="escala"
          className="relative order-2 mx-auto w-full max-w-sm lg:order-1 lg:mx-0"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full border border-dourado-500/50"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={site.imagens.acolhimento.src}
                alt={site.imagens.acolhimento.alt}
                fill
                sizes="(max-width: 1024px) 70vw, 32vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="sobretitulo">{acolhimento.sobretitulo}</p>
            <h2 id="acolhimento-titulo" className="titulo-secao">
              {acolhimento.titulo}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="texto-secao">{acolhimento.texto}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
