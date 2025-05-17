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
      <div
        className="pt-2 flex items-center"
        style={{ paddingLeft: `${level * 2}rem` }}>
        <Link
          href={`/blog${entry.path}`}
          className="text-primary hover:underline flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg font-medium break-words md:flex-[0.7] flex-1 min-w-0">
            {entry.title}
          </span>
        </Link>
        <span className="flex-shrink-0 ml-4 text-[var(--accent)]">
          <FormattedDate
            year={entry.date.year}
            month={entry.date.month}
            day={entry.date.day}
          />
        </span>
      </div>
      {children && children.map((child) => renderTree(child, level + 1))}
    </div>
  );
}

export function renderFlat(entries: BlogEntry[]) {
  return (
    <div className="flex flex-col mt-4">
      {entries.map((entry) => (
        <div key={entry.id}>
          <div className="pt-2 flex items-center" /* no paddingLeft for flat */>
            <Link
              href={`/blog${entry.path}`}
              className="text-primary hover:underline flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg font-medium break-words md:flex-[0.7] flex-1 min-w-0">
                {entry.title}
              </span>
            </Link>
            <span className="flex-shrink-0 ml-4 text-[var(--accent)]">
              <FormattedDate
                year={entry.date.year}
                month={entry.date.month}
                day={entry.date.day}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
