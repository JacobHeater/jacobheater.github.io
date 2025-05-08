'use client';

import { BlogRenderer } from '../../components/blog-renderer';
import { BlogEntry } from '../../models/blog-entry';

export default function BelieversConfession() {
  return <BlogRenderer blog={confessionEntry()} />;
}

export function confessionEntry(): BlogEntry {
  return {
    date: new Date('05/02/2025'),
    title: "Believer's Confession",
    description: 'My confession of faith as a believer in Jesus Christ.',
    contentPath: '/blog/content/theology/believers-confession/content.md',
    tags: ['theology', 'faith', 'truth', 'belief', 'knowledge', 'philosophy'],
  };
}
