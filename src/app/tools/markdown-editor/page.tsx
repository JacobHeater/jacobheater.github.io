import { Metadata } from 'next';
import MarkdownEditorClient from './client';

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
  return <MarkdownEditorClient />;
}
