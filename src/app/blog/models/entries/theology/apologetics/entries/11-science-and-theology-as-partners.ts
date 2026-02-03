import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const scienceAndTheologyAsPartnersEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath:
    '/blog/content/theology/apologetics/science-and-theology-as-partners/content.md',
  description: 'Harmonizing scientific discovery with theological truth',
  path: '/theology/apologetics/science-and-theology-as-partners',
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
  title: 'Science and Theology as Partners',
};
