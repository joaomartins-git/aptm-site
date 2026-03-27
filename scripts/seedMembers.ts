import 'dotenv/config'
import { config } from 'dotenv'
import { db } from '../src/db'
import { members, memberships } from '../src/db/schema'
import { memberService } from '../src/lib/services/memberService'
import { eq } from 'drizzle-orm'
import { Role } from '@/types/roles'

config({ path: '.env.local' })

async function seed() {
  try {
    console.log('🌱 Starting database seeding...')

    const adminEmail = process.env.AUTH_USER_EMAIL
    const adminPassword = process.env.AUTH_USER_PASSWORD

    if (!adminEmail || !adminPassword) {
      console.error('❌ Missing AUTH_USER_EMAIL or AUTH_USER_PASSWORD')
      process.exit(1)
    }

    // =========================
    // 1️⃣ ADMIN
    // =========================
    let admin = await memberService.getMemberByEmail(adminEmail)

    if (!admin) {
      await memberService.createMemberWithPassword({
        memberNumber: 1,
        email: adminEmail,
        password: adminPassword,
        name: 'Administrador',
        profession: 'Administrator',
        district: 'Lisboa',
        institution: 'APT M',
        role: 'admin' as Role,
        status: 'active'
      })

      console.log('✅ Admin created')
      admin = await memberService.getMemberByEmail(adminEmail)
    } else {
      console.log('ℹ️ Admin already exists')
    }

    if (!admin) throw new Error('Failed to get admin')

    // Ensure admin membership
    const adminMembership = await db.query.memberships.findFirst({
      where: (m, { eq }) => eq(m.memberId, admin!.id),
    })

    if (!adminMembership) {
      const now = new Date()
      const oneYearLater = new Date()
      oneYearLater.setFullYear(now.getFullYear() + 1)

      await db.insert(memberships).values({
        memberId: admin.id,
        type: 'yearly',
        startDate: now.toISOString().split('T')[0],
        endDate: oneYearLater.toISOString().split('T')[0],
        amount: '70.00',
      })

      console.log('✅ Admin membership created')
    }

    // =========================
    // 2️⃣ TEST MEMBERS
    // =========================
    const testMembers = [
      {
        memberNumber: 2,
        email: 'joao@test.com',
        password: 'test123',
        name: 'João Silva',
        profession: 'Terapeuta Ocupacional',
        district: 'Porto',
        institution: 'Hospital Lusíadas Porto',
        role: 'member' as Role,
        status: 'active' as const
      },
      {
        memberNumber: 3,
        email: 'raqcosta@test.com',
        password: 'test123',
        name: 'Raquel Costa',
        profession: 'Terapeuta Ocupacional',
        district: 'Almada',
        institution: 'Hospital Garcia de Horta',
        role: 'board' as Role,
        status: 'active' as const
      },
      {
        memberNumber: 4,
        email: 'nandotorres9@test.com',
        password: 'test123',
        name: 'Fernando Torres',
        profession: 'Terapeuta Ocupacional',
        district: 'Faro',
        institution: 'Hospital de Faro',
        role: 'member' as Role,
        status: 'active' as const
      }
    ]

    for (const memberData of testMembers) {
      let existing = await memberService.getMemberByEmail(memberData.email)

      if (!existing) {
        await memberService.createMemberWithPassword(memberData)
        console.log(`✅ Created member: ${memberData.name}`)
        existing = await memberService.getMemberByEmail(memberData.email)
      } else {
        console.log(`ℹ️ Member already exists: ${memberData.name}`)
      }

      if (!existing) continue

      // =========================
      // 3️⃣ MEMBERSHIPS (with variety)
      // =========================
      const existingMembership = await db.query.memberships.findFirst({
        where: (m, { eq }) => eq(m.memberId, existing.id),
      })

      if (!existingMembership) {
        const now = new Date()

        const startDate = new Date()
        const endDate = new Date()

        // 👇 Create different scenarios for testing
        if (memberData.email === 'joao@test.com') {
          // ACTIVE
          endDate.setFullYear(now.getFullYear() + 1)
        } else if (memberData.email === 'raqcosta@test.com') {
          // EXPIRED
          startDate.setFullYear(now.getFullYear() - 2)
          endDate.setFullYear(now.getFullYear() - 1)
        } else {
          // EXPIRING SOON
          endDate.setDate(now.getDate() + 10)
        }

        await db.insert(memberships).values({
          memberId: existing.id,
          type: 'yearly',
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          amount: '70.00',
        })

        console.log(`📅 Membership created for ${memberData.name}`)
      }
    }

    console.log('🎉 Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

seed()