'use client';

import { useParams } from 'next/navigation';
import { blogFlatMap } from '../../models/blog-map';
import { renderTree } from '../../components/blog-tree-renderer';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

export function TagSearchClient({ tag }: { tag: string }) {
  const params = useParams();

  if (tag) {
    const matchingEntries = blogFlatMap
      .filter((entry) => entry.entry.tags?.includes(params.tag as string))
      .map((entry) => {
        const clone = structuredClone(entry);
        delete clone.subentries;
        return clone;
      });

    if (matchingEntries.length === 0) {
      return (
        <>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-2xl text-center">
            No entries found for tag "{params.tag}" 🥴
            <div className="my-10">
              <Link
                href="/blog"
                className="text-[var(--accent)] hover:underline">
                Go back to blog home
              </Link>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex flex-col p-4 w-[90vw] md:w-[70vw] l:w-[70vw] mx-auto mt-8">
        <div className="text-2xl font-bold">
          <SearchIcon /> Blog Entries by Tag "{params.tag}"
        </div>
        <div className="mt-4">{renderTree(matchingEntries)}</div>
      </div>
    );
  } else {
    return <div>Tag {params.tag} not found.</div>;
  }
}
