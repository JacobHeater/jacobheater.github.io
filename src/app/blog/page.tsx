'use client';

import { blogEntryErd } from './models/blog-map';
import { renderTree } from './components/blog-tree-renderer';
import { HtmlTitle } from '../components/html-title';

export default function Blog() {
  return (
    <div className="flex flex-col p-4 w-[90vw] md:w-[70vw] l:w-[70vw] mx-auto">
      <HtmlTitle title="My Blog" />
      <div className="text-4xl font-bold py-5">My Blog</div>
      <p className="my-8 text-lg">
        Welcome to my blog! Here you'll find a range of topics from technology
        to theology, to culinary adventures and coffee, and everything in
        between. Thank you for reading!
      </p>
      <div className="text-2xl font-bold">Blog Entries</div>
      <div className="mt-4">
        {blogEntryErd.getRootEntries().map((root) => renderTree(root, 0))}
      </div>
    </div>
  );
}
