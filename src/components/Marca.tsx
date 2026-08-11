import Image from 'next/image';
import { site } from '@/content/site';

type Props = { className?: string; invertido?: boolean };

/**
 * Marca da JK Advocacia — o ícone vem do logotipo real (balança + "JK"),
 * recortado com fundo transparente em /public/images/favicon.png, então
 * funciona tanto sobre fundos claros quanto sobre a foto escura da hero.
 */
export default function Marca({ className = '', invertido = false }: Props) {
  const corPrincipal = invertido ? 'text-areia-50' : 'text-marinho-800';
  const corSecundaria = invertido ? 'text-areia-200/70' : 'text-tinta-400';

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/favicon.png"
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        quality={95}
        className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.12rem] leading-none ${corPrincipal}`}>
          {site.nome}
        </span>
        <span
          className={`mt-1 text-[0.62rem] uppercase tracking-[0.22em] ${corSecundaria}`}
        >
          Família · Trabalhista
        </span>
      </span>
    </span>
  );
}
