import Reveal from './ui/Reveal';
import { iconesDiferenciais } from './ui/Icones';
import { diferenciais } from '@/content/site';

export default function Diferenciais() {
  return (
    <section
      aria-labelledby="diferenciais-titulo"
      className="bg-areia-200 py-20 sm:py-28"
    >
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="sobretitulo">{diferenciais.sobretitulo}</p>
          <h2 id="diferenciais-titulo" className="titulo-secao">
            {diferenciais.titulo}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px bg-tinta-400/15 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.itens.map((item, i) => {
            const Icone = iconesDiferenciais[item.icone];
            return (
              <Reveal
                key={item.titulo}
                delay={i * 100}
                className="group bg-areia-200 p-8 transition-colors duration-500 ease-suave hover:bg-areia-100"
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 place-items-center rounded-full bg-marinho-700/[0.07] text-marinho-700
                             transition-all duration-500 ease-suave group-hover:scale-110 group-hover:bg-marinho-700/[0.12]"
                >
                  <Icone className="h-5 w-5" />
                </span>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-px w-8 bg-dourado-400/70 transition-all duration-500 ease-suave group-hover:w-14"
                />
                <h3 className="mt-4 font-serif text-[1.1rem] leading-snug text-tinta-800">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-[1.7] text-tinta-500">
                  {item.texto}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
