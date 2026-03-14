import { BlogEntry } from '../../blog-entry';
import { uuid } from '@/app/utils/uuid';

export const meditationsEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 10 },
  title: 'Meditations',
  path: '/meditations',
  description: 'Reflections and life perspectives on various topics.',
  contentPath: '/blog/content/meditations/content.md',
  tags: ['meditation', 'reflection', 'personal-growth'],
};

export const sufferingEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 10 },
  title: 'Suffering',
  path: '/meditations/suffering',
  description: 'Explorations on the nature and purpose of suffering.',
  contentPath: '/blog/content/meditations/suffering/content.md',
  tags: ['suffering', 'christianity', 'theology', 'faith'],
};

export const whyWouldINotSufferEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 2, day: 10 },
  title: 'Why would I not suffer?',
  path: '/meditations/suffering/why-would-i-not-suffer',
  description: 'A Christian perspective on embracing suffering as part of faith.',
  contentPath: '/blog/content/meditations/suffering/why-would-i-not-suffer/content.md',
  tags: ['suffering', 'christianity', 'faith', 'theology', 'meditation'],
};

export const aBlankSlateEntry: BlogEntry = {
  id: uuid(),
  date: { year: 2026, month: 3, day: 14 },
  title: 'A Blank Slate',
  path: '/meditations/suffering/a-blank-slate',
  description:
    'A meditation on how to integrate pain and suffering through vulnerability, forgiveness, and Christian hope to lead an impactful life through your testimony.',
  contentPath: '/blog/content/meditations/suffering/a-blank-slate/content.md',
  tags: ['suffering', 'christianity', 'faith', 'forgiveness', 'meditation', 'testimony', 'vulnerability'],
};