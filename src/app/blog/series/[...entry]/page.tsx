import { BlogSeriesRenderer } from '../../components/blog-series-renderer';
import { blogEntryErd } from '../../models/blog-map';
import fs from 'fs';
import path from 'path';

interface BlogSeriesPageProps {
  params: Promise<{ entry: string[] }>;
}

export function generateStaticParams() {
  return blogEntryErd.getAllEntries().map((entry) => ({
    entry: entry.path.split('/').slice(1),
  }));
}

export default async function BlogSeriesPage({ params }: BlogSeriesPageProps) {
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

  const children = blogEntryErd.getAllDescendants(blogEntry);

  if (children.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">No series found for this blog entry</div>
      </div>
    );
  }

  const allEntries = [blogEntry, ...children];
  const contents: Record<string, string> = {};
  for (const entry of allEntries) {
    const filePath = path.join(
      process.cwd(),
      'src',
      entry.contentPath.replace('/blog/content/', '/blog/')
    );
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const blogPath = entry.path.replace(/^\//, '');
    contents[entry.contentPath] = rawContent.replace(
      /__blogpath__/g,
      `/blog/${blogPath}`
    );
  }

  return (
    <BlogSeriesRenderer
      blog={blogEntry}
      blogChildren={children}
      contents={contents}
    />
  );
}
