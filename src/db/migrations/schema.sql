-- Drizzle snapshot
-- Generated on: 2025-12-11 12:30:00 UTC

CREATE TABLE IF NOT EXISTS "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"profession" varchar(100),
	"district" varchar(50),
	"institution" varchar(255),
	"role" varchar(50) DEFAULT 'member' NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "members_email_unique" UNIQUE("email")
);

CREATE INDEX IF NOT EXISTS "members_status_idx" ON "members" ("status");