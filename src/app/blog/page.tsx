import { Metadata } from 'next';
import { blogEntryErd } from './models/blog-map';
import { RenderTree } from './components/blog-tree-renderer';
import { HtmlTitle } from '../components/html-title';

export const metadata: Metadata = {
  title: 'Blog - Jacob Heater',
  description:
    "Explore Jacob Heater's blog covering technology, software engineering, theology, apologetics, rational faith, and more. Insights on system design, leadership, and development practices.",
  keywords: [
    'blog',
    'technology',
    'software engineering',
    'theology',
    'apologetics',
    'rational faith',
    'system design',
    'leadership',
    'programming',
    'web development',
    'Jacob Heater',
  ],
  openGraph: {
    title: 'Blog - Jacob Heater',
    description:
      "Explore Jacob Heater's blog covering technology, software engineering, theology, apologetics, rational faith, and more.",
    type: 'website',
    url: 'https://jacobheater.com/blog',
  },
  twitter: {
    card: 'summary',
    title: 'Blog - Jacob Heater',
    description:
      "Explore Jacob Heater's blog covering technology, software engineering, theology, apologetics, rational faith, and more.",
  },
  alternates: {
    canonical: 'https://jacobheater.com/blog',
  },
};

export default function Blog() {
  return (
    <div className="flex flex-col">
      <HtmlTitle title="Blog - Jacob Heater" />
      <div className="text-4xl font-bold py-5">My Blog</div>
      <div className="my-8">
        <p className="text-lg">
          Welcome to my blog! Here you&apos;ll find a range of topics from
          technology to theology, to culinary adventures and coffee, and
          everything in between. Thank you for reading!
        </p>
        <p className="pt-4 italic">
          The thoughts and opinions expressed here are my own and do not
          necessarily reflect those of my employer or any affiliated
          organizations.
        </p>
      </div>
      <div className="text-2xl font-bold">Blog Entries</div>
      <div className="mt-4 md:w-[60vw]">
        {blogEntryErd.getRootEntries().map((root) => (
          <RenderTree key={root.id} entry={root} level={0} />
        ))}
      </div>
    </div>
  );
}
