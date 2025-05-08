import { BlogEntry } from './blog-entry';
import {
  theologyEntry,
  confessionEntry,
  rationalTheologyEntry,
} from './entries/theology/entries';

export interface BlogMapEntry {
  url: string;
  blogEntry: BlogEntry;
  subentries?: BlogMapEntry[];
}

export const blogMap: Array<BlogMapEntry> = [
  {
    url: '/theology',
    blogEntry: theologyEntry(),
    subentries: [
      {
        url: '/believers-confession',
        blogEntry: confessionEntry(),
      },
      {
        url: '/rational-theology',
        blogEntry: rationalTheologyEntry(),
      },
    ],
  },
];
