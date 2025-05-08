'use client';

import { useParams } from 'next/navigation';
import { blogMap } from '../../models/blog-map';
import { renderTree } from '../../components/blog-tree-renderer';
import SearchIcon from '@mui/icons-material/Search';
import { flattenBlogMap } from './common';

export function TagSearchClient({ tag }: { tag: string }) {
  const params = useParams();

  if (tag) {
    const flatEntries = flattenBlogMap(blogMap);
    const matchingEntries = flatEntries
      .filter((entry) => entry.blogEntry.tags?.includes(params.tag as string))
      .map((entry) => {
        const clone = structuredClone(entry);
        delete clone.subentries;
        return clone;
      });

    return (
      <div className="flex flex-col min-h-screen p-4 w-[90vw] md:w-[70vw] l:w-[70vw] mx-auto mt-8">
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
