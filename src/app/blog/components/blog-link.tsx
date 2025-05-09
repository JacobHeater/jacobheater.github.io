import Link from 'next/link';
import { BlogEntry } from '../models/blog-entry';

export function BlogLink({
  blog,
  className,
}: {
  blog: BlogEntry;
  className?: string;
}) {
  return (
    <Link
      href={`/blog${blog.path}`}
      className={`text-[var(--accent)] hover:underline ${className}`}>
      {blog.title}
    </Link>
  );
}
