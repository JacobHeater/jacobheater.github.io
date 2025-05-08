import { BlogMapEntry } from '../../models/blog-map';

export function flattenBlogMap(
  blogMap: Array<BlogMapEntry>
): Array<BlogMapEntry> {
  const flatEntries: Array<BlogMapEntry> = [];
  for (const entry of blogMap) {
    flatEntries.push(entry);
    if (entry.subentries) {
      flatEntries.push(...flattenBlogMap(entry.subentries));
    }
  }
  return flatEntries;
}
