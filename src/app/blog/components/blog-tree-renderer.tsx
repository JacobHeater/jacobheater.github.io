'use client';

import Link from 'next/link';
import { BlogMapEntry } from '../models/blog-map';

/**
 * Filters the blog map entries to match the given scope.
 * @param entries The list of blog map entries.
 * @param scope The scope path to filter by.
 * @returns The scoped entry or entries.
 */
function filterEntriesByScope(
  entries: BlogMapEntry[],
  scope: BlogMapEntry
): BlogMapEntry | undefined {
  let currentEntry: BlogMapEntry | undefined = {
    entry: {
      title: '',
      date: new Date(),
      tags: [],
      contentPath: '',
      path: '',
    },
    subentries: entries,
  };

  if (!currentEntry.subentries) {
    return;
  }

  for (const entry of currentEntry.subentries) {
    if (!currentEntry?.subentries) break;

    currentEntry = currentEntry.subentries.find(
      (sub) => sub.entry.path === entry.entry.path
    );
  }

  return currentEntry;
}

/**
 * Renders a tree of blog entries.
 * @param entries The blog map entries or a single entry.
 * @param level The current nesting level.
 * @param parentPath The parent path to prepend to entry URLs.
 * @returns A JSX element representing the tree.
 */
export function renderTree(
  entries: BlogMapEntry | BlogMapEntry[] | undefined,
  level = 0
) {
  if (!entries) return null;

  const entryList = Array.isArray(entries) ? entries : [entries];

  return (
    <div>
      {entryList.map((entry) => {
        return (
          <div
            key={entry.entry.path}
            className="pt-2"
            style={{ paddingLeft: `${level * 2}rem` }}>
            <Link
              href={`/blog${entry.entry.path}`}
              className="text-primary hover:underline flex items-center justify-between gap-2">
              <span className="text-lg font-bold break-words md:flex-[0.7]">
                {entry.entry.title}
              </span>
              <span className="whitespace-nowrap md:flex-[0.3]">
                {entry.entry.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
            </Link>
            {entry.subentries && renderTree(entry.subentries, level + 1)}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Renders a scoped tree of blog entries.
 * @param entries The root blog map entries.
 * @param scope The scope entry to filter by.
 * @returns A JSX element representing the scoped tree.
 */
export function renderScopedTree(entries: BlogMapEntry[], scope: BlogMapEntry) {
  const scopedEntry = filterEntriesByScope(entries, scope);
  return renderTree(scopedEntry?.subentries, 0);
}
