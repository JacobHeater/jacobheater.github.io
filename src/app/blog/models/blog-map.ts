import { BlogEntry } from './blog-entry';
import {
  theologyEntry,
  confessionEntry,
  apologeticsEntry,
} from './entries/theology/entries';
import { theGodOfRevelationEntry } from './entries/theology/apologetics/entries/1-the-god-of-revelation';
import { howDoWeKnowWhatWeKnowEntry } from './entries/theology/apologetics/entries/2-language-thought-knowledge';
import { revelationAndReorganizationEntry } from './entries/theology/apologetics/entries/3-revelation-and-reorganization';
import { theLimitsOfHumanCreativityEntry } from './entries/theology/apologetics/entries/4-the-limits-of-human-creativity';
import { canHumansInventGodEntry } from './entries/theology/apologetics/entries/5-can-humans-invent-god';
import { theProblemWithNaturalismEntry } from './entries/theology/apologetics/entries/6-the-problem-with-naturalism';
import { theGodWhoSpeaksEntry } from './entries/theology/apologetics/entries/7-the-god-who-speaks';
import { theGodWhoWhispersEntry } from './entries/theology/apologetics/entries/8-the-god-who-whispers';
import { madeInHisImageEntry } from './entries/theology/apologetics/entries/9-made-in-his-image';
import { theLogosEntry } from './entries/theology/apologetics/entries/10-the-logos';
import { scienceAndTheologyAsPartnersEntry } from './entries/theology/apologetics/entries/11-science-and-theology-as-partners';
import { godChoseUsEntry } from './entries/theology/apologetics/entries/12-god-chose-us';

import {
  meditationsEntry,
  sufferingEntry,
  whyWouldINotSufferEntry,
} from './entries/meditations/entries';

interface BlogEntryRelationship {
  parent: BlogEntry;
  children: BlogEntry[];
}

class BlogEntryErd {
  private readonly _entries: BlogEntryRelationship[] = [];

  public defineRelationship(entry: BlogEntry, children: BlogEntry[]) {
    if (this._entries.some((rel) => rel.parent.path === entry.path)) {
      return;
    }
    this._entries.push({ parent: entry, children });
  }

  public getChildren(entry: BlogEntry): BlogEntry[] | null {
    if (!entry) {
      return null;
    }
    const relationship = this._entries.find((rel) => {
      return rel.parent.path === entry.path;
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
      return rel.children.some((child) => child.path === entry.path);
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
        .filter((e) => e.path === entry.path)
        .flatMap((entry) => entry.tags)
    );
    return Array.from(tags);
  }

  public getDistinctTagsForSelfAndDescendants(entry: BlogEntry): string[] {
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
  theGodOfRevelationEntry,
  howDoWeKnowWhatWeKnowEntry,
  revelationAndReorganizationEntry,
  theLimitsOfHumanCreativityEntry,
  canHumansInventGodEntry,
  theProblemWithNaturalismEntry,
  theGodWhoSpeaksEntry,
  theGodWhoWhispersEntry,
  madeInHisImageEntry,
  theLogosEntry,
  scienceAndTheologyAsPartnersEntry,
  godChoseUsEntry,
]);

blogEntryErd.defineRelationship(meditationsEntry, [sufferingEntry]);

blogEntryErd.defineRelationship(sufferingEntry, [whyWouldINotSufferEntry]);

export const blogFlatMap: Array<BlogEntry> = blogEntryErd.getAllEntries();
