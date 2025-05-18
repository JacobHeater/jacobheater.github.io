import { BlogEntry } from '../../blog-entry';

export const theologyEntry: BlogEntry = {
  id: 1,
  date: { year: 2025, month: 5, day: 2 },
  title: 'Theology',
  path: '/theology',
  contentPath: '/blog/content/theology/content.md',
  tags: ['theology'],
};

export const confessionEntry: BlogEntry = {
  id: 2,
  date: { year: 2025, month: 5, day: 2 },
  title: "Believer's Confession",
  path: '/theology/believers-confession',
  description: 'My confession of faith as a believer in Jesus Christ.',
  contentPath: '/blog/content/theology/believers-confession/content.md',
  tags: ['theology', 'faith', 'truth', 'belief', 'knowledge', 'philosophy'],
};

export const apologeticsEntry: BlogEntry = {
  id: 6,
  date: { year: 2025, month: 5, day: 16 },
  title: 'Apologetics',
  description: 'My approach to defending the Christian faith.',
  path: '/theology/apologetics',
  contentPath: '/blog/content/theology/apologetics/content.md',
  tags: [
    'theology',
    'faith',
    'apologetics',
    'philosophy',
    'knowledge',
    'truth',
  ],
};
