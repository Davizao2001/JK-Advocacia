'use client';

import { useId, useState } from 'react';
import { IconeSeta, IconeWhatsapp } from './ui/Icones';
import { areas, site } from '@/content/site';
import { whatsappUrl } from '@/lib/links';

type Area = (typeof areas.lista)[number];

/**
 * Triagem embutida no próprio card da área — expande ali mesmo, sem modal.
 * Ao escolher uma situação, as perguntas específicas dela aparecem em
 * seguida (quando existirem), cada uma com a resposta do cliente — assim a
 * mensagem chega bem mais objetiva, sem pedir documento ou dado sensível.
 */
export default function TriagemCard({ area }: { area: Area }) {
  const [aberto, setAberto] = useState(false);
  const [situacao, setSituacao] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [detalhe, setDetalhe] = useState('');
  const [nome, setNome] = useState('');
  const idBase = useId();

  const mostrarAssuntos = area.assuntosPublicados && area.assuntos.length > 0;
  const situacaoAtual = area.assuntos.find((a) => a.titulo === situacao);

  function escolherSituacao(titulo: string) {
    setSituacao((atual) => (atual === titulo ? null : titulo));
    setRespostas({});
  }

  function responder(pergunta: string, resposta: string) {
    setRespostas((atual) => ({ ...atual, [pergunta]: resposta }));
  }

  function continuarNoWhatsapp() {
    const linhas = [site.whatsapp[area.mensagem], ''];
    if (situacao) {
      linhas.push(`Situação: ${situacao}`);
    }
    situacaoAtual?.perguntas?.forEach((p) => {
      const resposta = respostas[p.pergunta];
      if (resposta && resposta.trim()) {
        linhas.push(`${p.pergunta} ${resposta.trim()}`);
      }
    });
    if (detalhe.trim()) {
      linhas.push(`Detalhe: ${detalhe.trim()}`);
    }
    if (nome.trim()) {
      linhas.push('', `Nome: ${nome.trim()}`);
    }

    const texto = encodeURIComponent(linhas.join('\n'));
    const base = whatsappUrl(area.mensagem).split('?')[0];
    window.open(`${base}?text=${texto}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls={`${idBase}-painel`}
        className="group flex w-full items-center justify-between gap-3 border border-marinho-700/25
                   bg-marinho-700/[0.04] px-5 py-3.5 text-left text-[0.92rem] font-medium text-marinho-700
                   transition-colors duration-300 hover:border-marinho-700/45 hover:bg-marinho-700/[0.08]"
      >
        <span className="inline-flex items-center gap-2.5">
          <IconeWhatsapp className="h-[1.05rem] w-[1.05rem] shrink-0" />
          {area.botao}
        </span>
        <IconeSeta
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${aberto ? 'rotate-90' : ''}`}
        />
      </button>

      <div id={`${idBase}-painel`} className="acordeao-conteudo" data-aberto={aberto}>
        <div>
          <div className="mt-4 border border-tinta-400/15 bg-areia-100/60 p-5">
            {mostrarAssuntos ? (
              <>
                <p className="text-[0.84rem] text-tinta-600">
                  Qual situação mais se aproxima da sua?
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {area.assuntos.map((assunto) => {
                    const marcado = situacao === assunto.titulo;
                    return (
                      <button
                        key={assunto.titulo}
                        type="button"
                        role="radio"
                        aria-checked={marcado}
                        onClick={() => escolherSituacao(assunto.titulo)}
                        className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors duration-300 ${
                          marcado
                            ? 'border-marinho-700 bg-marinho-700 text-areia-50'
                            : 'border-tinta-400/25 text-tinta-600 hover:border-marinho-700/40'
                        }`}
                      >
                        {assunto.titulo}
                      </button>
                    );
                  })}
                </div>

                {/* Perguntas específicas da situação escolhida — aparecem em
                    seguida, uma a uma respondida ali mesmo. */}
                {situacaoAtual?.perguntas && situacaoAtual.perguntas.length > 0 && (
                  <div className="mt-4 grid gap-4 border-t border-tinta-400/12 pt-4">
                    {situacaoAtual.perguntas.map((p) => (
                      <div key={p.pergunta}>
                        <p className="text-[0.82rem] text-tinta-700">{p.pergunta}</p>
                        {p.opcoes ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {p.opcoes.map((opcao) => {
                              const marcado = respostas[p.pergunta] === opcao;
                              return (
                                <button
                                  key={opcao}
                                  type="button"
                                  role="radio"
                                  aria-checked={marcado}
                                  onClick={() => responder(p.pergunta, opcao)}
                                  className={`rounded-full border px-3 py-1.5 text-[0.78rem] transition-colors duration-300 ${
                                    marcado
                                      ? 'border-dourado-500 bg-dourado-500 text-marinho-900'
                                      : 'border-tinta-400/25 text-tinta-600 hover:border-dourado-500/50'
                                  }`}
                                >
                                  {opcao}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={respostas[p.pergunta] ?? ''}
                            onChange={(e) => responder(p.pergunta, e.target.value)}
                            placeholder="Sua resposta"
                            className="mt-2 w-full rounded-none border border-tinta-400/25 bg-areia-50 px-3.5 py-2
                                       text-[0.85rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                                       duration-300 focus:border-marinho-600 focus:outline-none"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-[0.84rem] leading-relaxed text-tinta-500">{areas.nota}</p>
            )}

            <div className="mt-4">
              <label htmlFor={`${idBase}-nome`} className="text-[0.78rem] text-tinta-600">
                Seu nome (opcional)
              </label>
              <input
                id={`${idBase}-nome`}
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como podemos chamar você"
                className="mt-1.5 w-full rounded-none border border-tinta-400/25 bg-areia-50 px-3.5 py-2.5
                           text-[0.88rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                           duration-300 focus:border-marinho-600 focus:outline-none"
              />
            </div>

            <div className="mt-3">
              <label htmlFor={`${idBase}-detalhe`} className="text-[0.78rem] text-tinta-600">
                Quer contar mais alguma coisa? (opcional)
              </label>
              <textarea
                id={`${idBase}-detalhe`}
                rows={2}
                value={detalhe}
                onChange={(e) => setDetalhe(e.target.value)}
                placeholder="Sem precisar de detalhes sensíveis."
                className="mt-1.5 w-full resize-y rounded-none border border-tinta-400/25 bg-areia-50 px-3.5 py-2.5
                           text-[0.88rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                           duration-300 focus:border-marinho-600 focus:outline-none"
              />
            </div>

            <button type="button" onClick={continuarNoWhatsapp} className="btn-primario mt-4 w-full">
              <IconeWhatsapp />
              Continuar no WhatsApp
            </button>

            <p className="mt-3 text-[0.75rem] leading-relaxed text-tinta-400">
              O envio de uma mensagem não estabelece automaticamente uma relação entre advogado e
              cliente. Nenhum resultado pode ser garantido a partir dessa triagem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
