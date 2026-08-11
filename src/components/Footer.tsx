import Image from 'next/image';
import Link from 'next/link';
import { navegacao, rodape, site } from '@/content/site';
import { telUrl } from '@/lib/links';

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-tinta-400/15 bg-areia-200">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo.png"
            alt={`${site.nome} — ${site.profissional}`}
            width={330}
            height={303}
            quality={95}
            className="h-28 w-auto sm:h-32"
          />
          <p className="mt-6 max-w-xs text-[0.9rem] leading-[1.7] text-tinta-500">
            Orientação jurídica em Direito de Família e Direito Trabalhista, com
            escritório no Jardim Novo Horizonte, em São Paulo.
          </p>
          <p className="mt-6 text-[0.92rem] text-tinta-700">
            {site.profissional}
            {site.oab ? (
              <span className="ml-2 text-[0.84rem] text-tinta-400">{site.oab}</span>
            ) : null}
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="text-[0.72rem] uppercase tracking-[0.18em] text-tinta-400">
            Navegação
          </h2>
          <ul className="mt-5 grid gap-2.5">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className="text-[0.92rem] text-tinta-600 transition-colors duration-300 hover:text-marinho-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[0.72rem] uppercase tracking-[0.18em] text-tinta-400">
            Contato
          </h2>
          <ul className="mt-5 grid gap-2.5 text-[0.92rem] text-tinta-600">
            <li>
              <a
                href={telUrl}
                className="transition-colors duration-300 hover:text-marinho-700"
              >
                {site.contato.telefoneExibicao}
              </a>
            </li>
            <li>
              <a
                href={site.contato.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-marinho-700"
              >
                {site.contato.instagram}
              </a>
            </li>
            <li>
              <address className="not-italic leading-[1.7]">
                {site.endereco.logradouro}
                <br />
                {site.endereco.bairro}
                <br />
                {site.endereco.cidade} – {site.endereco.uf}, CEP {site.endereco.cep}
              </address>
            </li>
          </ul>

          <ul className="mt-6 grid gap-2.5">
            {rodape.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[0.88rem] text-tinta-500 underline decoration-tinta-400/30 underline-offset-4 transition-colors duration-300 hover:text-marinho-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-tinta-400/15">
        <div className="container-site flex flex-col gap-4 py-7 text-[0.82rem] text-tinta-400 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">{rodape.aviso}</p>
          <p className="shrink-0">
            © {ano} {site.nome}
          </p>
        </div>
      </div>
    </footer>
  );
}
