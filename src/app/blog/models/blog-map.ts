import { BlogEntry } from './blog-entry';
import {
  theologyEntry,
  confessionEntry,
  rationalTheologyEntry,
  canHumansInventGodEntry,
} from './entries/theology/entries';

interface BlogEntryRelationship {
  parent: BlogEntry;
  children: BlogEntry[];
}

class BlogEntryErd {
  private readonly _entries: BlogEntryRelationship[] = [];

  public defineRelationship(entry: BlogEntry, children: BlogEntry[]) {
    if (this._entries.some((rel) => rel.parent.id === entry.id)) {
      return;
    }
    this._entries.push({ parent: entry, children });
  }

  public getChildren(entry: BlogEntry): BlogEntry[] | null {
    if (!entry) {
      return null;
    }
    const relationship = this._entries.find((rel) => {
      return rel.parent.id === entry.id;
    });
    return relationship ? relationship.children : null;
  }

  public getRootEntries(): BlogEntry[] {
    return this._entries.map((rel) => rel.parent);
  }
}

export const blogFlatMap: Array<BlogEntry> = [
  theologyEntry,
  confessionEntry,
  rationalTheologyEntry,
  canHumansInventGodEntry,
];

export const blogEntryErd: BlogEntryErd = new BlogEntryErd();

blogEntryErd.defineRelationship(theologyEntry, [
  confessionEntry,
  rationalTheologyEntry,
  canHumansInventGodEntry,
]);
