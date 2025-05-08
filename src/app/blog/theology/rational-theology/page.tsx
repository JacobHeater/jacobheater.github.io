'use client';

import { BlogRenderer } from '../../components/blog-renderer';
import { BlogEntry } from '../../models/blog-entry';

export default function BelieversConfession() {
  return <BlogRenderer blog={getBlogEntry()} />;
}

function getBlogEntry(): BlogEntry {
  return {
    date: new Date('05/02/2025'),
    title: "The Rational Basis for Theology",
    description: 'A rational approach to understanding theology and the nature of God.',
    contentPath: '/blog/content/theology/rational-theology/content.md',
    tags: ['theology', 'faith', 'truth', 'belief', 'knowledge', 'philosophy'],
  };
}
