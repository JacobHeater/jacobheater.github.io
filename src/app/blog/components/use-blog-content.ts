import { useState, useEffect } from "react";

export function useBlogContent(contentPath: string): [string | null, boolean] {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const response = await fetch(contentPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch content from ${contentPath}`);
        }
        let text = await response.text();
        if (text) {
          const blogPath = contentPath.replace('content.md', '');
          text = text.replace(/__blogpath__/g, blogPath);
        }
        setContent(text);
      } catch (error) {
        console.error(error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [contentPath]);

  return [content, loading];
}
