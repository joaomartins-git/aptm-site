import { db } from '@/db';
import { news } from '@/db/schema';
import { eq, desc } from 'drizzle-orm'


export class NewsRepository {
    
    async getAllNews() {
      return db.select().from(news)
    }
    
    async getNewsById(id: string) {
      const result = await db
        .select()
        .from(news)
        .where(eq(news.id, id))
    
      return result[0] ?? null
    }

}


export const newsRepository = new NewsRepository();