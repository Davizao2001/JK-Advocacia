import Image from 'next/image';
import Reveal from './ui/Reveal';
import TriagemCard from './TriagemCard';
import { areas, site } from '@/content/site';

export default function Areas() {
  return (
    <section
      id="areas"
      aria-labelledby="areas-titulo"
      className="scroll-mt-24 bg-areia-100 py-20 sm:py-28"
    >
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="sobretitulo">{areas.sobretitulo}</p>
          <h2 id="areas-titulo" className="titulo-secao">
            {areas.titulo}
          </h2>
          <p className="texto-secao">{areas.texto}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {areas.lista.map((area, i) => {
            const imagem = site.imagens[area.imagem];
            return (
              <Reveal
                key={area.id}
                delay={i * 140}
                className="group flex flex-col overflow-hidden border border-tinta-400/15 bg-areia-50
                           transition-all duration-500 ease-suave hover:border-marinho-700/25
                           hover:shadow-[0_18px_50px_-30px_rgba(16,30,53,0.5)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={imagem.src}
                    alt={imagem.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover transition-transform duration-[900ms] ease-suave group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h3 className="font-serif text-[1.5rem] leading-snug text-tinta-800">
                    {area.titulo}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-[1.75] text-tinta-500">
                    {area.texto}
                  </p>

                  {/* As situações atendidas (quando já confirmadas) aparecem dentro
                      da própria triagem abaixo, junto com o início da conversa —
                      em vez de repetidas aqui como uma lista estática. */}
                  <TriagemCard area={area} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
