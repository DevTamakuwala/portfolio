const fs = require('fs');
const path = require('path');

// Base URL for your deployment
const BASE_URL = 'https://devtamakuwala.in';

// Define the static routes
const staticRoutes = [
  '/',
];

// Define the documentation sections (matches Docs.jsx)
const docsSections = [
  'introduction',
  'installation',
  'quick-start',
  'configuration',
  'annotations',
  'architecture',
  'examples',
  'curl-examples',
  'performance',
  'security',
  'testing',
  'faq'
];

const generateSitemap = () => {
  const currentDate = new Date().toISOString();

  // Generate XML for static routes
  const staticUrls = staticRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`).join('');

  // Generate XML for document routes
  const docUrls = docsSections.map(slug => `
  <url>
    <loc>${BASE_URL}/documentation/smarti18nauto/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  // Combine to create the full sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${docUrls}
</urlset>`;

  // Write the sitemap to the public directory
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap.trim());

  // Also write to the build directory if it exists (for postbuild server setups)
  const buildDir = path.join(__dirname, '../build');
  if (fs.existsSync(buildDir)) {
    fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap.trim());
    console.log('✅ Successfully generated sitemap.xml in build folder');
  }

  console.log('✅ Successfully generated sitemap.xml in public folder');
};

generateSitemap();
