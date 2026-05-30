ALTER TABLE "members" ALTER COLUMN "password_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "receipt_proof_url" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "birth_date" date;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "address" varchar(255);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "nif" varchar(9);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "professional_license_number" varchar(50);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "academic_qualifications" varchar(255)[];--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "certificates_urls" varchar(500)[];--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "profile_photo_url" varchar(500);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "professional_card_url" varchar(500);