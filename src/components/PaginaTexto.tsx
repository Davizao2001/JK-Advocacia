import Link from 'next/link';
import type { ReactNode } from 'react';
import Reveal from './ui/Reveal';

type Props = { titulo: string; atualizacao?: string; children: ReactNode };

/** Moldura das páginas de texto legal, com a mesma linguagem visual do site. */
export default function PaginaTexto({ titulo, atualizacao, children }: Props) {
  return (
    <article className="bg-areia-100 pb-24 pt-[140px] sm:pt-[168px]">
      <div className="container-site max-w-3xl">
        <Reveal>
          <Link
            href="/"
            className="text-[0.85rem] text-tinta-500 transition-colors duration-300 hover:text-marinho-700"
          >
            ← Voltar ao início
          </Link>
          <h1 className="mt-6 font-serif text-[2rem] leading-tight text-tinta-800 sm:text-[2.5rem]">
            {titulo}
          </h1>
          {atualizacao && (
            <p className="mt-3 text-[0.83rem] text-tinta-400">
              Última atualização: {atualizacao}
            </p>
          )}
          <div className="fio-dourado mt-8" />
        </Reveal>

        <Reveal delay={100}>
          <div
            className="mt-10 space-y-6 text-[0.98rem] leading-[1.8] text-tinta-500
                       [&_a]:text-marinho-700 [&_a]:underline [&_a]:underline-offset-4
                       [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-[1.3rem] [&_h2]:leading-snug [&_h2]:text-tinta-800
                       [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
          >
            {children}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
