import { notFound } from "next/navigation"
import { newsService } from "@/lib/services/newsService"


export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ newsId: string }>
}) {
  const { newsId } = await params

  const article = await newsService.getNewsById(newsId)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto py-20 max-w-4xl">

    {article.imageUrl && (
        <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full rounded-lg mb-8"
        />
    )}

      <h1 className="text-4xl font-bold mb-4">
        {article.title}
      </h1>

      <p className="text-muted-foreground mb-8">
        {new Date(article.publishedAt).toLocaleDateString("pt-PT")}
      </p>

      <div className="prose max-w-none">
        {article.content}
      </div>

    </div>
  )
}