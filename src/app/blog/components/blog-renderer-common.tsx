'use client';

import { FormattedDate } from '@/app/components/formatted-date';
import { MarkdownViewer } from '@/app/components/markdown/markdown-viewer';
import { BlogEntry } from '../models/blog-entry';
import { HtmlTitle } from '@/app/components/html-title';
import Link from 'next/link';
import { DividerBar } from '@/app/about/resume/components/divider-bar';
import { useBlogContent } from './use-blog-content';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

interface BlogRendererCommonProps {
  blog: BlogEntry;
  children?: BlogEntry[];
  className?: string;
  backArrow?: boolean;
  dividerBar?: boolean;
  seriesButton?: boolean;
  autoSetHtmlTitle?: boolean;
}

export function BlogRendererCommon({
  blog,
  backArrow = true,
  children,
  className,
  dividerBar = false,
  seriesButton = false,
  autoSetHtmlTitle = true,
}: BlogRendererCommonProps) {
  const [content, loading] = useBlogContent(blog.contentPath);
  const router = useRouter();

  return (
    <>
      {autoSetHtmlTitle && <HtmlTitle title={`Blog | ${blog.title}`} />}
      <div className={`w-[90vw] md:w-[70vw] l:w-[70vw] mx-auto ${className}`}>
        {dividerBar && (
          <DividerBar
            barStyle={{
              margin: '0 0 3rem 0',
            }}
          />
        )}
        {backArrow && (
          <div className="py-8 flex items-center">
            <Link
              href="#"
              onClick={() => router.back()}
              className="hover:underline">
              &larr; Back
            </Link>
          </div>
        )}
        <div className="text-4xl font-bold mb-4 flex flex-row items-center">
          {blog.title}
          {children && children.length > 0 && (
            <>
              <span className="ml-6 px-2 py-1 text-sm bg-[var(--primary)] text-white rounded cursor-default select-none">
                Series
              </span>
              {seriesButton && (
                <>
                  <button
                    onClick={() => router.push(`/blog/${blog.path}/series`)}
                    className="hidden md:inline-flex items-center ml-4 px-2 py-1 text-sm border border-[var(--primary)] font-medium rounded shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200">
                    Read the Series
                  </button>
                </>
              )}
            </>
          )}
        </div>
        {seriesButton && (
          <div className="block md:hidden w-full my-8">
            <button
              onClick={() => router.push(`/blog/${blog.path}/series`)}
              className="w-full px-2 py-1 text-sm border border-[var(--primary)] font-medium rounded shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200">
              Read the Series
            </button>
          </div>
        )}
        <div className="mb-4">
          <span className="font-bold">Published on:&nbsp;</span>
          <span className="text-[var(--accent)]">
            <FormattedDate
              year={blog.date.year}
              month={blog.date.month}
              day={blog.date.day}
            />
          </span>
        </div>
        {blog.description && <p className="mb-8 italic">{blog.description}</p>}
        {loading ? (
          <div className="flex justify-center min-h-[50vh] items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="prose flex flex-col break-words">
            <MarkdownViewer>{content}</MarkdownViewer>
          </div>
        )}
      </div>
    </>
  );
}
