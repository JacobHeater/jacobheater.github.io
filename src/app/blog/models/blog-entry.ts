export interface BlogEntry {
  date: Date;
  title: string;
  description?: string;
  contentPath: string;
  tags: string[];
}
