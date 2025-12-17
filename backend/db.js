// import pkg from "pg";
// const { Pool } = pkg;

// const pool = new Pool({
//   user: String(process.env.DB_USER),         // must be string
//   host: String(process.env.DB_HOST),         // must be string
//   database: String(process.env.DB_NAME),     // must be string
//   password: String(process.env.DB_PASSWORD), // must be string
//   port: Number(process.env.DB_PORT),         // must be number
// });

// export default pool;



import pkg from 'pg';
const { Pool } = pkg;

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
    });

    pool.connect()
      .then(() => console.log('Postgres connected'))
      .catch(err => console.error('Postgres connection error:', err));
  }
  return pool;
}