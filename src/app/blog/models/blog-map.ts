import { BlogEntry } from './blog-entry';
import {
  theologyEntry,
  confessionEntry,
  rationalTheologyEntry,
  canHumansInventGodEntry,
} from './entries/theology/entries';

export interface BlogMapEntry {
  entry: BlogEntry;
  subentries?: BlogMapEntry[];
}

export const blogFlatMap: Array<BlogMapEntry> = [
  { entry: theologyEntry() },
  { entry: confessionEntry() },
  { entry: rationalTheologyEntry() },
  { entry: canHumansInventGodEntry() },
];

export const blogMap: Array<BlogMapEntry> = [
  {
    entry: theologyEntry(),
    subentries: [
      {
        entry: confessionEntry(),
      },
      {
        entry: rationalTheologyEntry(),
      },
      {
        entry: canHumansInventGodEntry(),
      },
    ],
  },
];
