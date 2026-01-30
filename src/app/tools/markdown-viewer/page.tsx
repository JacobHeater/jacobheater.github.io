import { Metadata } from 'next';
import MarkdownViewerClient from './client';

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
  return <MarkdownViewerClient />;
}
