import pkg from "pg";

const { Pool, types } = pkg;

// Convert PostgreSQL NUMERIC to JavaScript Number
types.setTypeParser(1700, (value) => parseFloat(value));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sherehe",
  password: "admin123",
  port: 5432,
});

// Test connection
pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL");
    client.release();
  })
  .catch((error) => {
    console.error(" Database connection failed:", error.message);
  });

export default pool;