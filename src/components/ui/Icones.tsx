type IconProps = { className?: string };

const base = 'h-full w-full';

/** Ícones minimalistas de traço — sem martelo, balança ou coluna clássica. */

export function IconeConversa({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.43L4 20.5l1.2-3.3C4.2 16 3.5 14.3 3.5 12.5 3.5 8.9 7.1 6 11.5 6s8.5 2.9 8.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M8.5 11.5h7M8.5 14.5h4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconeLupa({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M15.6 15.6 20 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8.6 11.4l1.7 1.7 3.3-3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconeEstrela({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 4.5l2.24 4.6 5.01.73-3.62 3.55.85 5-4.48-2.37-4.48 2.37.85-5L4.75 9.83l5.01-.73L12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeWhatsapp({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.67.44 3.31 1.28 4.75L2.5 21.5l4.88-1.28a9.46 9.46 0 0 0 4.66 1.22h.01c5.23 0 9.49-4.26 9.5-9.5a9.44 9.44 0 0 0-2.78-6.72 9.42 9.42 0 0 0-6.73-2.72Zm0 17.38h-.01a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.9.76.77-2.82-.19-.29a7.87 7.87 0 0 1-1.21-4.21c0-4.35 3.54-7.89 7.9-7.89a7.84 7.84 0 0 1 5.57 2.32 7.83 7.83 0 0 1 2.31 5.58c-.01 4.35-3.55 7.82-7.93 7.82Z" />
    </svg>
  );
}

export function IconeSeta({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconePino({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="12" cy="10.6" r="2.3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconeTelefone({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.2 4h2.6l1.3 3.3-1.7 1.3a10.4 10.4 0 0 0 5 5l1.3-1.7 3.3 1.3v2.6c0 .9-.75 1.6-1.64 1.5C9.9 16.7 7.3 14.1 4.7 6.9 4.6 5.9 5.3 4 6.2 4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeInstagram({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconeRelogio({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 7.6V12l3 1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconeMaleta({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3.5" y="7.5" width="17" height="11" rx="1.8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3.5 12.5h17" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconePlay({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9.3" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10.3 8.6 15.8 12l-5.5 3.4V8.6Z" fill="currentColor" />
    </svg>
  );
}

export function IconeX({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconeCoracao({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 20s-7.2-4.4-9.7-9.1C.8 7.6 2.2 4.3 5.4 3.5c2-.5 3.9.3 5 1.9a5.3 5.3 0 0 1 1.6-1.9c2-1.5 4.8-1.1 6.5.7 1.9 2 1.9 5-.1 8C16.6 15.9 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeEscudo({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 3.5 19 6v5.2c0 4.6-3 7.8-7 9.3-4-1.5-7-4.7-7-9.3V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 11.8l2 2 4-4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const iconesFaixa = {
  conversa: IconeConversa,
  lupa: IconeLupa,
  estrela: IconeEstrela,
};

export const iconesDiferenciais = {
  conversa: IconeConversa,
  lupa: IconeLupa,
  escudo: IconeEscudo,
  coracao: IconeCoracao,
};
