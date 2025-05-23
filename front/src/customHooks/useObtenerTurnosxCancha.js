import { useState, useEffect } from "react";
import axios from "axios";

const serverLocal = 'http://localhost:3001';
const serverExterno = 'https://turnoscanchas-production.up.railway.app'


export const useObtenerTurnosxCancha = (id) => {
  const [turnos, setTurnos] = useState();

  useEffect(() => {
    console.log("ID recibido:", id);
    const obtenerDatos = async () => {
      try {
        const res = await axios.get(`${serverExterno}/api/turnos_canchas/canchas?id=${id}`);
        setTurnos(res.data);
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    };

    if (id) obtenerDatos(); // solo si hay un ID válido
  }, [id]);

  return { turnos };
};
