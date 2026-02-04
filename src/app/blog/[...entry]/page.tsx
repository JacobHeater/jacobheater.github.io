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

  const title = `${blogEntry.title} - Jacob Heater`;
  const description =
    blogEntry.description || `Read ${blogEntry.title} on Jacob Heater's blog.`;
  const url = `https://jacobheater.com/blog${blogEntry.path}`;

  return {
    title,
    description,
    keywords: [
      ...blogEntry.tags,
      'blog',
      'Jacob Heater',
      'technology',
      'software engineering',
    ],
    authors: [{ name: 'Jacob Heater' }],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      publishedTime: new Date(
        blogEntry.date.year,
        blogEntry.date.month - 1,
        blogEntry.date.day
      ).toISOString(),
      authors: ['Jacob Heater'],
      tags: blogEntry.tags,
    },
    twitter: {
      card: 'summary',
      title,
      description,
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
  const blogPath = blogEntry.path.replace(/^\//, '');
  const content = rawContent.replace(/__blogpath__/g, `/blog/${blogPath}`);

  return <BlogRenderer blog={blogEntry} content={content} />;
}
