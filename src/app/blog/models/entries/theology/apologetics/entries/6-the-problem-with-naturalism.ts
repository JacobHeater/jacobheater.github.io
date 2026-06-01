import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const theProblemWithNaturalismEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath:
    '/blog/content/theology/apologetics/the-problem-with-naturalism/content.md',
  description: 'Circular reasoning and its limits',
  seoTitle: 'The Problem with Naturalism — Christian Apologetics Rebuttal',
  seoDescription:
    'A Christian apologetics critique of naturalism, explaining why strict naturalism fails to account for transcendent knowledge and why revelation provides a better foundation.',
  keywords: [
    'Christian apologetics',
    'naturalism rebuttal',
    'critique of naturalism',
    'faith and reason',
    'apologetics',
    'transcendent knowledge',
    'naturalism',
  ],
  path: '/theology/apologetics/the-problem-with-naturalism',
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
  title: 'The Problem with Naturalism',
};
