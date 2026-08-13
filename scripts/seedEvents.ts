import 'dotenv/config'
import { config } from 'dotenv'
import { eventRepository } from '@/lib/repositories/eventRepository'
import { testEvents } from '@/data/realEvents'

config({ path: '.env.local' })

async function seedEvents() {
  try {
    console.log('🌱 Seeding test events...')

    for (const event of testEvents) {
      await eventRepository.createEvent(event)

      console.log(`✅ Created event: ${event.title}`)
    }

    console.log('')
    console.log('🎉 Finished seeding events.')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedEvents()