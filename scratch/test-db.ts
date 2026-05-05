const dotenv = require("dotenv");
dotenv.config();

const { db } = require("../db/index");
const { sql } = require("drizzle-orm");

async function testConnection() {
  try {
    console.log("Testing connection to:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@"));
    const result = await db.execute(sql`SELECT 1`);
    console.log("Connection successful:", result);
    process.exit(0);
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

testConnection();
