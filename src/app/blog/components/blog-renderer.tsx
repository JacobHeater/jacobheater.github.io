'use client';

import { Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { RenderTree } from './blog-tree-renderer';
import { BlogEntry } from '../models/blog-entry';
import { blogEntryErd } from '../models/blog-map';
import { DividerBar } from '@/app/about/resume/components/divider-bar';
import { BlogLink } from './blog-link';
import { BlogRendererCommon } from './blog-renderer-common';

interface BlogRendererProps {
  blog: BlogEntry;
  content: string;
}

export function BlogRenderer({ blog, content }: BlogRendererProps) {
  const router = useRouter();
  const blogChildren = blogEntryErd.getChildren(blog);
  const blogParent = blogEntryErd.getParent(blog);

  // compute previous/next within a series (if this entry has a parent)
  const siblings = blogParent ? blogEntryErd.getChildren(blogParent) || [] : [];
  const index = siblings.findIndex((e) => e.path === blog.path);
  const previous = index > 0 ? siblings[index - 1] : null;
  const next =
    index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  return (
    <>
      <div className="prose flex flex-col break-words">
        <BlogRendererCommon
          blog={blog}
          blogChildren={blogChildren || []}
          seriesButton={true}
          content={content}
        />
      </div>
      <div className="my-10 flex items-center">
        <div className="font-bold">Tags:</div>
        <div className="pl-4">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <Chip
                color="primary"
                size="small"
                key={index}
                label={tag}
                className="mx-2"
                onClick={() => {
                  router.push(`/blog/tag/${tag}`);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {blogChildren && (
        <div>
          <DividerBar
            barStyle={{
              marginTop: '3rem',
            }}
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4 mt-10">
              Entries In This Series
            </h2>
            {blogChildren.map((child) => (
              <RenderTree key={child.id} entry={child} />
            ))}
          </div>
        </div>
      )}
      {blogParent && (
        <div>
          <DividerBar
            barStyle={{
              marginTop: '3rem',
            }}
          />
          <div className="mt-4">
            <p className="text-xl mt-10">
              This entry is part of the{' '}
              <BlogLink className="font-bold" blog={blogParent} /> series.
            </p>
          </div>
        </div>
      )}
      {(previous || next) && (
        <div className="mt-12 pt-8 border-t border-[var(--border,#e5e7eb)] dark:border-[var(--border,#374151)]">
          <div className="text-sm font-medium text-[var(--muted)] mb-4 uppercase tracking-wide">
            Continue Reading
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {previous ? (
              <a
                href={`/blog${previous.path}`}
                className="group relative flex items-center gap-4 p-5 rounded-xl border border-[var(--border,#e5e7eb)] dark:border-[var(--border,#374151)] bg-[var(--background)] hover:bg-[var(--secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--muted)]/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[var(--foreground)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden>
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-[var(--foreground)] mb-1">
                    Previous
                  </div>
                  <div className="font-semibold text-[var(--foreground)] truncate">
                    {previous.title}
                  </div>
                </div>
              </a>
            ) : (
              <div />
            )}

            {next ? (
              <a
                href={`/blog${next.path}`}
                className="group relative flex items-center gap-4 p-5 rounded-xl border border-[var(--border,#e5e7eb)] dark:border-[var(--border,#374151)] bg-[var(--background)] hover:bg-[var(--secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-lg md:flex-row-reverse md:text-right">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--muted)]/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[var(--foreground)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden>
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-[var(--foreground)] mb-1">
                    Next
                  </div>
                  <div className="font-semibold text-[var(--foreground)] truncate">
                    {next.title}
                  </div>
                </div>
              </a>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </>
  );
}
