'use client';

import { blogEntryErd } from './models/blog-map';
import { renderTree } from './components/blog-tree-renderer';
import { HtmlTitle } from '../components/html-title';

export default function Blog() {
  return (
    <div className="flex flex-col">
      <HtmlTitle title="My Blog" />
      <div className="text-4xl font-bold py-5">My Blog</div>
      <div className="my-8">
        <p className="text-lg">
          Welcome to my blog! Here you'll find a range of topics from technology
          to theology, to culinary adventures and coffee, and everything in
          between. Thank you for reading!
        </p>
        <p className="pt-4 italic">
          The thoughts and opinions expressed here are my own and do not
          necessarily reflect those of my employer or any affiliated
          organizations.
        </p>
      </div>
      <div className="text-2xl font-bold">Blog Entries</div>
      <div className="mt-4 md:w-[60vw]">
        {blogEntryErd.getRootEntries().map((root) => renderTree(root, 0))}
      </div>
    </div>
  );
}
