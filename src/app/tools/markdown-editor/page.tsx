'use client';

import { useContext, useState } from 'react';
import ReactMonacoEditor from '@monaco-editor/react';
import { Preview, Close } from '@mui/icons-material';
import { Tooltip } from 'react-tooltip';
import { MarkdownViewer } from '../markdown-viewer/components/viewer';
import ThemeContext from '@/app/theme-context';

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
        Markdown {preview ? "Preview" : "Editor"}
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
        <div className="w-[90vw] md:w-[80vw] mt-4 mx-auto h-[80vh] border-1 border-[var(--primary)]">
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
        <div className="w-[90vw] md:w-[80vw] mt-4 mx-auto h-[80vh] overflow-y-auto border-1 border-[var(--gray-600)] px-2">
          <MarkdownViewer>{code}</MarkdownViewer>
        </div>
      )}
    </>
  );
}
