// customHooks/useTodosLosTurnos.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useTodosLosTurnos = () => {
  const serverExterno2 = 'https://turnoscanchas.onrender.com';
  const serverLocal = 'http://localhost:3001';
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios.get(`${serverLocal}/api/turnos`)
      .then((res) => setTurnos(res.data))
      .catch((err) => console.error("Error al obtener turnos", err));
  }, []);

  return { turnos };
};
