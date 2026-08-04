import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});pool.connect()
  .then((client) => {
    console.log("✅ Connected to Supabase PostgreSQL");
    client.release();
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });



export default pool;