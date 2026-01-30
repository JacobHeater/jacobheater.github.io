import { Metadata } from 'next';
import { Button } from '@/app/components/button';
import { useRef, useState } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import { MarkdownViewer } from '@/app/components/markdown/markdown-viewer';

export const metadata: Metadata = {
  title: 'Markdown Viewer - Free Online Tool',
  description:
    'Free online Markdown viewer with LaTeX math equation support. View and print Markdown files locally in your browser. Supports GitHub Flavored Markdown with syntax highlighting.',
  keywords: [
    'markdown viewer',
    'online tool',
    'LaTeX',
    'math equations',
    'GitHub Flavored Markdown',
    'syntax highlighting',
    'print markdown',
    'free tool',
  ],
  openGraph: {
    title: 'Markdown Viewer - Free Online Tool',
    description:
      'Free online Markdown viewer with LaTeX math equation support. View and print Markdown files locally in your browser.',
    type: 'website',
    url: 'https://jacobheater.com/tools/markdown-viewer',
  },
  twitter: {
    card: 'summary',
    title: 'Markdown Viewer - Free Online Tool',
    description:
      'Free online Markdown viewer with LaTeX math equation support.',
  },
  alternates: {
    canonical: 'https://jacobheater.com/tools/markdown-viewer',
  },
};

export default function MarkdownViewerPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  return (
    <div>
      <div className="text-center py-10 no-print">
        <Button onClick={() => fileInputRef?.current?.click()}>
          Pick a Markdown File
        </Button>
        {title && (
          <p className="mt-8">
            Viewing file: <span className="text-[var(--accent)]">{title}</span>
          </p>
        )}
        <div className="invisible h-0">
          <input
            id="md-file"
            ref={fileInputRef}
            type="file"
            accept=".md"
            inert
            onChange={async () => {
              if (fileInputRef.current && fileInputRef.current.files) {
                const [mdFile] = fileInputRef.current.files;
                if (mdFile) {
                  document.title = mdFile.name;
                  setTitle(mdFile.name);
                  setMarkdown(await mdFile.text());
                }
              }
            }}
          />
        </div>
      </div>
      <div>{markdown && <MarkdownViewer>{markdown}</MarkdownViewer>}</div>
      {markdown && (
        <div className="text-center py-10 no-print">
          <Button
            onClick={() => {
              window.print();
            }}>
            Print Markdown&nbsp;
            <PrintIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
