/**
 * Pequena legenda de transição entre seções — reforça o fio narrativo do
 * site sem repetir o motivo do arco (reservado às duas transições
 * principais). Puramente decorativo: o conteúdo real de cada seção já é
 * anunciado pelo seu próprio título.
 */
export default function TransicaoNarrativa({ children }: { children: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4 bg-areia-100 py-9 sm:py-11"
      role="presentation"
    >
      <span aria-hidden="true" className="h-px w-7 bg-tinta-400/25 sm:w-10" />
      <p className="text-center font-serif text-[0.98rem] italic leading-snug text-tinta-400 sm:text-[1.05rem]">
        {children}
      </p>
      <span aria-hidden="true" className="h-px w-7 bg-tinta-400/25 sm:w-10" />
    </div>
  );
}
