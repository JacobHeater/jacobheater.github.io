'use client';

import { Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { renderTree } from './blog-tree-renderer';
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

  return (
    <>
      <div className="prose flex flex-col break-words">
        <BlogRendererCommon
          blog={blog}
          children={blogChildren || []}
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
            {blogChildren.map((child) => renderTree(child))}
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
    </>
  );
}
