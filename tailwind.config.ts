import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Azul-marinho — cor principal, extraída da identidade visual da JK Advocacia
        marinho: {
          50: '#EEF1F7',
          100: '#DCE3EF',
          200: '#B3C1DA',
          300: '#8098C0',
          400: '#4E6D9C',
          500: '#33507C',
          600: '#233B5E',
          700: '#182B48',
          800: '#101E35',
          900: '#0A1526',
        },
        // Bege / off-white — fundos
        areia: {
          50: '#FEFEFC',
          100: '#F9F8F4',
          200: '#F1EFE8',
          300: '#E4E0D5',
          400: '#D3CCBB',
        },
        // Grafite / carvão — textos, próximo ao preto usado na logo
        tinta: {
          400: '#877F76',
          500: '#655D55',
          600: '#48413B',
          700: '#332D28',
          800: '#221D19',
        },
        // Dourado — mesmo tom da balança e do "ADVOCACIA" na identidade visual
        dourado: {
          300: '#E3C77E',
          400: '#CDA94F',
          500: '#B8912F',
          600: '#856815',
          700: '#6E5419',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        suave: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1.06)' },
          to: { transform: 'scale(1.14)' },
        },
        // Cortina que se abre revelando o título — o "portal" da hero
        'abrir-porta': {
          from: { transform: 'scaleX(1)' },
          to: { transform: 'scaleX(0)' },
        },
        'desenhar-arco': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slow-zoom': 'slow-zoom 14s ease-out both',
        'abrir-porta': 'abrir-porta 1.1s cubic-bezier(0.65, 0, 0.35, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
