'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Divisor de seção com o motivo de arco (assinatura visual do site).
 * O traço se desenha suavemente quando entra na tela. Usado com moderação —
 * apenas em duas transições narrativas — para não virar decoração repetitiva.
 */
export default function DivisorArco({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisivel(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg
        ref={ref}
        viewBox="0 0 64 40"
        className="h-10 w-16 text-dourado-500"
        fill="none"
      >
        <path
          data-visivel={visivel}
          className="arco-tracado"
          pathLength={1}
          d="M4,40 L4,15.6 C4,6.5 15,0.5 32,0.5 C49,0.5 60,6.5 60,15.6 L60,40"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
