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
}

export function BlogRenderer({ blog }: BlogRendererProps) {
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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {previous ? (
            <a
              href={`/blog${previous.path}`}
              className="group block p-4 rounded-lg bg-[color:var(--background-accent,rgba(255,255,255,0.03))] border border-transparent hover:border-[var(--accent)] transition-shadow shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-[var(--accent)]"
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
                <div className="min-w-0">
                  <div className="text-xs text-[var(--muted)]">Previous</div>
                  <div className="font-semibold text-lg truncate group-hover:underline">
                    {previous.title}
                  </div>
                  <div className="text-sm text-[var(--muted)] mt-1">
                    {`${previous.date.year}-${String(previous.date.month).padStart(2, '0')}-${String(previous.date.day).padStart(2, '0')}`}
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <div />
          )}

          {next ? (
            <a
              href={`/blog${next.path}`}
              className="group block p-4 rounded-lg bg-[color:var(--background-accent,rgba(255,255,255,0.03))] border border-transparent hover:border-[var(--accent)] transition-shadow shadow-sm hover:shadow-md text-right">
              <div className="flex items-center gap-3 justify-end">
                <div className="min-w-0">
                  <div className="text-xs text-[var(--muted)]">Next</div>
                  <div className="font-semibold text-lg truncate group-hover:underline">
                    {next.title}
                  </div>
                  <div className="text-sm text-[var(--muted)] mt-1">
                    {`${next.date.year}-${String(next.date.month).padStart(2, '0')}-${String(next.date.day).padStart(2, '0')}`}
                  </div>
                </div>
                <svg
                  className="w-6 h-6 text-[var(--accent)]"
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
            </a>
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
}
