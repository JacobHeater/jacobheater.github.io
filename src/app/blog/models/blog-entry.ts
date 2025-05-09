export interface BlogEntry {
  date: {
    year: number;
    month: number;
    day: number;
  };
  title: string;
  path: string;
  description?: string;
  contentPath: string;
  tags: string[];
}
