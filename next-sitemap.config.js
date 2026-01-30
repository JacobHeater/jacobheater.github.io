/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jacobheater.com',
  generateRobotsTxt: true,
  outDir: './public',
  output: 'standalone',
  changefreq: 'weekly',
  priority: {
    '/': 1.0,
    '/about/resume': 0.9,
    '/blog': 0.8,
    '/tools': 0.7,
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom transform for blog posts
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    // Custom transform for tool pages
    if (path.startsWith('/tools/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
