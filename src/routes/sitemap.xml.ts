import { allDocs, allPages } from 'content-collections'

export function GET() {
  const baseUrl = 'https://walidoux.github.io/fintech-academy'

  // Generate sitemap URLs
  const urls = [
    // Home page
    `${baseUrl}/fintech-academy/`,

    // All docs pages
    ...allDocs.map(
      (doc) => `${baseUrl}/fintech-academy/docs/${doc._meta.path}`
    ),

    // All pages
    ...allPages.map(
      (page) => `${baseUrl}/fintech-academy/docs/${page._meta.path}`
    ),
  ]

  // Remove duplicates and sort
  const uniqueUrls = [...new Set(urls)].sort()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
