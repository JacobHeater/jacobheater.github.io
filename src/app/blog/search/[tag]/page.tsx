import { blogMap } from '../../models/blog-map';
import { flattenBlogMap } from './common';
import { TagSearchClient } from './client';

export function generateStaticParams() {
  const flatEntries = flattenBlogMap(blogMap);
  const allTags = flatEntries.flatMap((entry) => entry.blogEntry.tags);
  const tags = new Set<string>(allTags);

  return tags.values().map((tag: string) => ({
    tag,
  }));
}

export default async function TagSearch({
  params,
}: {
  params: { tag: string };
}) {
  return <TagSearchClient tag={await params.tag} />;
}
