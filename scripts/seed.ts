import 'dotenv/config';
import { config } from 'dotenv';
import { db } from '../src/db';
import { members, memberships } from '../src/db/schema';
import { memberService } from '../src/lib/services/memberService';
import { eq } from 'drizzle-orm';

config({ path: '.env.local' });

async function seed() {
  try {
    console.log('Starting database seeding...');

    const adminEmail = process.env.AUTH_USER_EMAIL;
    const adminPassword = process.env.AUTH_USER_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('Error: AUTH_USER_EMAIL and AUTH_USER_PASSWORD must be set in .env.local');
      process.exit(1);
    }

    // Check if admin member already exists
    // const existingAdmin = await memberService.getMemberByEmail(adminEmail);
    // if (existingAdmin) {
    //   console.log('Admin member already exists. Skipping seeding.');
    //   return;
    // }

    // 1️⃣ Ensure admin exists
    let admin = await memberService.getMemberByEmail(adminEmail);

    if (!admin) {
      await memberService.createMemberWithPassword({
        memberNumber: 1,
        email: adminEmail,
        password: adminPassword,
        name: 'Administrador',
        profession: 'Administrator',
        role: 'admin',
        status: 'active'
      });

      console.log(`✅ Admin member created.`);

      admin = await memberService.getMemberByEmail(adminEmail);
    } 
    // else {
    //   console.log('ℹ️ Admin already exists.');
    // }

    if (!admin) {
      throw new Error('Failed to create or retrieve admin.');
    }

    // 2️⃣ Ensure admin has at least one membership
    const existingMembership = await db.query.memberships.findFirst({
      where: (memberships, { eq }) =>
        eq(memberships.memberId, admin.id),
    });

    if (!existingMembership) {
      const now = new Date();
      const oneYearLater = new Date();
      oneYearLater.setFullYear(now.getFullYear() + 1);

      await db.insert(memberships).values({
        memberId: admin.id,
        type: 'yearly',
        startDate: now.toISOString().split('T')[0],
        endDate: oneYearLater.toISOString().split('T')[0],
        amount: '70.00',
      });

      console.log('✅ Admin membership created.');
    } else {
      console.log('ℹ️ Admin already has a membership.');
    }

    // Create admin member with environment credentials
    // const adminMember = await memberService.createMemberWithPassword({
    //   memberNumber: 1,
    //   email: adminEmail,
    //   password: adminPassword,
    //   name: 'Administrador',
    //   profession: 'Administrator',
    //   role: 'admin',
    //   status: 'active'
    // });

    // console.log(`✅ Admin member created successfully: ${adminMember.name} (${adminMember.email})`);

  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  } finally {
    console.log('Seeding completed.');
  }
}

seed().catch(console.error);