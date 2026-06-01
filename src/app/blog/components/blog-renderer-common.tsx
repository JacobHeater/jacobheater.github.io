import { FormattedDate } from '@/app/components/formatted-date';
import { MarkdownViewer } from '@/app/components/markdown/markdown-viewer';
import { BlogEntry } from '../models/blog-entry';
import { HtmlTitle } from '@/app/components/html-title';
import Link from 'next/link';
import { DividerBar } from '@/app/about/resume/components/divider-bar';
import { ChevronLeft } from '@mui/icons-material';

interface BlogRendererCommonProps {
  blog: BlogEntry;
  blogChildren?: BlogEntry[];
  className?: string;
  backArrow?: boolean;
  dividerBar?: boolean;
  seriesButton?: boolean;
  autoSetHtmlTitle?: boolean;
  content: string;
}

export function BlogRendererCommon({
  blog,
  backArrow = true,
  blogChildren,
  className,
  dividerBar = false,
  seriesButton = false,
  autoSetHtmlTitle = true,
  content,
}: BlogRendererCommonProps) {
  const blogPath = blog.path.startsWith('/') ? blog.path.slice(1) : blog.path;
  const isSeries = blogChildren && blogChildren.length > 0;
  const seriesButtonVisible = seriesButton && isSeries;

  return (
    <>
      {autoSetHtmlTitle && <HtmlTitle title={`Blog | ${blog.title}`} />}
      <div className={`${className}`}>
        {dividerBar && (
          <DividerBar
            barStyle={{
              margin: '0 0 3rem 0',
            }}
          />
        )}
        {backArrow && (
          <div className="py-8 flex items-center">
            <Link href="/blog" className="hover:underline flex items-center gap-1">
              <ChevronLeft className="w-5 h-5" />
              Back
            </Link>
          </div>
        )}
        <div className="text-4xl font-bold mb-4 flex flex-row items-center">
          {blog.title}
          {isSeries && (
            <>
              <span className="ml-6 px-2 py-1 text-sm bg-[var(--primary)] text-white rounded cursor-default select-none">
                Series
              </span>
              {seriesButtonVisible && (
                <>
                  <Link prefetch={true} href={`/blog/series/${blogPath}`} className="hidden md:inline-flex items-center ml-4 px-2 py-1 text-sm border border-[var(--primary)] font-medium rounded shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200">
                    Read the Series
                  </Link>
                </>
              )}
            </>
          )}
        </div>
        {seriesButtonVisible && (
          <div className="block md:hidden w-full my-8">
            <Link
              prefetch={true}
              href={`/blog/series/${blogPath}`}
              className="w-full px-2 py-1 text-sm border border-[var(--primary)] font-medium rounded shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200">
              Read the Series
            </Link>
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
        <div className="prose flex flex-col break-words">
          <MarkdownViewer>{content}</MarkdownViewer>
        </div>
      </div>
    </>
  );
}
