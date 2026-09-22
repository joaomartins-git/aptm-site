import "dotenv/config"
import { config } from "dotenv"

import { db } from "@/db"
import { events, trainings, news, newsImages } from "@/db/schema"
import {
  productionEvents,
  productionTrainings,
  productionNews,
} from "@/data/productionContent"

import { eq } from "drizzle-orm"

config({ path: ".env.local" })

function validateProductionData() {
  const json = JSON.stringify({
    productionEvents,
    productionTrainings,
    productionNews,
  })

  if (json.includes("TODO")) {
    throw new Error(
      "❌ Production data still contains TODO placeholders. Complete the data before seeding."
    )
  }
}

async function seedProductionContent() {
  try {
    console.log("🌱 Preparing production content...")

    validateProductionData()

    // --------------------------------------------------
    // EVENTS
    // --------------------------------------------------

    console.log("📅 Seeding events...")

    for (const event of productionEvents) {
      const existing = await db
        .select()
        .from(events)
        .where(eq(events.title, event.title))

      if (existing.length > 0) {
        console.log(`⏭️ Event already exists: ${event.title}`)
        continue
      }

      const result = await db
        .insert(events)
        .values(event)
        .returning()

      console.log(`✅ Created event: ${result[0].title}`)
    }

    // --------------------------------------------------
    // TRAININGS
    // --------------------------------------------------

    console.log("🎓 Seeding trainings...")

    for (const training of productionTrainings) {
      const existing = await db
        .select()
        .from(trainings)
        .where(eq(trainings.title, training.title))

      if (existing.length > 0) {
        console.log(`⏭️ Training already exists: ${training.title}`)
        continue
      }

      const result = await db
        .insert(trainings)
        .values(training)
        .returning()

      console.log(`✅ Created training: ${result[0].title}`)
    }

    // --------------------------------------------------
    // NEWS
    // --------------------------------------------------

    console.log("📰 Seeding news...")

    for (const article of productionNews) {
      const existing = await db
        .select()
        .from(news)
        .where(eq(news.title, article.title))

      if (existing.length > 0) {
        console.log(`⏭️ News article already exists: ${article.title}`)
        continue
      }

      const result = await db
        .insert(news)
        .values({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          imageUrl: article.imageUrl,
          publishedAt: article.publishedAt,
        })
        .returning()

      const createdArticle = result[0]

      console.log(`✅ Created news: ${createdArticle.title}`)

      // --------------------------------------------------
      // NEWS GALLERY
      // --------------------------------------------------

      if (article.images && article.images.length > 0) {
        console.log(
          `🖼️ Adding ${article.images.length} gallery images...`
        )

        await db.insert(newsImages).values(
          article.images.map((image) => ({
            newsId: createdArticle.id,
            imageUrl: image.imageUrl,
            caption: image.caption || null,
            altText: image.altText || null,
            sortOrder: image.sortOrder,
          }))
        )

        console.log(
          `✅ Added ${article.images.length} gallery images`
        )
      }
    }

    console.log("")
    console.log("🎉 Production content seeded successfully.")
  } catch (error) {
    console.error("")
    console.error("❌ Production content seed failed.")
    console.error(error)
    process.exit(1)
  }
}

seedProductionContent()