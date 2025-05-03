interface SitemapEntry {
  url: string;
  displayText: string;
}

export const sitemap: Array<SitemapEntry> = [
  {
    url: '/',
    displayText: 'Home',
  },
  {
    url: '/about/resume',
    displayText: 'Resume',
  },
  {
    url: '/blog',
    displayText: 'Blog',
  },
];
