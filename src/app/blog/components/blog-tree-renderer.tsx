'use client';

import Link from 'next/link';
import { FormattedDate } from '@/app/components/formatted-date';
import { blogEntryErd } from '@/app/blog/models/blog-map';
import { BlogEntry } from '@/app/blog/models/blog-entry';

/**
 * Renders a tree of blog entries.
 * @param entry The current blog entry.
 * @param level The current nesting level.
 * @returns A JSX element representing the tree.
 */
export function renderTree(entry: BlogEntry, level = 0) {
  const children = blogEntryErd.getChildren(entry);

  return (
    <div key={entry.id}>
      <div className="pt-2" style={{ paddingLeft: `${level * 2}rem` }}>
        <Link
          href={`/blog${entry.path}`}
          className="text-primary hover:underline flex items-center justify-between gap-2">
          <span className="text-lg font-bold break-words md:flex-[0.7]">
            {entry.title}
          </span>
          <FormattedDate
            year={entry.date.year}
            month={entry.date.month}
            day={entry.date.day}
          />
        </Link>
      </div>
      {children && children.map((child) => renderTree(child, level + 1))}
    </div>
  );
}
