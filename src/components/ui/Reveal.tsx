'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  /** Atraso em ms para escalonar blocos vizinhos. */
  delay?: number;
  /**
   * 'subir'   = fade + deslocamento vertical
   * 'escala'  = fade + leve aproximação
   * 'linha'   = traço vertical que se desenha de cima para baixo
   * 'linha-h' = traço horizontal que se desenha da esquerda para a direita
   */
  variante?: 'subir' | 'escala' | 'linha' | 'linha-h';
  className?: string;
  as?: ElementType;
  /**
   * Quando `true`, não desconecta o observer: o elemento volta ao estado
   * oculto ao sair da tela e revela de novo ao reentrar. Usado em trechos
   * que devem "respirar" com o scroll (entrada e saída), em vez de revelar
   * uma única vez.
   */
  continuo?: boolean;
};

/**
 * Revela o conteúdo quando ele entra na tela.
 * Usa IntersectionObserver (sem biblioteca externa) e desconecta após revelar,
 * evitando qualquer custo de scroll contínuo. O CSS já neutraliza a animação
 * quando o sistema pede menos movimento (prefers-reduced-motion).
 */
export default function Reveal({
  children,
  delay = 0,
  variante = 'subir',
  className = '',
  as: Tag = 'div',
  continuo = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisivel(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (continuo) {
          setVisivel(entry.isIntersecting);
          return;
        }
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continuo]);

  const base =
    variante === 'escala'
      ? 'reveal-escala'
      : variante === 'linha'
        ? 'linha-progresso'
        : variante === 'linha-h'
          ? 'linha-progresso-h'
          : 'reveal';

  return (
    <Tag
      ref={ref}
      data-visivel={visivel}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${base} ${className}`}
    >
      {children}
    </Tag>
  );
}
