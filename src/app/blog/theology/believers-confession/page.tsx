'use client';

import { BlogRenderer } from '../../components/blog-renderer';
import { confessionEntry } from '../../models/entries/theology/entries';

export default function BelieversConfession() {
  return <BlogRenderer blog={confessionEntry()} />;
}