import Image from 'next/image';
import { site } from '@/content/site';

type ImagemHero = (typeof site.imagens.hero)[number];

/**
 * Fundo fotográfico em tela cheia da hero.
 * Controlada pelo componente pai (`Hero.tsx`), que também usa o índice ativo
 * para decidir de qual lado o texto deve ficar em cada foto.
 */
export default function HeroImagem({
  imagens,
  ativo,
}: {
  imagens: readonly ImagemHero[];
  ativo: number;
}) {
  return (
    <div className="relative h-full w-full">
      {imagens.map((img, i) => (
        <div
          key={img.src}
          className="hero-slide absolute inset-0"
          data-ativo={i === ativo}
          aria-hidden={i !== ativo}
        >
          <Image
            src={img.src}
            alt={i === 0 ? img.alt : ''}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectPosition: img.posicao }}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
