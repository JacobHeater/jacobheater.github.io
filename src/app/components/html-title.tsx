'use client';

import { useEffect } from 'react';

export function HtmlTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  });

  return null;
}
