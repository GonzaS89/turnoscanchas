import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/canchas'

export const useObtenerCancha = () => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios.get(API_URL);
                setDatos(res.data)
            } catch {
                console.error('Error al obtener canchas');
            }
        };
        obtenerDatos();
    }, [])

    return { datos }
}
