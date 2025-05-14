import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://turnoscanchas.onrender.com/api/turnos_canchas/canchas";

export const useObtenerTurnosxCancha = (id) => {
  const [turnos, setTurnos] = useState();

  useEffect(() => {
    console.log("ID recibido:", id);
    const obtenerDatos = async () => {
      try {
        const res = await axios.get(`${API_URL}?id=${id}`);
        setTurnos(res.data);
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    };

    if (id) obtenerDatos(); // solo si hay un ID válido
  }, [id]);

  return { turnos };
};
