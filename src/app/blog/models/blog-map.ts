import { BlogEntry } from './blog-entry';
import {
  theologyEntry,
  confessionEntry,
  apologeticsEntry,
} from './entries/theology/entries';
import {
  rationalTheologyEntry,
  canHumansInventGodEntry,
  theGodOfRevelationEntry,
  participatingInGodsCreationEntry,
} from './entries/theology/apologetics/entries';

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

  public getAllDescendants(entry: BlogEntry): BlogEntry[] {
    if (!entry) {
      return [];
    }
    const children = this.getChildren(entry);
    if (!children) {
      return [];
    }
    const descendants = children.flatMap((child) => {
      return this.getAllDescendants(child);
    });
    return [...children, ...descendants];
  }

  public getParent(entry: BlogEntry): BlogEntry | null {
    if (!entry) {
      return null;
    }
    const relationship = this._entries.find((rel) => {
      return rel.children.some((child) => child.id === entry.id);
    });
    return relationship ? relationship.parent : null;
  }

  public getRootEntries(): BlogEntry[] {
    return this._entries
      .filter((rel) => !this.getParent(rel.parent))
      .map((rel) => rel.parent);
  }

  public getAllEntries(): BlogEntry[] {
    const set = new Set(
      this._entries.flatMap((rel) => [rel.parent, ...rel.children])
    );
    return Array.from(set);
  }

  public getEntryByPath(path: string): BlogEntry | null {
    const entry = this.getAllEntries().find((entry) => entry.path === path);
    return entry || null;
  }

  public getDistinctTags(): string[] {
    const tags = new Set(this.getAllEntries().flatMap((entry) => entry.tags));
    return Array.from(tags);
  }

  public getDistinctTagsByEntry(entry: BlogEntry): string[] {
    const tags = new Set(
      this.getAllEntries()
        .filter((e) => e.id === entry.id)
        .flatMap((entry) => entry.tags)
    );
    return Array.from(tags);
  }

  public getDistinctTagsForParentAndChildren(entry: BlogEntry): string[] {
    const parent = this.getParent(entry);
    const children = this.getAllDescendants(entry);
    const allEntries = [
      entry,
      ...(children || []),
      ...(parent ? [parent] : []),
    ];
    const tags = new Set(allEntries.flatMap((entry) => entry.tags));
    return Array.from(tags);
  }
}

export const blogEntryErd: BlogEntryErd = new BlogEntryErd();

blogEntryErd.defineRelationship(theologyEntry, [
  confessionEntry,
  apologeticsEntry,
]);

blogEntryErd.defineRelationship(apologeticsEntry, [
  rationalTheologyEntry,
  canHumansInventGodEntry,
  theGodOfRevelationEntry,
  participatingInGodsCreationEntry,
]);

export const blogFlatMap: Array<BlogEntry> = blogEntryErd.getAllEntries();
