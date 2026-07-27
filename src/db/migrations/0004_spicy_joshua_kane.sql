CREATE TABLE "trainings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image_url" varchar(500),
	"start_date" timestamp NOT NULL,
	"location" varchar(255),
	"registration_url" varchar(500),
	"is_published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
