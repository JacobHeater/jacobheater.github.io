export interface BlogEntry {
  date: Date;
  title: string;
  path: string;
  description?: string;
  contentPath: string;
  tags: string[];
}
