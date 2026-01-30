'use client';

import { useParams } from 'next/navigation';
import { blogFlatMap } from '../../models/blog-map';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { RenderFlat } from '../../components/blog-tree-renderer';

export function TagSearchClient({ tag }: { tag: string }) {
  const params = useParams();

  if (tag) {
    const matchingEntries = blogFlatMap
      .filter((entry) => entry.tags?.includes(params.tag as string))
      .map((entry) => {
        const clone = structuredClone(entry);
        return clone;
      });

    if (matchingEntries.length === 0) {
      return (
        <>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-2xl text-center">
            No entries found for tag &quot;{params.tag}&quot; 🥴
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
          <SearchIcon /> Blog Entries by Tag &quot;{params.tag}&quot;
        </div>
        <RenderFlat entries={matchingEntries} />
      </div>
    );
  } else {
    return <div>Tag {params.tag} not found.</div>;
  }
}
