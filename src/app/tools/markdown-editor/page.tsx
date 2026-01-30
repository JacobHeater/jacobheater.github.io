import { Metadata } from 'next';
import { useContext, useState } from 'react';
import ReactMonacoEditor from '@monaco-editor/react';
import { Preview, Close } from '@mui/icons-material';
import { Tooltip } from 'react-tooltip';
import ThemeContext from '@/app/theme-context';
import { MarkdownViewer } from '@/app/components/markdown/markdown-viewer';

export const metadata: Metadata = {
  title: 'Markdown Editor - Free Online Tool',
  description:
    'Free online Markdown editor with Monaco Editor. Features syntax highlighting, live preview, and advanced editing capabilities. Process Markdown locally in your browser.',
  keywords: [
    'markdown editor',
    'online tool',
    'monaco editor',
    'syntax highlighting',
    'live preview',
    'markdown processing',
    'free tool',
  ],
  openGraph: {
    title: 'Markdown Editor - Free Online Tool',
    description:
      'Free online Markdown editor with Monaco Editor, syntax highlighting, and live preview.',
    type: 'website',
    url: 'https://jacobheater.com/tools/markdown-editor',
  },
  twitter: {
    card: 'summary',
    title: 'Markdown Editor - Free Online Tool',
    description:
      'Free online Markdown editor with Monaco Editor, syntax highlighting, and live preview.',
  },
  alternates: {
    canonical: 'https://jacobheater.com/tools/markdown-editor',
  },
};

export default function MarkdownEditorPage() {
  const [code, setCode] = useState<string>('');
  const [preview, setPreview] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Tooltip
        id="preview-md"
        content={`${preview ? 'Edit' : 'Preview'} your markdown`}
        className="no-print invisible md:visible z-1000"
        place="bottom"
      />
      <div className="text-center mt-4 text-2xl md:text-3xl font-bold text-[var(--accent)]">
        Markdown {preview ? 'Preview' : 'Editor'}
        <span className="ml-4">
          {!preview && (
            <Preview
              data-tooltip-id="preview-md"
              onClick={() => setPreview(true)}
            />
          )}
          {preview && (
            <Close
              data-tooltip-id="preview-md"
              onClick={() => setPreview(false)}
              className="cursor-pointer"
            />
          )}
        </span>
      </div>
      {!preview && (
        <div className="mt-4 h-[80vh] border-1 border-[var(--primary)]">
          <ReactMonacoEditor
            width="100%"
            height="100%"
            language="markdown"
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            value={code}
            onChange={(value) => setCode(value as string)}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
              fontSize: 16,
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      )}
      {preview && (
        <div className="mt-4 h-[80vh] overflow-y-auto border-1 border-[var(--gray-600)] px-2">
          <MarkdownViewer>{code}</MarkdownViewer>
        </div>
      )}
    </>
  );
}
