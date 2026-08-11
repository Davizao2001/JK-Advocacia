'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Valor final exibido quando a animação termina. */
  valor: number;
  /** Casas decimais — use 1 para notas como "5,0". */
  decimais?: number;
  duracaoMs?: number;
  className?: string;
};

/**
 * Anima uma contagem de 0 até `valor` quando o número entra na tela — um
 * toque de movimento discreto em estatísticas (nota, quantidade de
 * avaliações etc.), sem depender de nenhuma biblioteca externa. Respeita
 * `prefers-reduced-motion`, exibindo o valor final direto.
 */
export default function ContadorAnimado({ valor, decimais = 0, duracaoMs = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [exibido, setExibido] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduzMovimento =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduzMovimento || typeof IntersectionObserver === 'undefined') {
      setExibido(valor);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const inicio = performance.now();

        function passo(agora: number) {
          const progresso = Math.min((agora - inicio) / duracaoMs, 1);
          const suavizado = 1 - Math.pow(1 - progresso, 3); // ease-out cubic
          setExibido(valor * suavizado);
          if (progresso < 1) requestAnimationFrame(passo);
          else setExibido(valor);
        }
        requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [valor, duracaoMs]);

  const texto =
    decimais > 0 ? exibido.toFixed(decimais).replace('.', ',') : Math.round(exibido).toString();

  return (
    <span ref={ref} className={className}>
      {texto}
    </span>
  );
}
