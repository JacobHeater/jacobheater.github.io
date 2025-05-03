export interface BlogEntry {
  date: Date;
  title: string;
  description?: string;
  content: string;
  tags: string[];
}
