import { TagSearchClient } from './client';

interface TagSearchProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return [{tag: ''}];
}

export default async function TagSearch({ params }: TagSearchProps) {
  return <TagSearchClient tag={(await params).tag} />;
}
