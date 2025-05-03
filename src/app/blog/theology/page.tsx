import { blogMap } from '../models/blog-map';
import { renderScopedTree } from '../components/blog-tree-renderer';
import { BlogEntry } from '../models/blog-entry';
import { BlogRenderer } from '../components/blog-renderer';

export default function TheologyBlogHome() {
  return (
    <BlogRenderer
      blog={createBlogEntry()}
      subTree={renderScopedTree(blogMap, 'theology')}
    />
  );
}

function createBlogEntry(): BlogEntry {
  return {
    date: new Date('2025-05-02'),
    title: 'Theology',
    content: theologyBlogContent(),
    tags: ['theology'],
  };
}

function theologyBlogContent(): string {
  return `
As a Christian, I am deeply and profoundly moved by the revelations
that God has shown us in the Bible. Christianity is unique because it
tells us that God has revealed Himself to us directly, personally, and
intimately. This is unique because in the plethora of world religions
because no other religion shows where their gods have revealed
themselves to us directly.

In the case of other world religions, the gods at best reveal themselves
by proxy, and at worst through some esoteric means of understanding
where only the privileged few know of god, but perhaps cannot even say
to know god.

Christianity and the God of the Bible tell us of God's revelation in
ways show us that God loves us, and wants to be known by us. Come
explore theology with me as we learn about the one true God of the
Bible.
  `.trim();
}
