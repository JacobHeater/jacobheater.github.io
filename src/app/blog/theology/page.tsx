'use client';

import { blogMap } from '../models/blog-map';
import { renderScopedTree } from '../components/blog-tree-renderer';
import { BlogRenderer } from '../components/blog-renderer';
import { theologyEntry } from '../models/entries/theology/entries';

export default function TheologyBlogHome() {
  return (
    <BlogRenderer
      blog={theologyEntry()}
      subTree={renderScopedTree(blogMap, 'theology')}
    />
  );
}
