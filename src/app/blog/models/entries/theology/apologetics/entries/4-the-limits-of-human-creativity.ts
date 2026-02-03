import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const theLimitsOfHumanCreativityEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath:
    '/blog/content/theology/apologetics/the-limits-of-human-creativity/content.md',
  description: 'Why We Can Reorganize but Not Transcend',
  path: '/theology/apologetics/the-limits-of-human-creativity',
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
    'epistemology',
    'logos',
  ],
  title: 'The Limits of Human Creativity',
};
