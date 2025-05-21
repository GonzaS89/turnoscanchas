import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = await mysql.createConnection(process.env.DATABASE_URL);

try {
  await db.connect();
  console.log('DB conectada con éxito');
} catch (error) {
  console.error('Error al conectar la DB:', error.message);
}

export default db;
