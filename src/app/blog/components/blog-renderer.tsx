'use client';

import { Chip } from '@mui/material';
import { BlogEntry } from '../models/blog-entry';
import ReactMarkdown from 'react-markdown';
import { JSX, useEffect, useState } from 'react';
import { HtmlTitle } from '@/app/components/html-title';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/joy/CircularProgress';
import Image from 'next/image';

interface BlogRendererProps {
  blog: BlogEntry;
  className?: string;
  subTree?: JSX.Element | undefined | null;
}

function useBlogContent(contentPath: string): string | null {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(contentPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch content from ${contentPath}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error(error);
        setContent(null);
      }
    }

    fetchContent();
  }, [contentPath]);

  return content;
}

export function BlogRenderer({ blog, className, subTree }: BlogRendererProps) {
  const router = useRouter();
  const content = useBlogContent(blog.contentPath);

  return (
    <>
      <HtmlTitle title={`Blog | ${blog.title}`} />
      <div className={`w-[90vw] md:w-[70vw] l:w-[70vw] mx-auto ${className}`}>
        <div className="py-8 flex items-center">
          <Link
            href="#"
            onClick={() => router.back()}
            className="text-blue-500 hover:underline"
          >
            &larr; Back
          </Link>
        </div>
        <div className="text-4xl font-bold mb-4">{blog.title}</div>
        <div className="mb-4">
          <span className="font-bold">Published on:&nbsp;</span>
          <span className="text-[var(--accent)]">
            {blog.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </span>
        </div>
        {blog.description && <p className="mb-8 italic">{blog.description}</p>}
        <div className="prose flex flex-col break-words">
          {content === null ? (
            <div className="flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <ReactMarkdown
              skipHtml={false}
              components={{
                p: ({ ...props }) => <p {...props} className="text-lg my-4" />,
                hr: ({ ...props }) => (
                  <div
                    {...props}
                    className="my-3 h-1"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, var(--primary), var(--secondary))',
                    }}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    {...props}
                    className="text-xl font-bold mb-4"
                    style={{ color: 'var(--primary)' }}
                  />
                ),
                ul: ({ ...props }) => (
                  <ul
                    {...props}
                    className="list-none list-inside pl-4 my-4"
                    style={{ color: 'var(--primary)' }}
                  />
                ),
                li: ({ ...props }) => (
                  <li
                    {...props}
                    className="text-lg my-4"
                    style={{ color: 'var(--primary)' }}
                  />
                ),
                img: ({ ...props }) => (
                  <Image
                    loading="lazy"
                    src={props.src as string || ''}
                    alt={props.alt || ''}
                    width={500}
                    height={500}
                    className="mx-auto w-auto md:w-[30vw]"
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
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
        {subTree && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-8">Blog Entries</h2>
            {subTree}
          </div>
        )}
      </div>
    </>
  );
}
