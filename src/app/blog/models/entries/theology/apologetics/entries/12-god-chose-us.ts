import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const godChoseUsEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath:
    '/blog/content/theology/apologetics/god-chose-us/content.md',
  description: 'Thankful that God chose us to receive His revelation and for giving us minds to comprehend it',
  path: '/theology/apologetics/god-chose-us',
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
  title: 'God Chose Us',
};
