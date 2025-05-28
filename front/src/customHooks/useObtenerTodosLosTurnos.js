import { useState, useEffect } from 'react';
import axios from 'axios';

export const useObtenerTodosLosTurnos = () => {
    
    const serverExterno2 = 'https://turnoscanchas.onrender.com';
    const [turnos, setTurnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerTurnos = async () => {
            try {
                const res = await axios.get(`${serverExterno2}/api/turnos_canchas`);
                setTurnos(res.data);
            } catch (err) {
                console.error("Error al obtener turnos:", err);
                setError(err.message || "Hubo un error al cargar los turnos");
            } finally {
                setIsLoading(false);
            }
        };

        obtenerTurnos();
    }, []);

  return { turnos, isLoading,error };
}
