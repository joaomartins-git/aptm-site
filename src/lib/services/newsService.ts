import { newsRepository } from "@/lib/repositories/newsRepository"
import { news } from '@/db/schema';


export class NewsService{

  async getNewsById(id: string) {
    return newsRepository.getNewsById(id)
  }
  
  async getLatestNews() {
    return newsRepository.getAllNews()
  }

}

export const newsService = new NewsService();