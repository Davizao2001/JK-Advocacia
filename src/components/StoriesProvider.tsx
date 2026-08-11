'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IconeCoracao, IconeMaleta, IconePlay, IconeSeta, IconeX } from './ui/Icones';
import { conteudo } from '@/content/site';

const DURACAO_HISTORIA = 5000; // ms — usado só para cartões sem vídeo real ainda
const PASSO_PROGRESSO = 60; // ms

type Artigo = (typeof conteudo.artigos)[number];
type Grupo = { tema: string; itens: Artigo[] };

const iconePorTema: Record<string, typeof IconeCoracao> = {
  Família: IconeCoracao,
  Trabalho: IconeMaleta,
};

type StoriesContextValor = {
  grupos: Grupo[];
  abrirGrupo: (indice: number) => void;
};

const StoriesContext = createContext<StoriesContextValor | null>(null);

/** Hook para abrir o visualizador de Stories a partir de qualquer lugar do site. */
export function useStories() {
  const contexto = useContext(StoriesContext);
  if (!contexto) throw new Error('useStories precisa estar dentro de <StoriesProvider>');
  return contexto;
}

/**
 * Estado e visualizador em tela cheia dos Stories, elevados para fora da
 * seção "Conteúdo informativo" — assim tanto as bolinhas da seção quanto o
 * atalho flutuante no canto da tela (junto do WhatsApp) abrem exatamente o
 * mesmo visualizador, no formato de Stories do Instagram: barra de progresso
 * segmentada, avanço automático, toque nas laterais para navegar, segurar
 * para pausar e arrastar para baixo (ou X) para fechar.
 */
export default function StoriesProvider({ children }: { children: React.ReactNode }) {
  const grupos = useMemo(() => {
    const mapa = new Map<string, Artigo[]>();
    conteudo.artigos.forEach((artigo) => {
      const lista = mapa.get(artigo.tema) ?? [];
      lista.push(artigo);
      mapa.set(artigo.tema, lista);
    });
    return Array.from(mapa.entries()).map(([tema, itens]) => ({ tema, itens }));
  }, []);

  const [grupoAberto, setGrupoAberto] = useState<number | null>(null);
  const [itemIndex, setItemIndex] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [entrando, setEntrando] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const grupoAtual = grupoAberto !== null ? grupos[grupoAberto] : null;
  const itemAtual = grupoAtual?.itens[itemIndex] ?? null;
  const IconeGrupoAtual = (grupoAtual && iconePorTema[grupoAtual.tema]) || IconePlay;

  function abrirGrupo(indice: number) {
    setGrupoAberto(indice);
    setItemIndex(0);
    setProgresso(0);
  }

  function fechar() {
    setEntrando(false);
    window.setTimeout(() => setGrupoAberto(null), 260);
  }

  function avancar() {
    if (grupoAberto === null) return;
    const grupo = grupos[grupoAberto];
    if (itemIndex < grupo.itens.length - 1) {
      setProgresso(0);
      setItemIndex(itemIndex + 1);
    } else if (grupoAberto < grupos.length - 1) {
      setProgresso(0);
      setItemIndex(0);
      setGrupoAberto(grupoAberto + 1);
    } else {
      fechar();
    }
  }

  function voltar() {
    if (grupoAberto === null) return;
    if (itemIndex > 0) {
      setProgresso(0);
      setItemIndex((i) => i - 1);
    } else if (grupoAberto > 0) {
      const anterior = grupoAberto - 1;
      setProgresso(0);
      setItemIndex(grupos[anterior].itens.length - 1);
      setGrupoAberto(anterior);
    } else {
      setProgresso(0);
    }
  }

  // Anima a entrada logo após montar o visualizador em tela cheia.
  useEffect(() => {
    if (grupoAberto === null) return;
    const id = requestAnimationFrame(() => setEntrando(true));
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = '';
    };
  }, [grupoAberto]);

  // Navegação por teclado.
  useEffect(() => {
    if (grupoAberto === null) return;
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowRight' || e.key === ' ') avancar();
      if (e.key === 'ArrowLeft') voltar();
    }
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupoAberto, itemIndex]);

  // Progresso automático por tempo — usado enquanto o item não tem vídeo real.
  useEffect(() => {
    if (grupoAberto === null || pausado || itemAtual?.video) return;
    let atual = 0;
    const id = setInterval(() => {
      atual += (PASSO_PROGRESSO / DURACAO_HISTORIA) * 100;
      if (atual >= 100) {
        clearInterval(id);
        avancar();
      } else {
        setProgresso(atual);
      }
    }, PASSO_PROGRESSO);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupoAberto, itemIndex, pausado]);

  // Progresso e avanço automático quando o item já tem um vídeo real.
  useEffect(() => {
    const video = videoRef.current;
    if (!itemAtual?.video || !video) return;
    function aoAtualizar() {
      if (video && video.duration) setProgresso((video.currentTime / video.duration) * 100);
    }
    video.addEventListener('timeupdate', aoAtualizar);
    video.addEventListener('ended', avancar);
    return () => {
      video.removeEventListener('timeupdate', aoAtualizar);
      video.removeEventListener('ended', avancar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupoAberto, itemIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (pausado) video.pause();
    else video.play().catch(() => {});
  }, [pausado, itemIndex, grupoAberto]);

  function aoPressionar(e: React.PointerEvent) {
    pointerRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    setPausado(true);
  }

  function aoSoltar(e: React.PointerEvent) {
    setPausado(false);
    const inicio = pointerRef.current;
    pointerRef.current = null;
    if (!inicio) return;
    const deltaY = e.clientY - inicio.y;
    const deltaT = Date.now() - inicio.t;

    if (deltaY > 80) {
      fechar();
      return;
    }
    if (deltaT < 300) {
      const larguraTela = window.innerWidth;
      if (e.clientX < larguraTela * 0.35) voltar();
      else avancar();
    }
  }

  return (
    <StoriesContext.Provider value={{ grupos, abrirGrupo }}>
      {children}

      {grupoAberto !== null &&
        grupoAtual &&
        itemAtual &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Histórias sobre ${grupoAtual.tema}`}
            onClick={(e) => {
              // No desktop, clicar no fundo escuro fora do cartão fecha a história.
              if (e.target === e.currentTarget) fechar();
            }}
            className={`fixed inset-0 z-[70] bg-marinho-900 transition-opacity duration-300 ease-suave sm:flex sm:items-center sm:justify-center ${
              entrando ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* No mobile a história ocupa a tela inteira, como no Instagram.
                No desktop ela vira um cartão vertical centralizado — o vídeo
                é sempre 9:16, então "esticar" para preencher uma tela larga
                só distorceria a imagem; melhor manter a proporção real e
                deixar o fundo escuro nas laterais. */}
            <div className="group relative h-full w-full overflow-hidden sm:aspect-[9/16] sm:h-[88vh] sm:max-h-[840px] sm:w-auto sm:rounded-2xl sm:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)] sm:ring-1 sm:ring-areia-50/10">
              {/* Área de toque — laterais navegam, segurar pausa, arrastar pra baixo fecha */}
              <div
                className="absolute inset-0"
                onPointerDown={aoPressionar}
                onPointerUp={aoSoltar}
                onPointerCancel={() => setPausado(false)}
              >
                {itemAtual.video ? (
                  <video
                    ref={videoRef}
                    key={itemAtual.video}
                    src={itemAtual.video}
                    poster={itemAtual.poster || undefined}
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-marinho-800 via-marinho-900 to-tinta-800">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(249,248,244,0.05)_0px,rgba(249,248,244,0.05)_1px,transparent_1px,transparent_18px)]"
                    />
                    <div className="relative flex flex-col items-center gap-4 px-10 text-center">
                      <span className="grid h-16 w-16 place-items-center rounded-full border border-dourado-400/60 text-dourado-300">
                        <IconePlay className="h-7 w-7" />
                      </span>
                      <span className="text-[0.68rem] uppercase tracking-[0.2em] text-areia-50/50">
                        Vídeo em breve
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Setas de navegação — reveladas ao passar o mouse (desktop);
                  no toque, as laterais da própria história continuam navegando. */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  voltar();
                }}
                aria-label="História anterior"
                disabled={grupoAberto === 0 && itemIndex === 0}
                className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center
                           rounded-full bg-marinho-900/45 text-areia-50 opacity-0 backdrop-blur-sm transition-opacity
                           duration-200 hover:bg-marinho-900/65 disabled:pointer-events-none disabled:opacity-0
                           sm:grid sm:group-hover:opacity-100"
              >
                <IconeSeta className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  avancar();
                }}
                aria-label="Próxima história"
                className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center
                           rounded-full bg-marinho-900/45 text-areia-50 opacity-0 backdrop-blur-sm transition-opacity
                           duration-200 hover:bg-marinho-900/65 sm:grid sm:group-hover:opacity-100"
              >
                <IconeSeta className="h-4 w-4" />
              </button>

              {/* Barra de progresso segmentada */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex gap-1.5 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                {grupoAtual.itens.map((_, i) => (
                  <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-areia-50/30">
                    <div
                      className="h-full bg-areia-50"
                      style={{
                        width: `${i < itemIndex ? 100 : i === itemIndex ? progresso : 0}%`,
                        transition: i === itemIndex ? `width ${PASSO_PROGRESSO}ms linear` : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Cabeçalho */}
              <div className="pointer-events-none absolute inset-x-0 top-6 z-10 flex items-center justify-between px-4">
                <span className="flex items-center gap-2.5 text-areia-50">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-areia-50/15">
                    <IconeGrupoAtual className="h-4 w-4" />
                  </span>
                  <span className="text-[0.85rem] font-medium">{grupoAtual.tema}</span>
                </span>
                <button
                  type="button"
                  onClick={fechar}
                  aria-label="Fechar histórias"
                  className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full text-areia-50/90 transition-colors duration-200 hover:bg-areia-50/10"
                >
                  <IconeX className="h-5 w-5" />
                </button>
              </div>

              {/* Legenda inferior */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-marinho-900/85 via-marinho-900/40 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                <span className="text-[0.68rem] uppercase tracking-[0.2em] text-dourado-300">
                  {itemAtual.tema}
                </span>
                <p className="mt-1.5 max-w-md font-serif text-[1.2rem] leading-snug text-areia-50">
                  {itemAtual.titulo}
                </p>
                {itemAtual.href && (
                  <Link
                    href={itemAtual.href}
                    className="pointer-events-auto mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-areia-50 underline-offset-4 hover:underline"
                  >
                    Saiba mais
                    <IconeSeta className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </StoriesContext.Provider>
  );
}
