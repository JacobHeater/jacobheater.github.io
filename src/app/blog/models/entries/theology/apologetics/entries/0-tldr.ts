import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const apologeticsTldrEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 6, day: 1 },
  contentPath: '/blog/content/theology/apologetics/tldr/content.md',
  description: 'A condensed overview of the apologetics series and its core argument',
  path: '/theology/apologetics/tldr',
  tags: [
    'theology',
    'apologetics',
    'faith',
    'belief',
    'reason',
    'knowledge',
    'truth',
    'summary',
  ],
  title: 'TL;DR',
};
