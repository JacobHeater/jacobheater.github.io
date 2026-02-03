import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const theGodOfRevelationEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath: '/blog/content/theology/apologetics/the-god-of-revelation/content.md',
  description: 'A rigorous, evidence-based, logical, and empirical defense of the Christian faith',
  path: '/theology/apologetics/the-god-of-revelation',
  tags: [
    'theology',
    'faith',
    'belief',
    'christianity',
    'reason',
    'apologetics',
    'philosophy',
    'knowledge',
    'truth',
    'logos',
  ],
  title: 'The God of Revelation',
};
