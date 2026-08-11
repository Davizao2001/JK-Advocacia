'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import Reveal from './ui/Reveal';
import TriagemContato from './TriagemContato';
import { site, sobre } from '@/content/site';

/** Calcula a idade a partir de uma data ISO, sem precisar atualizar o número a cada ano. */
function calcularIdade(nascimentoISO: string) {
  const nascimento = new Date(nascimentoISO);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
  if (aindaNaoFezAniversario) idade -= 1;
  return idade;
}

function formatarNascimento(nascimentoISO: string) {
  const [, mes, dia] = nascimentoISO.split('-').map(Number);
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${dia} de ${meses[mes - 1]}`;
}

export default function Sobre() {
  // Só exibimos credenciais efetivamente confirmadas e preenchidas.
  const credenciais = sobre.credenciais.filter((c) => c.valor.trim() !== '');

  // Fatos que se revezam no card — o texto original, as áreas de atuação em
  // destaque e os fatos pessoais informados (idade calculada dinamicamente,
  // para nunca ficar desatualizada).
  const fatos = useMemo(() => {
    const lista = [sobre.texto];
    if (sobre.areasDestaque) lista.push(sobre.areasDestaque);
    if (sobre.nascimento) {
      const idade = calcularIdade(sobre.nascimento);
      lista.push(
        `Nascido em ${formatarNascimento(sobre.nascimento)} de 1999 — hoje, aos ${idade} anos, segue dedicado a olhar de perto para cada caso.`
      );
    }
    if (sobre.estado) lista.push(sobre.estado);
    return lista;
  }, []);

  // Fotos que se alternam junto com o texto.
  const fotos = useMemo(() => site.imagens.sobre.filter((f) => f?.src), []);

  const [indice, setIndice] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Revezamento automático a cada 3,8s — respeita quem prefere menos movimento.
  useEffect(() => {
    if (fatos.length <= 1) return;
    const reduzMovimento =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzMovimento) return;

    const intervalo = setInterval(() => {
      setIndice((i) => (i + 1) % fatos.length);
    }, 3800);
    return () => clearInterval(intervalo);
  }, [fatos.length]);

  // Animação de entrada com GSAP + ScrollTrigger, carregada dinamicamente
  // (só no cliente) para manter o bundle inicial enxuto.
  useEffect(() => {
    let cancelado = false;
    let contexto: { revert: () => void } | undefined;

    const reduzMovimento =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduzMovimento || !containerRef.current) return;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelado || !containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      contexto = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { autoAlpha: 0, y: 48, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 82%',
            },
          }
        );
      }, containerRef);
    })();

    return () => {
      cancelado = true;
      contexto?.revert();
    };
  }, []);

  const indiceFoto = fotos.length > 0 ? indice % fotos.length : 0;

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="scroll-mt-24 bg-marinho-800 py-20 text-areia-100 sm:py-28"
    >
      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div ref={containerRef} className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full border border-dourado-400/45"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {fotos.map((foto, i) => (
                <Image
                  key={foto.src}
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 70vw, 34vw"
                  style={{ objectPosition: foto.posicao ?? '50% 50%' }}
                  className={`object-cover transition-opacity duration-[1400ms] ease-suave ${
                    i === indiceFoto ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>

            {/* Indicadores do revezamento — mesma lógica dos textos ao lado */}
            {fatos.length > 1 && (
              <div className="absolute bottom-5 left-5 flex gap-1.5" aria-hidden="true">
                {fatos.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === indice ? 'w-5 bg-dourado-400' : 'w-1.5 bg-areia-50/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Reveal>
            <p className="sobretitulo !text-dourado-400 before:!bg-dourado-400/70">
              {sobre.sobretitulo}
            </p>
            <h2
              id="sobre-titulo"
              className="titulo-secao !text-areia-50"
            >
              {sobre.titulo}
            </h2>
          </Reveal>

          {/* Texto em revezamento — grid empilhado, cada fato ocupa a mesma
              área, então a altura do bloco se ajusta ao maior deles sem
              precisar travar um min-height arbitrário. */}
          <div className="mt-6 grid" aria-live="polite">
            {fatos.map((fato, i) => (
              <p
                key={fato}
                aria-hidden={i !== indice}
                className={`texto-secao !text-areia-200/85 col-start-1 row-start-1 transition-opacity duration-700 ease-suave ${
                  i === indice ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                {fato}
              </p>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 font-serif text-[1.15rem] text-areia-50">
              {site.profissional}
              {site.oab ? (
                <span className="ml-3 font-sans text-[0.85rem] tracking-wide text-areia-200/70">
                  {site.oab}
                </span>
              ) : null}
            </p>

            {credenciais.length > 0 && (
              <dl className="mt-8 grid gap-x-10 gap-y-5 border-t border-areia-200/15 pt-8 sm:grid-cols-2">
                {credenciais.map((c) => (
                  <div key={c.rotulo}>
                    <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-dourado-400">
                      {c.rotulo}
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-areia-100/90">
                      {c.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <TriagemContato rotuloBotao="Entrar em contato" className="btn-claro mt-10" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
