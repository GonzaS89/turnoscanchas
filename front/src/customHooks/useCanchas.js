import { useEffect, useState } from 'react';
import axios from 'axios';

const serverLocal = 'http://localhost:3001';
const serverExterno = 'https://turnoscanchas-production.up.railway.app'


export const useCanchas = () => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios.get(`${serverLocal}/api/canchas`);
                setDatos(res.data)
            } catch {
                console.error('Error al obtener canchas');
            }
        };
        obtenerDatos();
    }, [])

    return { datos }
}
