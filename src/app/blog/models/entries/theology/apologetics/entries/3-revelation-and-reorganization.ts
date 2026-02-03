import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const revelationAndReorganizationEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath:
    '/blog/content/theology/apologetics/revelation-and-reorganization/content.md',
  description: 'A Framework for Knowledge Acquisition',
  path: '/theology/apologetics/revelation-and-reorganization',
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
  title: 'Revelation and Reorganization',
};
