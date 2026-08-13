import { db } from "@/db";
import { events } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export class EventRepository {
  async getAllEvents() {
    return db
      .select()
      .from(events)
      .orderBy(asc(events.startDate));
  }

  async getUpcomingEvents() {
    return db
      .select()
      .from(events)
      .where(eq(events.isPublished, true))
      .orderBy(asc(events.startDate));
  }

  async getEventById(id: string) {
    const result = await db
      .select()
      .from(events)
      .where(eq(events.id, id));

    return result[0] ?? null;
  }

  async createEvent(data: typeof events.$inferInsert) {
    const result = await db
      .insert(events)
      .values(data)
      .returning();

    return result[0];
  }

}

export const eventRepository = new EventRepository();