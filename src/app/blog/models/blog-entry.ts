export interface BlogEntry {
  id: string;
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
