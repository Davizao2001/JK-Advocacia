import Reveal from './ui/Reveal';
import { iconesFaixa } from './ui/Icones';
import { faixaConfianca } from '@/content/site';

export default function FaixaConfianca() {
  return (
    <section aria-label="Compromissos do escritório" className="bg-areia-100">
      <div className="container-site grid gap-px overflow-hidden py-4 sm:grid-cols-3 sm:gap-0">
        {faixaConfianca.map((item, i) => {
          const Icone = iconesFaixa[item.icone];
          return (
            <Reveal
              key={item.titulo}
              delay={i * 110}
              className={`flex gap-4 py-8 sm:px-7 ${
                i > 0 ? 'border-t border-tinta-400/12 sm:border-l sm:border-t-0' : ''
              }`}
            >
              <span className="mt-0.5 h-6 w-6 shrink-0 text-marinho-600">
                <Icone />
              </span>
              <div>
                <h2 className="font-serif text-[1.06rem] leading-snug text-tinta-800">
                  {item.titulo}
                </h2>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-tinta-500">
                  {item.texto}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
