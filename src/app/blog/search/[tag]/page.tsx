import { blogFlatMap } from '../../models/blog-map';
import { TagSearchClient } from './client';

interface TagSearchProps {
  params: Promise<{ tag: string }>;
}

export default async function TagSearch({ params }: TagSearchProps) {
  return <TagSearchClient tag={(await params).tag} />;
}
