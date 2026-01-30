'use client';

import { useRef, useState } from 'react';
import { Button } from '@/app/components/button';
import PrintIcon from '@mui/icons-material/Print';
import { MarkdownViewer } from '@/app/components/markdown/markdown-viewer';

export default function MarkdownViewerClient() {
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
