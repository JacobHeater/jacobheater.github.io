'use client';

import { Chip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { HtmlTitle } from '@/app/components/html-title';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/joy/CircularProgress';
import Image from 'next/image';
import { renderTree } from './blog-tree-renderer';
import { FormattedDate } from '@/app/components/formatted-date';
import { BlogEntry } from '../models/blog-entry';
import { blogEntryErd } from '../models/blog-map';
import { DividerBar } from '@/app/about/resume/components/divider-bar';
import { BlogLink } from './blog-link';
import { MarkdownViewer } from '@/app/components/markdown/markdown-viewer';

interface BlogRendererProps {
  blog: BlogEntry;
  className?: string;
}

function useBlogContent(contentPath: string): [string | null, boolean] {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const response = await fetch(contentPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch content from ${contentPath}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error(error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [contentPath]);

  return [content, loading];
}

export function BlogRenderer({ blog, className }: BlogRendererProps) {
  const router = useRouter();
  let [content, loading] = useBlogContent(blog.contentPath);
  const blogChildren = blogEntryErd.getChildren(blog);
  const blogParent = blogEntryErd.getParent(blog);

  if (content?.includes('__blogpath__')) {
    content = content.replace(
      '__blogpath__',
      blog.contentPath.replace('content.md', '')
    );
  }

  return (
    <>
      <HtmlTitle title={`Blog | ${blog.title}`} />
      <div className={`w-[90vw] md:w-[70vw] l:w-[70vw] mx-auto ${className}`}>
        <div className="py-8 flex items-center">
          <Link
            href="#"
            onClick={() => router.back()}
            className="hover:underline">
            &larr; Back
          </Link>
        </div>
        <div className="text-4xl font-bold mb-4">{blog.title}</div>
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
          {loading ? (
            <div className="flex justify-center min-h-[50vh] items-center">
              <CircularProgress />
            </div>
          ) : (
            <MarkdownViewer>{content}</MarkdownViewer>
          )}
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
                    router.push(`/blog/search/${tag}`);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {blogChildren && (
          <>
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
          </>
        )}
        {blogParent && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
