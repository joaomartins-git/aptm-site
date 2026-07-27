ALTER TABLE "members" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "status" SET DEFAULT 'imported';--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "profile_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "is_public_therapist" boolean DEFAULT false NOT NULL;