import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const memberRoleEnum = ['admin', 'member', 'board'] as const;
export type MemberRole = typeof memberRoleEnum[number];

export const memberStatusEnum = ['active', 'inactive', 'pending'] as const;
export type MemberStatus = typeof memberStatusEnum[number];

export const members = pgTable('members', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  profession: varchar('profession', { length: 100 }),
  district: varchar('district', { length: 50 }),
  institution: varchar('institution', { length: 255 }),
  role: varchar('role', { length: 50 }).notNull().default('member').$type<MemberRole>(),
  status: varchar('status', { length: 20 }).notNull().default('active').$type<MemberStatus>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;