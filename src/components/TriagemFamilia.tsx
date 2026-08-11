'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { IconeSeta, IconeWhatsapp } from './ui/Icones';
import { site } from '@/content/site';
import { whatsappUrl } from '@/lib/links';

type Props = {
  assuntos: readonly string[];
  rotuloBotao: string;
  className?: string;
};

/**
 * Triagem breve antes do contato: a pessoa marca quais situações se
 * aproximam da dela, e isso vira uma mensagem mais objetiva no WhatsApp —
 * poupando ela de escrever tudo do zero e dando ao escritório um primeiro
 * retrato mais claro. Não diagnostica, não promete atendimento gratuito
 * nem análise pelo WhatsApp — apenas organiza o primeiro contato.
 */
export default function TriagemFamilia({ assuntos, rotuloBotao, className = '' }: Props) {
  const [aberto, setAberto] = useState(false);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [detalhe, setDetalhe] = useState('');
  const idBase = useId();
  const primeiroCampoRef = useRef<HTMLButtonElement>(null);
  const gatilhoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = 'hidden';
    primeiroCampoRef.current?.focus();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };
    window.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', aoTeclar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  function alternar(assunto: string) {
    setSelecionados((atual) =>
      atual.includes(assunto) ? atual.filter((a) => a !== assunto) : [...atual, assunto],
    );
  }

  function fechar() {
    setAberto(false);
    gatilhoRef.current?.focus();
  }

  function continuarNoWhatsapp() {
    const linhas = [site.whatsapp.familia, ''];
    if (selecionados.length > 0) {
      linhas.push(`Situação relacionada a: ${selecionados.join(', ')}.`);
    }
    if (detalhe.trim()) {
      linhas.push(`Detalhe: ${detalhe.trim()}`);
    }

    const texto = encodeURIComponent(linhas.join('\n'));
    const base = whatsappUrl('familia').split('?')[0];
    window.open(`${base}?text=${texto}`, '_blank', 'noopener,noreferrer');
    setAberto(false);
  }

  return (
    <>
      <button
        ref={gatilhoRef}
        type="button"
        onClick={() => setAberto(true)}
        className={className}
      >
        <IconeWhatsapp className="h-[1.05rem] w-[1.05rem]" />
        {rotuloBotao}
        <IconeSeta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {aberto && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          <div
            aria-hidden="true"
            onClick={fechar}
            className="absolute inset-0 bg-marinho-900/70 backdrop-blur-[2px]"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${idBase}-titulo`}
            className="reveal relative max-h-[92dvh] w-full max-w-lg overflow-y-auto border border-tinta-400/15
                       bg-areia-50 p-7 shadow-[0_30px_80px_-30px_rgba(10,21,38,0.45)] sm:p-9"
            data-visivel="true"
          >
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-tinta-400/25
                         text-tinta-500 transition-colors duration-300 hover:border-marinho-700/40 hover:text-marinho-700"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <p className="sobretitulo">Antes de conversar</p>
            <h2 id={`${idBase}-titulo`} className="mt-4 font-serif text-[1.4rem] leading-snug text-tinta-800 sm:text-[1.6rem]">
              Qual situação mais se aproxima da sua?
            </h2>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-tinta-500">
              Marque uma ou mais opções, se fizer sentido. Isso ajuda a organizar sua mensagem —
              a análise da situação acontece na conversa, não aqui.
            </p>

            <fieldset className="mt-6">
              <legend className="sr-only">Situações relacionadas ao seu caso</legend>
              <div className="flex flex-wrap gap-2.5">
                {assuntos.map((assunto) => {
                  const marcado = selecionados.includes(assunto);
                  return (
                    <button
                      key={assunto}
                      ref={assunto === assuntos[0] ? primeiroCampoRef : undefined}
                      type="button"
                      role="checkbox"
                      aria-checked={marcado}
                      onClick={() => alternar(assunto)}
                      className={`rounded-full border px-4 py-2 text-[0.87rem] transition-colors duration-300 ${
                        marcado
                          ? 'border-marinho-700 bg-marinho-700 text-areia-50'
                          : 'border-tinta-400/25 text-tinta-600 hover:border-marinho-700/40'
                      }`}
                    >
                      {assunto}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <label htmlFor={`${idBase}-detalhe`} className="text-[0.82rem] text-tinta-600">
                Quer contar mais alguma coisa? (opcional)
              </label>
              <textarea
                id={`${idBase}-detalhe`}
                rows={3}
                value={detalhe}
                onChange={(e) => setDetalhe(e.target.value)}
                placeholder="Sem precisar de detalhes sensíveis — só o que ajudar a situar o assunto."
                className="mt-2 w-full resize-y rounded-none border border-tinta-400/25 bg-areia-100 px-4 py-3
                           text-[0.95rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                           duration-300 focus:border-marinho-600 focus:outline-none"
              />
            </div>

            <button type="button" onClick={continuarNoWhatsapp} className="btn-primario mt-7 w-full">
              <IconeWhatsapp />
              Continuar no WhatsApp
            </button>

            <p className="mt-5 text-[0.8rem] leading-relaxed text-tinta-400">
              O envio de uma mensagem não estabelece automaticamente uma relação entre advogado e
              cliente. Nenhum resultado pode ser garantido a partir dessa triagem.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
