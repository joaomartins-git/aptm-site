import { db } from '@/db';
import { trainings } from '@/db/schema';
import { eq, desc, asc } from 'drizzle-orm'


export class TrainingRepository {
    
    async getAllTrainings() {
      return db.select().from(trainings)
    }
    
    async getTrainingsById(id: string) {
      const result = await db
        .select()
        .from(trainings)
        .where(eq(trainings.id, id))
    
      return result[0] ?? null
    }
    
    async getUpcomingTrainings() {
      return db
      .select()
      .from(trainings)
      .where(eq(trainings.isPublished, true))
      .orderBy(asc(trainings.startDate))
}

}


export const trainingRepository = new TrainingRepository();