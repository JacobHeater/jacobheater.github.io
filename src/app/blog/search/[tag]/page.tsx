import { blogFlatMap } from '../../models/blog-map';
import { TagSearchClient } from './client';

interface TagSearchProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  const tags = new Set<string>();
  blogFlatMap.forEach((entry) => {
    entry.entry.tags?.forEach((tag) => tags.add(tag));
  });
  return [
    ...tags.values().map((tag) => ({
      tag: tag,
    })),
  ];
}

export default async function TagSearch({ params }: TagSearchProps) {
  return <TagSearchClient tag={(await params).tag} />;
}
