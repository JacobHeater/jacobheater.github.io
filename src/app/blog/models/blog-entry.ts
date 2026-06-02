export interface BlogEntry {
  id: string;
  publicationDate: {
    year: number;
    month: number;
    day: number;
  };
  lastUpdatedDate?: {
    year: number;
    month: number;
    day: number;
  };
  title: string;
  path: string;
  description?: string;
  contentPath: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  ogImage?: string;
  twitterImage?: string;
}
