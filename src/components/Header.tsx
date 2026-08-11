'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Marca from './Marca';
import TriagemContato from './TriagemContato';
import { navegacao } from '@/content/site';

export default function Header() {
  const [compacto, setCompacto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  // O cabeçalho transparente com texto claro só faz sentido sobre a foto em
  // tela cheia da home. Nas demais páginas ele já nasce sólido.
  const temHeroFoto = usePathname() === '/';

  // Cabeçalho reduz levemente durante o scroll
  useEffect(() => {
    const aoRolar = () => setCompacto(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Bloqueia o scroll de fundo com o menu aberto e fecha com Esc
  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuAberto(false);
    };
    window.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', aoTeclar);
    };
  }, [menuAberto]);

  // Sobre a foto de fundo da hero (só na home), o cabeçalho começa
  // transparente com texto claro; ao rolar, vira uma barra sólida com texto
  // escuro. Nas demais páginas, já nasce sólido — nunca fica claro sobre um
  // fundo claro.
  const solido = compacto || !temHeroFoto;
  const claro = !solido;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-suave ${
        solido
          ? 'border-b border-tinta-400/12 bg-areia-100/92 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-marinho-900/45 to-transparent'
      }`}
    >
      <div
        className={`container-site flex items-center justify-between transition-all duration-500 ease-suave ${
          solido ? 'h-[66px]' : 'h-[84px]'
        }`}
      >
        <Link
          href="/#inicio"
          aria-label={`${'JK Advocacia'} — ir para o início`}
          onClick={() => setMenuAberto(false)}
          className="transition-opacity duration-300 hover:opacity-75"
        >
          <Marca invertido={claro} />
        </Link>

        {/* Navegação — desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className={`relative py-2 text-[0.9rem] transition-colors duration-300
                             after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dourado-400
                             after:transition-all after:duration-300 hover:after:w-full ${
                               claro
                                 ? 'text-areia-50/90 hover:text-areia-50'
                                 : 'text-tinta-600 hover:text-marinho-700'
                             }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <TriagemContato
            rotuloBotao="Entrar em contato"
            className="btn-primario hidden !py-3 !text-[0.88rem] sm:inline-flex"
          />

          {/* Botão do menu — mobile */}
          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
              claro
                ? 'border-areia-50/40 text-areia-50 hover:border-areia-50/70'
                : 'border-tinta-400/25 text-tinta-700 hover:border-marinho-700/40'
            }`}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ease-suave ${
                  menuAberto ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-px w-5 bg-current transition-opacity duration-200 ${
                  menuAberto ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ease-suave ${
                  menuAberto ? 'top-1/2 -rotate-45' : 'top-full'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <div
        id="menu-mobile"
        hidden={!menuAberto}
        className="lg:hidden"
      >
        <div className="border-t border-tinta-400/12 bg-areia-100/98 backdrop-blur-md">
          <nav aria-label="Navegação principal (celular)" className="container-site py-6">
            <ul className="flex flex-col">
              {navegacao.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    onClick={() => setMenuAberto(false)}
                    style={{ animationDelay: `${i * 45}ms` }}
                    className="block animate-fade-up border-b border-tinta-400/12 py-4 font-serif text-lg text-tinta-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <TriagemContato
              rotuloBotao="Entrar em contato"
              onAbrir={() => setMenuAberto(false)}
              className="btn-primario mt-6 w-full"
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
