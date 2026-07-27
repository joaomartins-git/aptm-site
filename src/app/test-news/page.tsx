// src/app/test-news/page.tsx

import { newsService } from "@/lib/services/newsService"

export default async function TestNewsPage() {
  const articles = await newsService.getLatestNews();

  return (
    <pre>
      {JSON.stringify(articles, null, 2)}
    </pre>
  );
}