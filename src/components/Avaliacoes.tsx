import Image from 'next/image';
import Reveal from './ui/Reveal';
import ContadorAnimado from './ui/ContadorAnimado';
import { IconeEstrela, IconeSeta } from './ui/Icones';
import { avaliacoes, site } from '@/content/site';

const notaGoogle = parseFloat(site.google.nota.replace(',', '.'));

export default function Avaliacoes() {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-titulo"
      className="relative scroll-mt-24 overflow-hidden bg-areia-100 py-20 sm:py-28"
    >
      {/* Textura de fundo — mesma assinatura de arco e traços dourados do
          Acolhimento, aqui em tom frio. Ancorada no topo na altura natural
          da imagem, para não esticar (e cortar) os detalhes pela seção
          inteira, dissolvendo-se no tom areia-100 da seção. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[420px] sm:h-[520px] lg:h-[600px]">
        <Image
          src="/images/fundo-avaliacoes.jpg"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-areia-100/10 via-areia-100/45 to-areia-100" />
      </div>

      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="sobretitulo">{avaliacoes.sobretitulo}</p>
            <h2 id="avaliacoes-titulo" className="titulo-secao">
              {avaliacoes.titulo}
            </h2>
            <p className="texto-secao">{avaliacoes.texto}</p>

            {site.google.url && (
              <a
                href={site.google.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sutil group mt-8"
              >
                {avaliacoes.botao}
                <IconeSeta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )}
          </Reveal>

          <Reveal delay={140} variante="escala">
            <div className="flex flex-col items-center border border-tinta-400/15 bg-areia-50 px-8 py-12 text-center">
              <div className="flex gap-1 text-dourado-500" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconeEstrela key={i} className="h-[1.15rem] w-[1.15rem]" />
                ))}
              </div>
              <p className="mt-6 font-serif text-[3.2rem] leading-none text-marinho-700">
                <ContadorAnimado valor={notaGoogle} decimais={1} />
              </p>
              <p className="mt-3 text-[0.95rem] text-tinta-500">
                <ContadorAnimado valor={site.google.quantidade} /> avaliações no Google
              </p>
              <div className="mt-7 h-px w-16 bg-dourado-400/50" />
              <p className="mt-6 max-w-xs text-[0.86rem] leading-relaxed text-tinta-400">
                Os comentários permanecem publicados no perfil do escritório, em sua
                origem, e podem ser consultados a qualquer momento.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Depoimentos só aparecem se houver autorização e forem preenchidos
            em `avaliacoes.depoimentos` (máximo de 3, sem alteração de sentido). */}
        {avaliacoes.depoimentos.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {avaliacoes.depoimentos.slice(0, 3).map((d, i) => (
              <Reveal
                key={d.autor}
                delay={i * 120}
                className="border border-tinta-400/15 bg-areia-50 p-8"
              >
                <blockquote className="font-serif text-[1.02rem] leading-[1.7] text-tinta-700">
                  “{d.texto}”
                </blockquote>
                <p className="mt-5 text-[0.82rem] uppercase tracking-[0.14em] text-tinta-400">
                  {d.autor}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
