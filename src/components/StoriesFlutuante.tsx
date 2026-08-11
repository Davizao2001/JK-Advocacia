'use client';

import { useEffect, useState } from 'react';
import { useStories } from './StoriesProvider';
import { IconePlay } from './ui/Icones';

/**
 * Atalho flutuante para os Stories, empilhado com o botão do WhatsApp no
 * canto inferior direito — mesma lógica de aparecer suavemente após o
 * início da rolagem. Abre sempre o primeiro grupo de histórias disponível.
 */
export default function StoriesFlutuante() {
  const { grupos, abrirGrupo } = useStories();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 480);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  if (grupos.length === 0) return null;

  return (
    <button
      type="button"
      onClick={() => abrirGrupo(0)}
      aria-label="Ver histórias em vídeo"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={`fixed bottom-[4.75rem] right-5 z-40 grid h-13 w-13 place-items-center rounded-full
                  bg-gradient-to-tr from-dourado-300 via-dourado-500 to-marinho-600 p-[2.5px]
                  shadow-[0_10px_30px_-12px_rgba(16,30,53,0.75)] transition-all duration-500 ease-suave
                  hover:scale-[1.06] sm:bottom-[5.75rem] sm:right-7
                  ${visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      style={{ height: '3.25rem', width: '3.25rem' }}
    >
      <span className="grid h-full w-full place-items-center rounded-full border-[2px] border-areia-100 bg-marinho-800 text-areia-50">
        <IconePlay className="h-5 w-5" />
      </span>
    </button>
  );
}
