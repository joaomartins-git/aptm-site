ALTER TABLE "trainings" ADD COLUMN "duration" varchar(100);--> statement-breakpoint
ALTER TABLE "trainings" ADD COLUMN "instructor" varchar(255);--> statement-breakpoint
ALTER TABLE "trainings" ADD COLUMN "modules" integer;--> statement-breakpoint
ALTER TABLE "trainings" ADD COLUMN "highlights" text;--> statement-breakpoint
ALTER TABLE "trainings" ADD COLUMN "price" varchar(100);--> statement-breakpoint
ALTER TABLE "trainings" ADD COLUMN "format" varchar(50);--> statement-breakpoint
ALTER TABLE "trainings" ADD COLUMN "level" varchar(50);--> statement-breakpoint
ALTER TABLE "trainings" ADD COLUMN "certification" boolean DEFAULT false;