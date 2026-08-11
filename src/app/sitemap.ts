import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    { url: site.url, lastModified: agora, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${site.url}/politica-de-privacidade`,
      lastModified: agora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${site.url}/aviso-legal`,
      lastModified: agora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
