import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const db = await mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  timezone: '-03:00' // Offset fijo para Argentina (UTC-3)
  
});

try {
  await db.connect();
  // Configurar la zona horaria explícitamente (seguridad adicional)
  await db.execute("SET time_zone = '-03:00'")
  console.log('DB conectada con éxito. Zona horaria configurada: Argentina');
} catch (error) {
  console.error('Error al conectar la DB:', error.message);
}

export default db;
