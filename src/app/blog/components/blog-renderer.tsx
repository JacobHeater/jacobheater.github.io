'use client';

import { Chip } from '@mui/material';
import { BlogEntry } from '../models/blog-entry';
import ReactMarkdown from 'react-markdown';
import { JSX } from 'react';
import { HtmlTitle } from '@/app/components/html-title';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogRendererProps {
  blog: BlogEntry;
  className?: string;
  subTree?: JSX.Element | undefined | null;
}

export function BlogRenderer({ blog, className, subTree }: BlogRendererProps) {
  const router = useRouter();

  return (
    <>
      <HtmlTitle title={`Blog | ${blog.title}`} />
      <div className={`w-[85vw] md:w-[70vw] l:w-[70vw] mx-auto ${className}`}>
        <div className="py-8 flex items-center">
          <Link
            href="#"
            onClick={() => router.back()}
            className="text-blue-500 hover:underline"
          >
            &larr; Back
          </Link>
        </div>
        <div className="text-4xl font-bold mb-8">{blog.title}</div>
        {blog.description && <p className="mb-8 italic">{blog.description}</p>}
        <div className="prose">
          <ReactMarkdown
            components={{
              p: ({ ...props }) => <p {...props} className="text-lg mb-4" />,
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
            }}
          >
            {blog.content}
          </ReactMarkdown>
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
