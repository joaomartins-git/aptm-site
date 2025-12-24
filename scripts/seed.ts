import { config } from 'dotenv';
import { db } from '../src/db';
import { members } from '../src/db/schema';
import { memberService } from '../src/lib/services/memberService';

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
    const existingAdmin = await memberService.getMemberByEmail(adminEmail);
    if (existingAdmin) {
      console.log('Admin member already exists. Skipping seeding.');
      return;
    }

    // Create admin member with environment credentials
    const adminMember = await memberService.createMemberWithPassword({
      email: adminEmail,
      password: adminPassword,
      name: 'Administrador',
      profession: 'Administrator',
      role: 'admin',
      status: 'active'
    });

    console.log(`✅ Admin member created successfully: ${adminMember.name} (${adminMember.email})`);

  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  } finally {
    console.log('Seeding completed.');
  }
}

seed().catch(console.error);