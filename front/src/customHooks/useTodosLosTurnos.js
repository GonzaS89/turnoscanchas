// customHooks/useTodosLosTurnos.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useTodosLosTurnos = () => {

  const serverExterno = 'https://turnoscanchas-production.up.railway.app';
  const serverExterno2 = 'https://turnoscanchas-backend.onrender.com';
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios.get(`${serverExterno2}/api/turnos`)
      .then((res) => setTurnos(res.data))
      .catch((err) => console.error("Error al obtener turnos", err));
  }, []);

  return { turnos };
};
