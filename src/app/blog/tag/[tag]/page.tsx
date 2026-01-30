import { Metadata } from 'next';
import { blogFlatMap } from '../../models/blog-map';
import { TagSearchClient } from './client';

interface TagSearchProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  const tags: string[] = [];
  blogFlatMap
    .map((entry) => entry.tags)
    .forEach((tagList) => {
      tagList.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagSearchProps): Promise<Metadata> {
  const tag = (await params).tag;
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `${capitalizedTag} Blog Posts - Jacob Heater`,
    description: `Browse all blog posts tagged with "${capitalizedTag}" on Jacob Heater's blog. Topics include technology, software engineering, theology, and more.`,
    keywords: [tag, 'blog', 'Jacob Heater', capitalizedTag],
    openGraph: {
      title: `${capitalizedTag} Blog Posts - Jacob Heater`,
      description: `Browse all blog posts tagged with "${capitalizedTag}" on Jacob Heater's blog.`,
      type: 'website',
      url: `https://jacobheater.com/blog/tag/${tag}`,
    },
    twitter: {
      card: 'summary',
      title: `${capitalizedTag} Blog Posts - Jacob Heater`,
      description: `Browse all blog posts tagged with "${capitalizedTag}" on Jacob Heater's blog.`,
    },
    alternates: {
      canonical: `https://jacobheater.com/blog/tag/${tag}`,
    },
  };
}

export default async function TagSearch({ params }: TagSearchProps) {
  return <TagSearchClient tag={(await params).tag} />;
}
