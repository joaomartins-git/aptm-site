ALTER TABLE "members" ADD COLUMN "member_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_member_number_unique" UNIQUE("member_number");