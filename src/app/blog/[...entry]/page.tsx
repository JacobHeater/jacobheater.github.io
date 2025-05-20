import { BlogRenderer } from '../components/blog-renderer';
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
  const entryPath = `/${entry.join('/')}`;
  const blogEntry = blogEntryErd.getEntryByPath(entryPath);

  if (!blogEntry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Blog entry not found</div>
      </div>
    );
  }

  return <BlogRenderer blog={blogEntry} />;
}
