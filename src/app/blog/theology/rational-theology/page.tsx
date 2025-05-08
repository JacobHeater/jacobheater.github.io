'use client';

import { BlogRenderer } from '../../components/blog-renderer';
import { rationalTheologyEntry } from '../../models/entries/theology/entries';

export default function RationalTheology() {
  return <BlogRenderer blog={rationalTheologyEntry()} />;
}
