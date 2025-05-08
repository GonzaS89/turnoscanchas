import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

try {
  await db.connect();
  console.log('DB conectada con éxito');
} catch (error) {
  console.error('Error al conectar la DB:', error.message);
}

export default db;
