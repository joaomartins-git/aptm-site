import { db } from '@/db';
import { news, newsImages } from '@/db/schema';
import { eq, asc } from 'drizzle-orm'


export class NewsRepository {
    
    async getAllNews() {
      return db.select().from(news)
    }
    
    async getNewsById(id: string) {
      const result = await db
        .select()
        .from(news)
        .where(eq(news.id, id))
    
          const article = result[0];

      if (!article) {
        return null;
      }

      const images = await db
        .select()
        .from(newsImages)
        .where(eq(newsImages.newsId, id))
        .orderBy(asc(newsImages.sortOrder));

      return {
        ...article,
        images,
      };
    }

}


export const newsRepository = new NewsRepository();