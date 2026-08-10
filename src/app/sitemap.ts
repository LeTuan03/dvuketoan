import { MetadataRoute } from 'next';
import { articleService } from '@/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vtax.com.vn';

  // Static routes
  const staticRoutes = [
    '',
    '/gioi-thieu',
    '/lien-he',
    '/dich-vu',
    '/kien-thuc',
    '/tra-cuu',
    '/tin-tuc',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes - Articles / Knowledge
  const articles = await articleService.getAllSummary();
  const articleRoutes = articles
    .filter((article: any) => !article.isDraft)
    .map((article: any) => ({
      url: `${baseUrl}/kien-thuc/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...articleRoutes];
}
