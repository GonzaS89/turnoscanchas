import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = await mysql.createConnection({
  uri: process.env.DATABASE_URL,
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
