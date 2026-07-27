import { pgTable, uuid, varchar, timestamp, integer, pgEnum, date, numeric, boolean, text} from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";
// import { text } from 'stream/consumers';

export const memberRoleEnum = ['admin', 'member', 'board'] as const;
export type MemberRole = typeof memberRoleEnum[number];

export const memberStatusEnum = ['active', 'inactive', 'pending', 'rejected', 'suspended', 'imported'] as const;
export type MemberStatus = typeof memberStatusEnum[number];

export const paymentStatusEnum = ['pending', 'approved', 'rejected'] as const;
export type PaymentStatus = typeof paymentStatusEnum[number];

export const members = pgTable('members', {
  id: uuid('id').primaryKey().defaultRandom(),
  memberNumber: integer("member_number").notNull().unique(),
  email: varchar('email', { length: 255 }).unique(),
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
  status: varchar('status', { length: 20 }).default('imported').$type<MemberStatus>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
  receiptProofUrl: varchar('receipt_proof_url', { length: 500 }),
  paymentStatus: varchar('payment_status', { length: 150 }).$type<PaymentStatus>().default('pending'), // pending | approved | rejected
  specialties: varchar("specialties", { length: 100 }).array(),
  legacyMember: boolean("legacy_member").default(false).notNull(),
  profileCompleted: boolean("profile_completed").default(false).notNull(),
  isPublicTherapist: boolean('is_public_therapist').default(false).notNull(),
  lastQuotaPaidYear: integer("last_quota_paid_year"),
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



export const trainings = pgTable('trainings', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  startDate: timestamp('start_date').notNull(),
  location: varchar('location', { length: 255 }),
  registrationUrl: varchar('registration_url', { length: 500 }).notNull(),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  duration: varchar('duration', { length: 100 }),
  instructor: varchar('instructor', { length: 255 }),
  modules: integer('modules'),
  highlights: text('highlights'),
  price: varchar('price', { length: 100 }),
  format: varchar('format', { length: 50 }),
  level: varchar('level', { length: 50 }),
  certification: boolean('certification').default(false),
});


export const news = pgTable('news', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  excerpt: varchar('excerpt', { length: 500 }),
  content: text('content').notNull(),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
  publishedAt: timestamp('published_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
