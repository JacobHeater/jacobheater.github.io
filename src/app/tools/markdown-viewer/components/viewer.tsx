import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import React from 'react';

export function MarkdownViewer({ children }: { children: React.ReactNode }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ node, ...props }) => {
          return <p className="py-2" {...props} />;
        },
        hr: ({ node, ...props }) => {
          return (
            <hr className="my-4 border-t-2 border-[var(--accent)]" {...props} />
          );
        },
      }}>
      {children as string}
    </ReactMarkdown>
  );
}
