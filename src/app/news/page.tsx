import Link from "next/link"
import { newsService } from "@/lib/services/newsService"

export default async function NewsPage() {
  const articles = await newsService.getLatestNews()

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-32 pb-20">
      <h1 className="text-4xl font-bold mb-8">
        Notícias
      </h1>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.id}`}
          >
            <div className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">
                {article.title}
              </h2>

              <p>
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}