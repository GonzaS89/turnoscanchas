import { useEffect, useState } from 'react';
import axios from 'axios';

const serverLocal = 'http://localhost:3001';
const serverExterno = 'https://turnoscanchas-production.up.railway.app';
const serverExterno2 = 'https://turnoscanchas.onrender.com';

export const useCanchas = () => {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      setIsLoading(true);
      setError(null); // Reiniciar error en cada nueva carga

      try {
        const res = await axios.get(`http://srv848150.hstgr.cloud
        /api/canchas`);
        setDatos(res.data);
      } catch (err) {
        console.error('Error al obtener canchas:', err);
        setError(err.message || 'Hubo un error al cargar las canchas');
        setDatos([]); // Opcional: reiniciar datos en caso de error
      } finally {
        setIsLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  return { datos, isLoading, error };
};