import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://visa-beta-azure.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/login'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
