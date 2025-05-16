// customHooks/useTodosLosTurnos.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useTodosLosTurnos = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios.get("/api/turnos")
      .then((res) => setTurnos(res.data))
      .catch((err) => console.error("Error al obtener turnos", err));
  }, []);

  return { turnos };
};
