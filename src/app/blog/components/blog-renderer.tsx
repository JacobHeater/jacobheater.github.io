'use client';

import { Chip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { HtmlTitle } from '@/app/components/html-title';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/joy/CircularProgress';
import Image from 'next/image';
import { renderScopedTree } from './blog-tree-renderer';
import { blogMap, BlogMapEntry } from '../models/blog-map';
import { FormattedDate } from '@/app/components/formatted-date';

interface BlogRendererProps {
  blog: BlogMapEntry;
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
  const entry = blog.entry;
  const [content, loading] = useBlogContent(entry.contentPath);

  return (
    <>
      <HtmlTitle title={`Blog | ${entry.title}`} />
      <div className={`w-[90vw] md:w-[70vw] l:w-[70vw] mx-auto ${className}`}>
        <div className="py-8 flex items-center">
          <Link
            href="#"
            onClick={() => router.back()}
            className="hover:underline">
            &larr; Back
          </Link>
        </div>
        <div className="text-4xl font-bold mb-4">{entry.title}</div>
        <div className="mb-4">
          <span className="font-bold">Published on:&nbsp;</span>
          <span className="text-[var(--accent)]">
            <FormattedDate
              year={entry.date.year}
              month={entry.date.month}
              day={entry.date.day}
            />
          </span>
        </div>
        {entry.description && (
          <p className="mb-8 italic">{entry.description}</p>
        )}
        <div className="prose flex flex-col break-words">
          {loading ? (
            <div className="flex justify-center min-h-[50vh] items-center">
              <CircularProgress />
            </div>
          ) : (
            <ReactMarkdown
              skipHtml={false}
              components={{
                p: ({ ...props }) => <p {...props} className="my-4" />,
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
                    className="text-2xl font-bold my-2"
                    style={{ color: 'var(--primary)' }}
                  />
                ),
                ul: ({ ...props }) => (
                  <ul {...props} className="list-disc pl-4 my-4" />
                ),
                ol: ({ ...props }) => (
                  <ol {...props} className="list-decimal pl-4 my-4" />
                ),
                li: ({ ...props }) => <li {...props} className="my-4" />,
                img: ({ ...props }) => (
                  <Image
                    loading="lazy"
                    src={(props.src as string) || ''}
                    alt={props.alt || ''}
                    width={500}
                    height={500}
                    className="mx-auto w-auto md:w-[30vw]"
                  />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-4 pl-4 my-4 ml-4"
                    style={{
                      borderImage:
                        'linear-gradient(to bottom, var(--primary), var(--secondary)) 1',
                      borderColor: 'transparent',
                    }}
                  />
                ),
                a: ({ ...props }) => (
                  <a
                    {...props}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}>
              {content}
            </ReactMarkdown>
          )}
        </div>
        <div className="my-10 flex items-center">
          <div className="font-bold">Tags:</div>
          <div className="pl-4">
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, index) => (
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
        {blog.subentries && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-8">Blog Entries</h2>
            {renderScopedTree(blogMap, blog)}
          </div>
        )}
      </div>
    </>
  );
}
