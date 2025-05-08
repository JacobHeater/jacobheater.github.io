'use client';

import { blogMap } from '../models/blog-map';
import { renderScopedTree } from '../components/blog-tree-renderer';
import { BlogEntry } from '../models/blog-entry';
import { BlogRenderer } from '../components/blog-renderer';

export default function TheologyBlogHome() {
  return (
    <BlogRenderer
      blog={theologyEntry()}
      subTree={renderScopedTree(blogMap, 'theology')}
    />
  );
}

export function theologyEntry(): BlogEntry {
  return {
    date: new Date('2025-05-02'),
    title: 'Theology',
    contentPath: '/blog/content/theology/content.md',
    tags: ['theology'],
  };
}
