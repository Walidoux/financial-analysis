export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Block access to admin areas (if any)
Disallow: /admin/
Disallow: /api/

# Allow access to CSS, JS, and image files
Allow: *.css
Allow: *.js
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.svg
Allow: *.ico

# Sitemap
Sitemap: https://walidoux.github.io/fintech-academy/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
