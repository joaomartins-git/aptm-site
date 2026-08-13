import { eventRepository } from "@/lib/repositories/eventRepository";
import { events } from "@/db/schema";

export class EventService {
  async getAllEvents() {
    return eventRepository.getAllEvents();
  }

  async getUpcomingEvents() {
    return eventRepository.getUpcomingEvents();
  }

  async getEventById(id: string) {
    return eventRepository.getEventById(id);
  }

  async createEvent(data: typeof events.$inferInsert) {
    return eventRepository.createEvent(data);
  }


}

export const eventService = new EventService();