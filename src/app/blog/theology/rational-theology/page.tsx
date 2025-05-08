'use client';

import { BlogRenderer } from '../../components/blog-renderer';
import { BlogEntry } from '../../models/blog-entry';

export default function RationalTheology() {
  return <BlogRenderer blog={rationalTheologyEntry()} />;
}

export function rationalTheologyEntry(): BlogEntry {
  return {
    date: new Date('05/07/2025'),
    title: 'The Rational Basis for Theology',
    description: 'My apologetic for the rational basis for belief in God.',
    contentPath: '/blog/content/theology/rational-theology/content.md',
    tags: [
      'theology',
      'faith',
      'truth',
      'belief',
      'knowledge',
      'philosophy',
      'christianity',
      'aplogetics',
    ],
  };
}
