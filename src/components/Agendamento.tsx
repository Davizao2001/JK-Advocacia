'use client';

import { useMemo, useState } from 'react';
import Reveal from './ui/Reveal';
import { IconeSeta } from './ui/Icones';
import { agendamento, site } from '@/content/site';
import { whatsappUrlComTexto } from '@/lib/links';

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** Quantos meses à frente do atual podem ser navegados — evita marcar datas longe demais. */
const MESES_A_FRENTE = 2;

function inicioDoDia(data: Date) {
  const d = new Date(data);
  d.setHours(0, 0, 0, 0);
  return d;
}

function mesmoDia(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * Calendário para sugerir uma data de conversa — não é uma reserva
 * automática. Ao escolher um dia (e opcionalmente um período), a preferência
 * vira uma mensagem pronta para o WhatsApp; a confirmação do horário
 * acontece diretamente na conversa, sem depender de nenhum serviço externo
 * ou acesso à agenda real do escritório.
 */
export default function Agendamento() {
  const hoje = useMemo(() => inicioDoDia(new Date()), []);
  const [mesRef, setMesRef] = useState(() => new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [selecionada, setSelecionada] = useState<Date | null>(null);
  const [periodo, setPeriodo] = useState<'manha' | 'tarde' | null>(null);

  const mesMinimo = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const mesMaximo = new Date(hoje.getFullYear(), hoje.getMonth() + MESES_A_FRENTE, 1);
  const podeVoltar = mesRef.getTime() > mesMinimo.getTime();
  const podeAvancar = mesRef.getTime() < mesMaximo.getTime();

  const celulas = useMemo(() => {
    const primeiroDiaSemana = new Date(mesRef.getFullYear(), mesRef.getMonth(), 1).getDay();
    const diasNoMes = new Date(mesRef.getFullYear(), mesRef.getMonth() + 1, 0).getDate();
    const lista: (Date | null)[] = [];
    for (let i = 0; i < primeiroDiaSemana; i++) lista.push(null);
    for (let d = 1; d <= diasNoMes; d++) lista.push(new Date(mesRef.getFullYear(), mesRef.getMonth(), d));
    return lista;
  }, [mesRef]);

  const ehFimDeSemana = selecionada ? selecionada.getDay() === 0 || selecionada.getDay() === 6 : false;

  const dataFormatada = useMemo(() => {
    if (!selecionada) return '';
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(selecionada);
  }, [selecionada]);

  const mensagem = useMemo(() => {
    if (!selecionada) return '';
    const periodoTexto =
      periodo === 'manha' ? ', no período da manhã' : periodo === 'tarde' ? ', no período da tarde' : '';
    return `Olá, encontrei o contato da JK Advocacia pelo site e gostaria de agendar uma conversa para ${dataFormatada}${periodoTexto}. Poderia verificar a disponibilidade?`;
  }, [selecionada, periodo, dataFormatada]);

  function selecionarData(data: Date) {
    setSelecionada(data);
    setPeriodo(null);
  }

  return (
    <section
      id="agendamento"
      aria-labelledby="agendamento-titulo"
      className="scroll-mt-24 bg-marinho-800 py-20 text-areia-100 sm:py-28"
    >
      <div className="container-site grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <p className="sobretitulo !text-dourado-400 before:!bg-dourado-400/70">{agendamento.sobretitulo}</p>
          <h2 id="agendamento-titulo" className="titulo-secao !text-areia-50">
            {agendamento.titulo}
          </h2>
          <p className="texto-secao !text-areia-200/85">{agendamento.texto}</p>

          {site.horarios.length > 0 && (
            <dl className="mt-8 space-y-2.5 border-t border-areia-200/15 pt-6 text-[0.88rem]">
              {site.horarios.map((h) => (
                <div key={h.dia} className="flex items-baseline justify-between gap-4">
                  <dt className="text-areia-200/70">{h.dia}</dt>
                  <dd className="font-medium text-areia-50">{h.horario}</dd>
                </div>
              ))}
            </dl>
          )}
          {site.horariosObservacao && (
            <p className="mt-4 text-[0.8rem] italic leading-relaxed text-areia-200/55">{site.horariosObservacao}</p>
          )}
        </Reveal>

        <Reveal delay={140} variante="escala">
          <div className="rounded-2xl border border-tinta-400/10 bg-areia-50 p-6 text-tinta-800 shadow-[0_30px_70px_-30px_rgba(16,30,53,0.5)] sm:p-8">
            {/* Navegação de mês */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMesRef(new Date(mesRef.getFullYear(), mesRef.getMonth() - 1, 1))}
                disabled={!podeVoltar}
                aria-label="Mês anterior"
                className="grid h-9 w-9 place-items-center rounded-full text-tinta-500 transition-colors duration-200 hover:bg-marinho-700/[0.06] disabled:pointer-events-none disabled:opacity-30"
              >
                <IconeSeta className="h-4 w-4 rotate-180" />
              </button>
              <span className="font-serif text-[1.05rem] capitalize text-tinta-800">
                {MESES[mesRef.getMonth()]} de {mesRef.getFullYear()}
              </span>
              <button
                type="button"
                onClick={() => setMesRef(new Date(mesRef.getFullYear(), mesRef.getMonth() + 1, 1))}
                disabled={!podeAvancar}
                aria-label="Próximo mês"
                className="grid h-9 w-9 place-items-center rounded-full text-tinta-500 transition-colors duration-200 hover:bg-marinho-700/[0.06] disabled:pointer-events-none disabled:opacity-30"
              >
                <IconeSeta className="h-4 w-4" />
              </button>
            </div>

            {/* Dias da semana */}
            <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[0.68rem] font-medium uppercase tracking-wide text-tinta-400">
              {DIAS_SEMANA.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            {/* Grade de dias */}
            <div className="mt-2 grid grid-cols-7 gap-1.5">
              {celulas.map((data, i) => {
                if (!data) return <span key={`vazio-${i}`} aria-hidden="true" />;
                const passado = data.getTime() < hoje.getTime();
                const hojeMarcado = mesmoDia(data, hoje);
                const fimDeSemana = data.getDay() === 0 || data.getDay() === 6;
                const selecionado = selecionada ? mesmoDia(data, selecionada) : false;
                return (
                  <button
                    key={data.toISOString()}
                    type="button"
                    disabled={passado}
                    aria-pressed={selecionado}
                    aria-label={new Intl.DateTimeFormat('pt-BR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    }).format(data)}
                    onClick={() => selecionarData(data)}
                    className={`relative grid aspect-square place-items-center rounded-full text-[0.85rem] transition-colors duration-200
                      ${passado ? 'pointer-events-none text-tinta-300' : 'hover:bg-marinho-700/[0.08]'}
                      ${
                        selecionado
                          ? 'bg-marinho-700 text-areia-50 hover:bg-marinho-700'
                          : fimDeSemana && !passado
                            ? 'text-dourado-600'
                            : 'text-tinta-700'
                      }
                      ${hojeMarcado && !selecionado ? 'ring-1 ring-dourado-400/60' : ''}`}
                  >
                    {data.getDate()}
                  </button>
                );
              })}
            </div>

            {selecionada ? (
              <div className="mt-6 border-t border-tinta-400/10 pt-6">
                <p className="text-[0.85rem] text-tinta-600">
                  Prefere qual período em <span className="font-medium capitalize text-tinta-800">{dataFormatada}</span>?
                </p>
                <div className="mt-3 flex gap-2">
                  {(['manha', 'tarde'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriodo(periodo === p ? null : p)}
                      className={`rounded-full border px-4 py-1.5 text-[0.8rem] transition-colors duration-200 ${
                        periodo === p
                          ? 'border-marinho-700 bg-marinho-700 text-areia-50'
                          : 'border-tinta-400/25 text-tinta-600 hover:border-marinho-700/40'
                      }`}
                    >
                      {p === 'manha' ? 'Manhã' : 'Tarde'}
                    </button>
                  ))}
                </div>

                {ehFimDeSemana && (
                  <p className="mt-3 text-[0.78rem] italic leading-relaxed text-tinta-400">
                    Fins de semana são mediante agendamento prévio — a disponibilidade é confirmada na conversa.
                  </p>
                )}

                <a
                  href={whatsappUrlComTexto(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primario mt-5 w-full"
                >
                  {agendamento.botao}
                </a>
                {agendamento.aviso && (
                  <p className="mt-3 text-center text-[0.74rem] text-tinta-400">{agendamento.aviso}</p>
                )}
              </div>
            ) : (
              <p className="mt-6 border-t border-tinta-400/10 pt-6 text-[0.85rem] text-tinta-400">
                Selecione um dia no calendário acima.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
