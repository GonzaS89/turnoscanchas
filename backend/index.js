import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3001;

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

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
