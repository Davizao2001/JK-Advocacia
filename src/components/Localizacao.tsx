import Reveal from './ui/Reveal';
import Formulario from './Formulario';
import {
  IconeInstagram,
  IconePino,
  IconeRelogio,
  IconeSeta,
  IconeTelefone,
  IconeWhatsapp,
} from './ui/Icones';
import { localizacao, site } from '@/content/site';
import { mapaEmbedUrl, rotaUrl, telUrl, whatsappUrl } from '@/lib/links';

export default function Localizacao() {
  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className="scroll-mt-24 bg-areia-100 py-20 sm:py-28"
    >
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="sobretitulo">{localizacao.sobretitulo}</p>
          <h2 id="localizacao-titulo" className="titulo-secao">
            {localizacao.titulo}
          </h2>
          <p className="texto-secao">{localizacao.texto}</p>
        </Reveal>

        {/* Mapa em faixa larga — proporção fixa, sem depender da altura da
            coluna vizinha, o que evita o desequilíbrio visual do layout
            anterior (mapa espremido ao lado de uma coluna bem mais alta). */}
        <Reveal variante="escala" className="mt-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden border border-tinta-400/15 sm:aspect-[3/1]">
            <iframe
              src={mapaEmbedUrl}
              title={`Mapa com a localização da ${site.nome}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          {/* Dados de contato */}
          <Reveal>
            <ul className="grid gap-7">
              <li className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-marinho-600">
                  <IconePino />
                </span>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.16em] text-tinta-400">
                    Endereço
                  </p>
                  <address className="mt-2 not-italic text-[0.98rem] leading-[1.7] text-tinta-700">
                    {site.endereco.logradouro}
                    <br />
                    {site.endereco.bairro}
                    <br />
                    {site.endereco.cidade} – {site.endereco.uf}
                    <br />
                    CEP {site.endereco.cep}
                  </address>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-marinho-600">
                  <IconeTelefone />
                </span>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.16em] text-tinta-400">
                    Telefone e WhatsApp
                  </p>
                  <a
                    href={telUrl}
                    className="mt-2 block text-[0.98rem] text-tinta-700 transition-colors duration-300 hover:text-marinho-700"
                  >
                    {site.contato.telefoneExibicao}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-marinho-600">
                  <IconeInstagram />
                </span>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.16em] text-tinta-400">
                    Instagram
                  </p>
                  <a
                    href={site.contato.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-[0.98rem] text-tinta-700 transition-colors duration-300 hover:text-marinho-700"
                  >
                    {site.contato.instagram}
                  </a>
                </div>
              </li>

              {site.horarios.length > 0 && (
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-marinho-600">
                    <IconeRelogio />
                  </span>
                  <div>
                    <p className="text-[0.75rem] uppercase tracking-[0.16em] text-tinta-400">
                      Horários
                    </p>
                    <dl className="mt-2 grid gap-1.5">
                      {site.horarios.map((h) => (
                        <div key={h.dia} className="flex flex-wrap gap-x-2 text-[0.95rem]">
                          <dt className="text-tinta-700">{h.dia}</dt>
                          <dd className="text-tinta-500">— {h.horario}</dd>
                        </div>
                      ))}
                    </dl>
                    {site.horariosObservacao && (
                      <p className="mt-2 text-[0.83rem] text-tinta-400">
                        {site.horariosObservacao}
                      </p>
                    )}
                  </div>
                </li>
              )}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl('padrao')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primario"
              >
                <IconeWhatsapp />
                {localizacao.botaoWhatsapp}
              </a>
              <a
                href={rotaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secundario group"
              >
                {localizacao.botaoRota}
                <IconeSeta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          {/* Formulário — agora ao lado da coluna de contato, com sua
              própria moldura, em vez de empilhado sob o mapa */}
          <Reveal delay={140} className="border border-tinta-400/15 bg-areia-50 p-7 sm:p-9">
            <Formulario />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
