import { blogFlatMap } from '../../models/blog-map';
import { TagSearchClient } from './client';

interface TagSearchProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  const tags: string[] = [];
  blogFlatMap
    .map((entry) => entry.entry.tags)
    .forEach((tagList) => {
      tagList.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
  return tags.map((tag) => ({ tag }));
}

export default async function TagSearch({ params }: TagSearchProps) {
  return <TagSearchClient tag={(await params).tag} />;
}
