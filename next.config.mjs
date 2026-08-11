/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  // `npm run export` gera uma versão estática (pasta /out) para hospedagem simples.
  output: isStaticExport ? 'export' : undefined,
  images: {
    unoptimized: isStaticExport,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
