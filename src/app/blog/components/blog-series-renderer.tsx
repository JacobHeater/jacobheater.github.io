import Link from 'next/link';
import { Chip } from '@mui/material';
import { BlogEntry } from '../models/blog-entry';
import { BlogRendererCommon } from './blog-renderer-common';
import { blogEntryErd } from '../models/blog-map';
import { DividerBar } from '@/app/about/resume/components/divider-bar';

interface BlogRendererProps {
  blog: BlogEntry;
  blogChildren: BlogEntry[];
  contents: Record<string, string>;
}

export function BlogSeriesRenderer({
  blog,
  blogChildren,
  contents,
}: BlogRendererProps) {
  const tags = blogEntryErd.getDistinctTagsForSelfAndDescendants(blog);

  return (
    <>
      <div className="text-3xl my-10 text-center font-bold ">
        You are reading the{' '}
        <span className="text-[var(--accent)]">{blog.title}</span>
        {'  series'}
      </div>
      <BlogRendererCommon
        blog={blog}
        blogChildren={blogChildren}
        autoSetHtmlTitle={false}
        content={contents[blog.contentPath]}
      />
      {blogChildren.map((child, index) => (
        <div key={index}>
          <div className="prose flex flex-col break-words mt-10">
            <BlogRendererCommon
              dividerBar={true}
              backArrow={false}
              blog={child}
              autoSetHtmlTitle={false}
              content={contents[child.contentPath]}
            />
          </div>
          <p className="text-center text-lg bg-[var(--accent)] mt-4 italic font-bold w-[80vw] md:w-[25vw] py-2 mx-auto rounded">
            End of Entry {index + 1} of {blogChildren.length}
          </p>
        </div>
      ))}
      <div className="w-[90vw] md:w-[70vw] mx-auto mt-20">
        <DividerBar />
        <div className="flex flex-row mt-10">
          <div className="font-bold">Series Tags:</div>
          <div className="pl-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Link key={index} href={`/blog/tag/${tag}`} className="no-underline">
                  <Chip
                    component="a"
                    color="primary"
                    size="small"
                    label={tag}
                    className="mx-2"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
