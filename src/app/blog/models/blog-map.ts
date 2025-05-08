import { confessionEntry } from "../theology/believers-confession/page";
import { theologyEntry } from "../theology/page";
import { rationalTheologyEntry } from "../theology/rational-theology/page";
import { BlogEntry } from "./blog-entry";

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
        blogEntry: confessionEntry()
      },
      {
        url: '/rational-theology',
        blogEntry: rationalTheologyEntry()
      }
    ],
  },
];
