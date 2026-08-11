'use client';

import { useEffect, useState } from 'react';
import TriagemContato from './TriagemContato';

/**
 * Botão flutuante discreto: aparece suavemente após o início da rolagem
 * e não cobre conteúdo essencial. Abre a triagem de contato em vez de ir
 * direto para o WhatsApp.
 */
export default function WhatsappFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 480);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <TriagemContato
      apenasIcone
      ariaLabel="Entrar em contato pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      ariaHidden={!visivel}
      className={`fixed bottom-5 right-5 z-40 grid h-13 w-13 place-items-center rounded-full
                  bg-marinho-700 text-areia-50 shadow-[0_10px_30px_-12px_rgba(16,30,53,0.75)]
                  transition-all duration-500 ease-suave hover:bg-marinho-600 sm:bottom-7 sm:right-7
                  ${visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      style={{ height: '3.25rem', width: '3.25rem' }}
    />
  );
}
