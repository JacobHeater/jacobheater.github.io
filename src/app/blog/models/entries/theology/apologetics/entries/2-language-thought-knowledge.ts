import { BlogEntry } from '@/app/blog/models/blog-entry';
import { uuid } from '@/app/utils/uuid';

export const howDoWeKnowWhatWeKnowEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 2 },
  contentPath: '/blog/content/theology/apologetics/language-thought-knowledge/content.md',
  description: 'How do we know what we know?',
  path: '/theology/apologetics/language-thought-knowledge',
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
  title: 'Language and Thought as the Foundation of Knowledge',
};
