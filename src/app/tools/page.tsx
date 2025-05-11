import Link from 'next/link';

export default function ToolsPage() {
  return (
    <>
      <div className="text-center text-3xl font-bold my-10">Tools</div>
      <div className="w-[90vw] md:w-[70vw] mx-auto">
        <p className="text-2xl font-bold my-8 text-[var(--accent)]">
          <Link href="/tools/markdown-viewer">Markdown Viewer</Link>
        </p>
        <p>
          This tool allows you to view and print Markdown files. The viewer
          supports LaTeX files for rendering math equations. No data is
          transmitted to the server, and all processing is done in the browser.
        </p>
      </div>
    </>
  );
}
