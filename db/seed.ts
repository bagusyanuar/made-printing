import 'dotenv/config';
import { db } from './index';
import { users } from './schema';
import bcrypt from 'bcryptjs';

async function main() {
  const password = await bcrypt.hash('@Administrator1234', 10);
  
  console.log('🚀 Seeding administrator user...');
  
  try {
    await db.insert(users).values({
      username: 'administrator',
      password: password,
      isActive: true,
    }).onConflictDoUpdate({
      target: users.username,
      set: { password: password }
    });
    
    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();
