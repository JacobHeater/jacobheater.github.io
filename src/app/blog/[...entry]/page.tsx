import { BlogRenderer } from '../components/blog-renderer';
import { BlogSeriesRenderer } from '../components/blog-series-renderer';
import { blogEntryErd } from '../models/blog-map';

interface BlogEntryPageProps {
  params: Promise<{ entry: string[] }>;
}

export function generateStaticParams() {
  return blogEntryErd.getAllEntries().map((entry) => ({
    entry: entry.path.split('/').slice(1),
  }));
}

export default async function BlogEntryPage({ params }: BlogEntryPageProps) {
  const entry = (await params).entry;
  const isSeries = [...entry].reverse().at(0)?.toLowerCase() === 'series';
  const entryPath = '/' + (isSeries ? entry.slice(0, -1) : entry).join('/');
  const blogEntry = blogEntryErd.getEntryByPath(entryPath);

  if (!blogEntry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Blog entry not found</div>
      </div>
    );
  }

  const children = blogEntryErd.getAllDescendants(blogEntry);

  if (isSeries && children) {
    return <BlogSeriesRenderer blog={blogEntry} children={children} />;
  } else {
    return <BlogRenderer blog={blogEntry} />;
  }
}
