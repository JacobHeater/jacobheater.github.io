import { BlogEntry } from '../../blog-entry';
import { uuid } from '@/app/utils/uuid';

export const theologyEntry: BlogEntry = {
  id: uuid(),
  publicationDate: { year: 2025, month: 5, day: 2 },
  title: 'Theology',
  path: '/theology',
  contentPath: '/blog/content/theology/content.md',
  tags: ['theology'],
};

export const confessionEntry: BlogEntry = {
  id: uuid(),
  publicationDate: { year: 2025, month: 5, day: 2 },
  title: "Believer's Confession",
  path: '/theology/believers-confession',
  description: 'My confession of faith as a believer in Jesus Christ.',
  contentPath: '/blog/content/theology/believers-confession/content.md',
  tags: ['theology', 'faith', 'truth', 'belief', 'knowledge', 'philosophy'],
};

export const apologeticsEntry: BlogEntry = {
  id: uuid(),
  publicationDate: { year: 2025, month: 5, day: 16 },
  title: 'Apologetics',
  description: 'My approach to defending the Christian faith.',
  seoTitle: 'Christian Apologetics — Defense of Faith with Reason',
  seoDescription:
    'A series of Christian apologetics essays defending faith through logic, revelation, and thoughtful critique of naturalism.',
  keywords: [
    'Christian apologetics',
    'defending the faith',
    'naturalism',
    'theology',
    'faith',
    'reason',
  ],
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
