import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Developer Tools - Jacob Heater',
  description:
    'Free developer tools including Markdown Viewer and Markdown Editor. Process and edit Markdown files locally in your browser with syntax highlighting and live preview.',
  keywords: [
    'developer tools',
    'markdown viewer',
    'markdown editor',
    'syntax highlighting',
    'live preview',
    'monaco editor',
    'LaTeX',
    'math equations',
    'Jacob Heater',
  ],
  openGraph: {
    title: 'Developer Tools - Jacob Heater',
    description:
      'Free developer tools including Markdown Viewer and Markdown Editor with syntax highlighting and live preview.',
    type: 'website',
    url: 'https://jacobheater.com/tools',
  },
  twitter: {
    card: 'summary',
    title: 'Developer Tools - Jacob Heater',
    description:
      'Free developer tools including Markdown Viewer and Markdown Editor with syntax highlighting and live preview.',
  },
  alternates: {
    canonical: 'https://jacobheater.com/tools',
  },
};

export default function ToolsPage() {
  return (
    <>
      <div className="text-center text-3xl font-bold my-10">Tools</div>
      <div className="my-4">
        <p className="text-2xl font-bold my-8 text-[var(--accent)]">
          <Link href="/tools/markdown-viewer">Markdown Viewer</Link>
        </p>
        <p>
          View and print Markdown files effortlessly with this tool. It supports
          LaTeX for rendering math equations, ensuring a seamless experience.
          All processing is done locally in your browser, keeping your data
          private and secure.
        </p>
      </div>
      <div className="my-4">
        <p className="text-2xl font-bold my-8 text-[var(--accent)]">
          <Link href="/tools/markdown-editor">Markdown Editor</Link>
        </p>
        <p>
          This tool provides a powerful Markdown editing experience using the
          Monaco Editor. It supports syntax highlighting, live preview, and
          advanced features for creating and editing Markdown files. All
          processing is done locally in your browser, ensuring privacy and
          security.
        </p>
      </div>
    </>
  );
}
