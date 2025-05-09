import { BlogRenderer } from '../components/blog-renderer';
import { blogFlatMap } from '../models/blog-map';

interface BlogEntryPageProps {
  params: Promise<{ entry: string[] }>;
}

export default async function BlogEntryPage({ params }: BlogEntryPageProps) {
  const entry = (await params).entry;
  const entryPath = '/' + entry.join('/');
  const blogEntry = blogFlatMap.find((e) => e.entry.path === entryPath);

  if (!blogEntry) {
    return <div className="text-2xl mx-auto">Blog entry not found</div>;
  }

  return (
    <BlogRenderer
      blog={blogEntry}
    />
  );
}
