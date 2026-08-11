'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconeConversa, IconeLupa, IconeMaleta, IconeSeta, IconeWhatsapp } from './ui/Icones';
import { areas, site } from '@/content/site';
import { whatsappUrl } from '@/lib/links';

type ChaveArea = (typeof areas.lista)[number]['id'] | 'outro';
type Etapa = 'area' | 'situacao' | 'identificacao' | 'revisao';

const ETAPAS: Etapa[] = ['area', 'situacao', 'identificacao', 'revisao'];

const ICONES_AREA: Record<ChaveArea, typeof IconeConversa> = {
  familia: IconeConversa,
  trabalhista: IconeMaleta,
  outro: IconeLupa,
};

type Props = {
  /** Texto do botão. Ignorado quando `apenasIcone` é `true`. */
  rotuloBotao?: string;
  className?: string;
  /** Para gatilhos apenas com ícone, como o botão flutuante. */
  apenasIcone?: boolean;
  ariaLabel?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
  style?: React.CSSProperties;
  /** Chamado ao abrir a triagem — útil, por exemplo, para fechar um menu mobile. */
  onAbrir?: () => void;
};

/**
 * Triagem geral de contato, em etapas curtas com barra de progresso e uma
 * revisão antes de enviar — para não parecer um formulário travado nem uma
 * ficha longa. Primeiro pergunta a área, depois a situação (com as opções
 * já confirmadas de Direito de Família), pede só o nome para retorno, e
 * mostra um resumo antes de abrir o WhatsApp. Não diagnostica nem promete
 * atendimento — apenas ajuda a chegar com uma mensagem mais clara.
 */
export default function TriagemContato({
  rotuloBotao,
  className = '',
  apenasIcone = false,
  ariaLabel,
  tabIndex,
  ariaHidden,
  style,
  onAbrir,
}: Props) {
  const [aberto, setAberto] = useState(false);
  const [etapa, setEtapa] = useState<Etapa>('area');
  const [areaEscolhida, setAreaEscolhida] = useState<ChaveArea | null>(null);
  const [situacao, setSituacao] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [detalhe, setDetalhe] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tentouAvancar, setTentouAvancar] = useState(false);
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

  useEffect(() => {
    if (aberto) primeiroCampoRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etapa]);

  const areaAtual = areas.lista.find((a) => a.id === areaEscolhida);
  const mostrarAssuntos = Boolean(areaAtual?.assuntosPublicados && areaAtual.assuntos.length > 0);
  const situacaoAtual = areaAtual?.assuntos.find((a) => a.titulo === situacao);
  const indiceEtapa = ETAPAS.indexOf(etapa);

  function abrir() {
    setEtapa('area');
    setAreaEscolhida(null);
    setSituacao(null);
    setRespostas({});
    setDetalhe('');
    setNome('');
    setTelefone('');
    setTentouAvancar(false);
    setAberto(true);
    onAbrir?.();
  }

  function fechar() {
    setAberto(false);
    gatilhoRef.current?.focus();
  }

  function escolherArea(id: ChaveArea) {
    setAreaEscolhida(id);
    setSituacao(null);
    setRespostas({});
    setTentouAvancar(false);
    setEtapa('situacao');
  }

  function escolherSituacao(titulo: string) {
    setSituacao((atual) => (atual === titulo ? null : titulo));
    setRespostas({});
  }

  function responder(pergunta: string, resposta: string) {
    setRespostas((atual) => ({ ...atual, [pergunta]: resposta }));
  }

  function avancar() {
    if (etapa === 'identificacao' && nome.trim().length < 2) {
      setTentouAvancar(true);
      return;
    }
    setTentouAvancar(false);
    const proxima = ETAPAS[indiceEtapa + 1];
    if (proxima) setEtapa(proxima);
  }

  function voltar() {
    if (etapa === 'area') return;
    if (etapa === 'situacao') {
      setAreaEscolhida(null);
      setEtapa('area');
      return;
    }
    setTentouAvancar(false);
    setEtapa(ETAPAS[indiceEtapa - 1]);
  }

  /** Pula toda a triagem e abre o WhatsApp direto, para quem prefere não preencher nada. */
  function irDiretoWhatsapp() {
    window.open(whatsappUrl('padrao'), '_blank', 'noopener,noreferrer');
    setAberto(false);
  }

  function continuarNoWhatsapp() {
    const chaveMensagem: keyof typeof site.whatsapp =
      areaEscolhida === 'familia' || areaEscolhida === 'trabalhista' ? areaEscolhida : 'padrao';

    const linhas = [site.whatsapp[chaveMensagem], ''];
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
    linhas.push('', `Nome: ${nome.trim()}`);
    if (telefone.trim()) {
      linhas.push(`Telefone para retorno: ${telefone.trim()}`);
    }

    const texto = encodeURIComponent(linhas.join('\n'));
    const base = whatsappUrl(chaveMensagem).split('?')[0];
    window.open(`${base}?text=${texto}`, '_blank', 'noopener,noreferrer');
    setAberto(false);
  }

  return (
    <>
      <button
        ref={gatilhoRef}
        type="button"
        onClick={abrir}
        className={className}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        aria-hidden={ariaHidden}
        style={style}
      >
        <IconeWhatsapp className={apenasIcone ? 'h-[1.45rem] w-[1.45rem]' : 'h-[1.05rem] w-[1.05rem]'} />
        {!apenasIcone && rotuloBotao}
      </button>

      {aberto && createPortal(
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
            className="reveal relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] border border-tinta-400/15
                       bg-areia-50 shadow-[0_30px_80px_-30px_rgba(10,21,38,0.45)] sm:rounded-[1.75rem]"
            data-visivel="true"
          >
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-tinta-400/25
                         bg-areia-50 text-tinta-500 transition-colors duration-300 hover:border-marinho-700/40 hover:text-marinho-700"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <div className="border-b border-tinta-400/12 px-7 pb-5 pt-7 sm:px-9">
              <p className="sobretitulo">Antes de conversar</p>
              <div className="mt-3 flex items-center justify-between gap-3 text-[0.74rem] text-tinta-400">
                <span>
                  Etapa {indiceEtapa + 1} de {ETAPAS.length}
                </span>
                <span>{Math.round(((indiceEtapa + 1) / ETAPAS.length) * 100)}%</span>
              </div>
              <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-tinta-400/15">
                <div
                  className="h-full rounded-full bg-dourado-500 transition-all duration-300 ease-suave"
                  style={{ width: `${((indiceEtapa + 1) / ETAPAS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-7 sm:px-9">
              {etapa === 'area' && (
                <>
                  <h2
                    id={`${idBase}-titulo`}
                    className="pr-8 font-serif text-[1.4rem] leading-snug text-tinta-800 sm:text-[1.6rem]"
                  >
                    Qual assunto te trouxe até aqui?
                  </h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-tinta-500">
                    Isso ajuda a organizar sua mensagem antes de conversar no WhatsApp.
                  </p>

                  <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                    {areas.lista.map((area, i) => {
                      const Icone = ICONES_AREA[area.id];
                      return (
                        <button
                          key={area.id}
                          ref={i === 0 ? primeiroCampoRef : undefined}
                          type="button"
                          onClick={() => escolherArea(area.id)}
                          className="group flex flex-col gap-3 rounded-2xl border border-tinta-400/15 bg-gradient-to-br
                                     from-areia-100/80 to-areia-100/30 p-5 text-left shadow-[0_1px_2px_rgba(16,30,53,0.04)]
                                     transition-all duration-300 hover:-translate-y-0.5 hover:border-dourado-400/50
                                     hover:shadow-[0_18px_40px_-22px_rgba(16,30,53,0.4)]"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-marinho-800 text-areia-50">
                            <Icone className="h-4 w-4" />
                          </span>
                          <span className="block font-serif text-[1.05rem] leading-snug text-tinta-800">
                            {area.titulo}
                          </span>
                          <span className="block text-[0.82rem] leading-relaxed text-tinta-500">
                            {area.texto}
                          </span>
                          <span className="mt-1 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-marinho-700">
                            Conversar sobre isso
                            <IconeSeta className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => escolherArea('outro')}
                    className="group mt-3.5 flex w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-tinta-400/30
                               px-5 py-4 text-left transition-colors duration-300 hover:border-marinho-700/40 hover:bg-marinho-700/[0.04]"
                  >
                    <span className="text-[0.9rem] text-tinta-600">
                      Ainda não sei / <span className="font-medium text-tinta-800">outro assunto</span>
                    </span>
                    <IconeSeta className="h-4 w-4 shrink-0 text-tinta-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-marinho-700" />
                  </button>

                  <div className="mt-7 flex items-center gap-3 text-[0.74rem] uppercase tracking-wide text-tinta-400">
                    <span className="h-px flex-1 bg-tinta-400/15" />
                    ou
                    <span className="h-px flex-1 bg-tinta-400/15" />
                  </div>

                  <button
                    type="button"
                    onClick={irDiretoWhatsapp}
                    className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full border border-dourado-400/45
                               bg-dourado-400/10 px-5 py-3.5 text-[0.9rem] font-medium text-marinho-800 transition-colors
                               duration-300 hover:bg-dourado-400/20"
                  >
                    <IconeWhatsapp className="h-[1.05rem] w-[1.05rem]" />
                    Prefiro ir direto pro WhatsApp
                  </button>
                </>
              )}

              {etapa === 'situacao' && (
                <>
                  <h2
                    id={`${idBase}-titulo`}
                    className="pr-8 font-serif text-[1.4rem] leading-snug text-tinta-800 sm:text-[1.6rem]"
                  >
                    {mostrarAssuntos ? 'Qual situação mais se aproxima da sua?' : 'Quer contar um pouco mais?'}
                  </h2>

                  {mostrarAssuntos && areaAtual ? (
                    <>
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-tinta-500">
                        Escolha a opção mais próxima da sua. A análise da situação acontece na
                        conversa, não aqui.
                      </p>
                      <fieldset className="mt-6">
                        <legend className="sr-only">Situações relacionadas ao seu caso</legend>
                        <div className="flex flex-wrap gap-2.5">
                          {areaAtual.assuntos.map((assunto) => {
                            const marcado = situacao === assunto.titulo;
                            return (
                              <button
                                key={assunto.titulo}
                                type="button"
                                role="radio"
                                aria-checked={marcado}
                                onClick={() => escolherSituacao(assunto.titulo)}
                                className={`rounded-full border px-4 py-2 text-[0.87rem] transition-colors duration-300 ${
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
                      </fieldset>

                      {/* Perguntas específicas da situação escolhida */}
                      {situacaoAtual?.perguntas && situacaoAtual.perguntas.length > 0 && (
                        <div className="mt-6 grid gap-5 border-t border-tinta-400/12 pt-6">
                          {situacaoAtual.perguntas.map((p) => (
                            <div key={p.pergunta}>
                              <p className="text-[0.88rem] text-tinta-700">{p.pergunta}</p>
                              {p.opcoes ? (
                                <div className="mt-2.5 flex flex-wrap gap-2">
                                  {p.opcoes.map((opcao) => {
                                    const marcado = respostas[p.pergunta] === opcao;
                                    return (
                                      <button
                                        key={opcao}
                                        type="button"
                                        role="radio"
                                        aria-checked={marcado}
                                        onClick={() => responder(p.pergunta, opcao)}
                                        className={`rounded-full border px-3.5 py-1.5 text-[0.82rem] transition-colors duration-300 ${
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
                                  className="mt-2.5 w-full rounded-xl border border-tinta-400/25 bg-areia-100 px-4 py-2.5
                                             text-[0.88rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                                             duration-300 focus:border-marinho-600 focus:outline-none"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-tinta-500">{areas.nota}</p>
                  )}

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
                      className="mt-2 w-full resize-y rounded-xl border border-tinta-400/25 bg-areia-100 px-4 py-3
                                 text-[0.95rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                                 duration-300 focus:border-marinho-600 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {etapa === 'identificacao' && (
                <>
                  <h2
                    id={`${idBase}-titulo`}
                    className="pr-8 font-serif text-[1.4rem] leading-snug text-tinta-800 sm:text-[1.6rem]"
                  >
                    Para finalizar, como podemos te chamar?
                  </h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-tinta-500">
                    Só o essencial para o retorno — nenhum dado é armazenado ou enviado a terceiros.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <div>
                      <label htmlFor={`${idBase}-nome`} className="text-[0.82rem] text-tinta-600">
                        Nome
                      </label>
                      <input
                        id={`${idBase}-nome`}
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Como podemos chamar você"
                        className="mt-2 w-full rounded-xl border border-tinta-400/25 bg-areia-100 px-4 py-3
                                   text-[0.95rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                                   duration-300 focus:border-marinho-600 focus:outline-none"
                      />
                      {tentouAvancar && nome.trim().length < 2 && (
                        <p role="alert" className="mt-1.5 text-[0.8rem] text-marinho-600">
                          Informe seu nome para continuar.
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`${idBase}-telefone`} className="text-[0.82rem] text-tinta-600">
                        Telefone para retorno (opcional)
                      </label>
                      <input
                        id={`${idBase}-telefone`}
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Caso prefira que retornemos por outro número"
                        className="mt-2 w-full rounded-xl border border-tinta-400/25 bg-areia-100 px-4 py-3
                                   text-[0.95rem] text-tinta-700 placeholder:text-tinta-400/70 transition-colors
                                   duration-300 focus:border-marinho-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {etapa === 'revisao' && (
                <>
                  <h2
                    id={`${idBase}-titulo`}
                    className="pr-8 font-serif text-[1.4rem] leading-snug text-tinta-800 sm:text-[1.6rem]"
                  >
                    Confira antes de enviar
                  </h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-tinta-500">
                    Isso é só um resumo — nada é enviado até você tocar em &quot;Continuar no WhatsApp&quot;.
                  </p>

                  <div className="mt-6 divide-y divide-tinta-400/12 overflow-hidden rounded-2xl border border-tinta-400/15 bg-areia-100/50">
                    <div className="px-4 py-3.5">
                      <p className="text-[0.72rem] uppercase tracking-wide text-tinta-400">Assunto</p>
                      <p className="mt-0.5 text-[0.92rem] text-tinta-800">
                        {areaAtual?.titulo ?? 'Outro assunto'}
                      </p>
                    </div>
                    {situacao && (
                      <div className="px-4 py-3.5">
                        <p className="text-[0.72rem] uppercase tracking-wide text-tinta-400">Situação</p>
                        <p className="mt-0.5 text-[0.92rem] text-tinta-800">{situacao}</p>
                      </div>
                    )}
                    {situacaoAtual?.perguntas?.map((p) =>
                      respostas[p.pergunta]?.trim() ? (
                        <div key={p.pergunta} className="px-4 py-3.5">
                          <p className="text-[0.72rem] uppercase tracking-wide text-tinta-400">{p.pergunta}</p>
                          <p className="mt-0.5 text-[0.92rem] text-tinta-800">{respostas[p.pergunta]}</p>
                        </div>
                      ) : null,
                    )}
                    {detalhe.trim() && (
                      <div className="px-4 py-3.5">
                        <p className="text-[0.72rem] uppercase tracking-wide text-tinta-400">Detalhe</p>
                        <p className="mt-0.5 text-[0.92rem] text-tinta-800">{detalhe.trim()}</p>
                      </div>
                    )}
                    <div className="px-4 py-3.5">
                      <p className="text-[0.72rem] uppercase tracking-wide text-tinta-400">Nome</p>
                      <p className="mt-0.5 text-[0.92rem] text-tinta-800">{nome.trim() || 'Não informado'}</p>
                    </div>
                    {telefone.trim() && (
                      <div className="px-4 py-3.5">
                        <p className="text-[0.72rem] uppercase tracking-wide text-tinta-400">Telefone</p>
                        <p className="mt-0.5 text-[0.92rem] text-tinta-800">{telefone.trim()}</p>
                      </div>
                    )}
                  </div>

                  <p className="mt-5 text-[0.8rem] leading-relaxed text-tinta-400">
                    O envio de uma mensagem não estabelece automaticamente uma relação entre advogado
                    e cliente. Nenhum resultado pode ser garantido a partir dessa triagem.
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-tinta-400/12 px-7 py-5 sm:px-9">
              <button
                type="button"
                onClick={voltar}
                className={`inline-flex items-center gap-1.5 text-[0.85rem] text-tinta-500 transition-colors duration-300 hover:text-marinho-700 ${
                  etapa === 'area' ? 'invisible' : ''
                }`}
              >
                <IconeSeta className="h-3.5 w-3.5 rotate-180" />
                Voltar
              </button>

              {etapa === 'area' ? null : etapa === 'revisao' ? (
                <button type="button" onClick={continuarNoWhatsapp} className="btn-primario">
                  <IconeWhatsapp />
                  Continuar no WhatsApp
                </button>
              ) : (
                <button
                  type="button"
                  onClick={avancar}
                  className="inline-flex items-center gap-1.5 rounded-full border border-marinho-700 bg-marinho-700 px-5 py-2.5 text-[0.88rem]
                             font-medium text-areia-50 transition-colors duration-300 hover:bg-marinho-600"
                >
                  Avançar
                  <IconeSeta className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
