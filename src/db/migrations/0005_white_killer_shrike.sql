CREATE TABLE "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"excerpt" varchar(500),
	"content" text NOT NULL,
	"image_url" varchar(500),
	"published_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL
);
