import { trainingRepository } from "@/lib/repositories/trainingRepository"
import { trainings } from '@/db/schema';


export class TrainingService{

  async getTrainingsById(id: string) {
    return trainingRepository.getTrainingsById(id)
  }
  
  async getAllTrainings() {
    return trainingRepository.getAllTrainings()
  }

}

export const trainingService = new TrainingService();