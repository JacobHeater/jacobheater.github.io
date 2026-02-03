import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const theGodWhoSpeaksEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath:
    '/blog/content/theology/apologetics/the-god-who-speaks/content.md',
  description: 'Examples of sensory revelation in scripture',
  path: '/theology/apologetics/the-god-who-speaks',
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
  title: 'The God Who Speaks',
};
