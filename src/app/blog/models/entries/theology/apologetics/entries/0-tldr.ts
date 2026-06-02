import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const apologeticsTldrEntry: BlogEntry = {
  id: uuid(),
  publicationDate: { year: 2026, month: 6, day: 1 },
  lastUpdatedDate: { year: 2026, month: 6, day: 2 },
  contentPath: '/blog/content/theology/apologetics/tldr/content.md',
  description:
    'A condensed overview of the apologetics series and its core argument',
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
