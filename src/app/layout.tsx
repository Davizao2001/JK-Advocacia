import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/content/site';
import { enderecoLinha } from '@/lib/links';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappFlutuante from '@/components/WhatsappFlutuante';
import StoriesProvider from '@/components/StoriesProvider';
import StoriesFlutuante from '@/components/StoriesFlutuante';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.nome}`,
  },
  description: site.seo.description,
  keywords: [
    'JK Advocacia',
    'advogado de família Jardim Novo Horizonte',
    'advocacia de família São Paulo',
    'advogado trabalhista Jardim Novo Horizonte',
    'escritório de advocacia Jardim Novo Horizonte',
    'advogado próximo ao Grajaú',
    'orientação jurídica São Paulo',
  ],
  authors: [{ name: site.nome }],
  alternates: { canonical: '/' },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.nome,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: site.imagens.openGraph,
        width: 1200,
        height: 630,
        alt: `${site.nome} — Direito de Família e Direito Trabalhista em São Paulo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    images: [site.imagens.openGraph],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: '#182B48',
  width: 'device-width',
  initialScale: 1,
};

/** Dados estruturados de serviço jurídico local. */
const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: site.nome,
  description: site.seo.description,
  url: site.url,
  telephone: `+${site.contato.telefoneE164}`,
  image: `${site.url}${site.imagens.openGraph}`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.endereco.logradouro,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.endereco.geo.lat,
    longitude: site.endereco.geo.lng,
  },
  areaServed: [
    { '@type': 'City', name: 'São Paulo' },
    { '@type': 'Place', name: 'Jardim Novo Horizonte' },
    { '@type': 'Place', name: 'Grajaú' },
  ],
  sameAs: [site.contato.instagramUrl],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: site.google.quantidade,
    bestRating: '5',
  },
  knowsAbout: ['Direito de Família', 'Direito Trabalhista', 'Orientação jurídica'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Karla:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content={enderecoLinha} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </head>
      <body>
        {/* Definição global do recorte em arco — assinatura visual do site.
            Referenciada via `clip-path: url(#arco-jk)` (classe .recorte-arco). */}
        <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
          <defs>
            <clipPath id="arco-jk" clipPathUnits="objectBoundingBox">
              <path d="M0,1 L0,0.34 C0,0.14 0.22,0 0.5,0 C0.78,0 1,0.14 1,0.34 L1,1 Z" />
            </clipPath>
          </defs>
        </svg>

        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-marinho-700 focus:px-5 focus:py-3 focus:text-sm focus:text-areia-50"
        >
          Ir para o conteúdo principal
        </a>
        <StoriesProvider>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <StoriesFlutuante />
          <WhatsappFlutuante />
        </StoriesProvider>
      </body>
    </html>
  );
}
