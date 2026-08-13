CREATE TYPE "public"."event_type" AS ENUM('conference', 'seminar', 'workshop', 'webinar', 'course');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image_url" varchar(500),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"location" varchar(255),
	"registration_url" varchar(500),
	"type" "event_type" NOT NULL,
	"speaker" varchar(255),
	"duration" varchar(100),
	"price" varchar(100),
	"level" varchar(100),
	"is_published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
