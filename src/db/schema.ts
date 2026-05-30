import { pgTable, uuid, varchar, timestamp, integer, pgEnum, date, numeric} from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";
// import { text } from 'stream/consumers';

export const memberRoleEnum = ['admin', 'member', 'board'] as const;
export type MemberRole = typeof memberRoleEnum[number];

export const memberStatusEnum = ['active', 'inactive', 'pending', 'rejected', 'suspended'] as const;
export type MemberStatus = typeof memberStatusEnum[number];

export const paymentStatusEnum = ['pending', 'approved', 'rejected'] as const;
export type PaymentStatus = typeof paymentStatusEnum[number];

export const members = pgTable('members', {
  id: uuid('id').primaryKey().defaultRandom(),
  memberNumber: integer("member_number").notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  birthDate: date('birth_date'),
  address: varchar('address', { length: 255 }),
  nif: varchar('nif', { length: 9 }),
  phone: varchar('phone', { length: 20 }),
  profession: varchar('profession', { length: 100 }),
  professionalLicenseNumber: varchar('professional_license_number', { length: 50 }),
  district: varchar('district', { length: 50 }),
  institution: varchar('institution', { length: 255 }),
  habilitacoes: varchar('academic_qualifications', { length: 255 }).array(),
  certificatesUrls: varchar('certificates_urls', { length: 500 }).array(),
  profilePhotoUrl: varchar('profile_photo_url', { length: 500 }),
  professionalCardUrl: varchar('professional_card_url', { length: 500 }),
  role: varchar('role', { length: 50 }).notNull().default('member').$type<MemberRole>(),
  status: varchar('status', { length: 20 }).notNull().default('pending').$type<MemberStatus>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
  receiptProofUrl: varchar('receipt_proof_url', { length: 500 }),
  paymentStatus: varchar('payment_status', { length: 150 }).$type<PaymentStatus>().default('pending') // pending | approved | rejected
});

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;


export const membershipTypeEnum = pgEnum('membership_type', [
  'yearly',
  'semester'
]);

export const memberships = pgTable('memberships', {
  id: uuid('id').defaultRandom().primaryKey(),

  memberId: uuid('member_id')
    .notNull()
    .references(() => members.id, { onDelete: 'cascade' }),

  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),

  type: membershipTypeEnum('type').notNull(),

  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull()
});

export const membershipsRelations = relations(memberships, ({ one }) => ({
  member: one(members, {
    fields: [memberships.memberId],
    references: [members.id]
  })
}));

export const membersRelations = relations(members, ({ many }) => ({
  memberships: many(memberships),
}));