import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const madeInHisImageEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath:
    '/blog/content/theology/apologetics/made-in-his-image/content.md',
  description: 'The unique spiritual nature of humans in creation',
  path: '/theology/apologetics/made-in-his-image',
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
  title: 'Made in His Image',
};
