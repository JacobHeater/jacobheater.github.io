import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { useContext, useState } from 'react';
import ThemeContext from '@/app/theme-context';
import ReactMonacoEditor from '@monaco-editor/react';
import Image from 'next/image';
import { DividerBar } from '@/app/about/resume/components/divider-bar';

export function MarkdownViewer({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={'hljs-light'}>
      <ReactMarkdown
        skipHtml={false}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ node, ...props }) => <div className="my-4" {...props} />,
          hr: ({ node, ...props }) => <DividerBar {...props} />,
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const [height, setHeight] = useState(0);
            const inline = node?.properties?.inline && match;

            return !inline && match ? (
              <ReactMonacoEditor
                className="my-2"
                width="100%"
                height={height}
                language={match[1]}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                defaultValue={String(children).replace(/\n$/, '')}
                onMount={(editor: any) => {
                  setHeight(editor.getScrollHeight() + 30);
                }}
                options={{
                  selectOnLineNumbers: true,
                  automaticLayout: true,
                  fontSize: 16,
                  minimap: {
                    enabled: false,
                  },
                  domReadOnly: true,
                  readOnly: true,
                  scrollBeyondLastLine: false,
                  scrollbar: {
                    vertical: 'auto',
                    handleMouseWheel: true,
                  },
                }}
              />
            ) : (
              <pre
                className={`p-1 overflow-auto text-wrap inline ${
                  theme === 'dark'
                    ? 'bg-[var(--gray-800)] text-[var(--gray-200)]'
                    : 'bg-[var(--gray-200)] text-[var(--gray-800)]'
                }`}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          table: ({ node, ...props }) => (
            <table
              className="table-auto border-collapse border border-[var(--gray-600)] w-full"
              {...props}
            />
          ),
          tr: ({ node, ...props }) => (
            <tr
              className={`${
                theme === 'dark'
                  ? 'even:bg-[var(--gray-800)]'
                  : 'even:bg-[var(--gray-100)]'
              }`}
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className={`border px-4 py-2 ${
                theme === 'dark'
                  ? 'bg-[var(--gray-700)] border-[var(--gray-600)]'
                  : 'bg-[var(--gray-300)] border-[var(--gray-500)]'
              }`}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className={`border px-4 py-2 ${
                theme === 'dark'
                  ? 'border-[var(--gray-600)]'
                  : 'border-[var(--gray-500)]'
              }`}
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 pl-4 my-4 ml-4 text-[var(--foreground)]"
              style={{
                borderColor: 'var(--accent)',
              }}
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className={`hover:underline ${
                theme === 'dark'
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--secondary)]'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-4 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-4 my-4" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1
              className="text-4xl font-bold my-4 text-[var(--primary)]"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-3xl font-semibold my-3 text-[var(--primary)]"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-2xl font-medium my-2 text-[var(--primary)]"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="text-xl font-medium my-2 text-[var(--primary)]"
              {...props}
            />
          ),
          h5: ({ node, ...props }) => (
            <h5
              className="text-lg font-medium my-1 text-[var(--primary)]"
              {...props}
            />
          ),
          h6: ({ node, ...props }) => (
            <h6
              className="text-base font-medium my-1 text-[var(--primary)]"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <Image
              src={props.src as string}
              alt={props.alt as string}
              width={500}
              height={500}
              className="w-[90vw] md:w-[50vw] mx-auto my-4"
              priority
              unoptimized
            />
          ),
        }}>
        {children as string}
      </ReactMarkdown>
    </div>
  );
}
