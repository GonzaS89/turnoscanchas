import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())

app.get('/api/canchas', async (req, res) => {
  try {
    const [resultado] = await db.execute('SELECT * FROM canchas');
    res.json(resultado);
  } catch {
    console.error('Error al obtener obras sociales');
    res.status(500).send('Error al obtener obras sociales');
  }
})

app.get('/api/turnos_canchas/canchas', async (req, res) => {
  const { id } = req.query;

  try {
    const query = "SELECT * FROM turnos_canchas WHERE cancha_id = ?"
    const [resultado] = await db.execute(query, [id]);
    res.json(resultado)
  } catch {
    console.error('Error al filtrar turnos');
    res.status(500).send('Error al filtrar turnos')
  }
})

app.put("/api/turnos/:idTurno", async (req, res) => {
  const { nombre, telefono, dni } = req.body;
  const { idTurno } = req.params; // Obtenemos el turno_id de los parámetros de la ruta

  try {
    const [resultado] = await db.execute(
      `UPDATE turnos_canchas
       SET nombre = ?, telefono = ?, dni =  ?, estado = 'reservado'
       WHERE id = ?`,
      [nombre, telefono, dni, idTurno]
    );

    if (resultado.affectedRows > 0) {
      res.json({ mensaje: "Turno reservado correctamente" });
    } else {
      res.status(404).json({ error: "Turno no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar turno:", error);
    res.status(500).json({ error: "Error al reservar turno" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
