import { Metadata } from 'next';
import { BlogRenderer } from '../components/blog-renderer';
import { blogEntryErd } from '../models/blog-map';
import fs from 'fs';
import path from 'path';

interface BlogEntryPageProps {
  params: Promise<{ entry: string[] }>;
}

export function generateStaticParams() {
  return blogEntryErd.getAllEntries().map((entry) => ({
    entry: entry.path.split('/').slice(1),
  }));
}

export async function generateMetadata({
  params,
}: BlogEntryPageProps): Promise<Metadata> {
  const entry = (await params).entry;
  const entryPath = `/${entry.join('/')}`;
  const blogEntry = blogEntryErd.getEntryByPath(entryPath);

  if (!blogEntry) {
    return {
      title: 'Blog Entry Not Found - Jacob Heater',
    };
  }

  const title = blogEntry.seoTitle ?? `${blogEntry.title} - Jacob Heater`;
  const description =
    blogEntry.seoDescription ??
    blogEntry.description ??
    `Read ${blogEntry.title} on Jacob Heater's blog.`;
  const keywords =
    blogEntry.keywords ??
    blogEntry.tags.concat([
      'blog',
      'Jacob Heater',
      'technology',
      'software engineering',
    ]);
  const url = `https://jacobheater.com/blog${blogEntry.path}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Jacob Heater' }],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      publishedTime: new Date(
        blogEntry.publicationDate.year,
        blogEntry.publicationDate.month - 1,
        blogEntry.publicationDate.day
      ).toISOString(),
      modifiedTime: blogEntry.lastUpdatedDate
        ? new Date(
            blogEntry.lastUpdatedDate.year,
            blogEntry.lastUpdatedDate.month - 1,
            blogEntry.lastUpdatedDate.day
          ).toISOString()
        : undefined,
      authors: ['Jacob Heater'],
      tags: blogEntry.tags,
      images: blogEntry.ogImage
        ? [{ url: blogEntry.ogImage, alt: title }]
        : undefined,
    },
    twitter: {
      card: blogEntry.twitterImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: blogEntry.twitterImage ? [blogEntry.twitterImage] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogEntryPage({ params }: BlogEntryPageProps) {
  const entry = (await params).entry;
  const entryPath = `/${entry.join('/')}`;
  const blogEntry = blogEntryErd.getEntryByPath(entryPath);

  if (!blogEntry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Blog entry not found</div>
      </div>
    );
  }

  const filePath = path.join(
    process.cwd(),
    'src',
    blogEntry.contentPath.replace('/blog/content/', '/blog/')
  );
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  return <BlogRenderer blog={blogEntry} content={rawContent} />;
}
