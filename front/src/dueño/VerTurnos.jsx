import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TurnoItem from "./TurnoItem"; // El componente que creamos antes
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  FaArrowLeft,
  FaCalendarAlt
} from "react-icons/fa";

export default function VerTurnos() {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const [turnos, setTurnos] = useState([]);
  const [turnosAgrupados, setTurnosAgrupados] = useState({});
  const [fechaVisible, setFechaVisible] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isReservado = (estado) =>
    estado === "reservado" || estado === "pendiente";

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const fechaAjustada = new Date(
      fecha.getTime() + fecha.getTimezoneOffset() * 60000
    );
    const options = { weekday: "long", day: "numeric", month: "long" };
    return fechaAjustada.toLocaleDateString("es-ES", options);
  };

  // Obtener turnos
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`https://turnogol.site/api/turnos_canchas/canchas?id=${cancha.id}`);
        const turnosOrdenados = res.data.sort((a, b) =>
          new Date(b.fecha) - new Date(a.fecha)
        );
        setTurnos(turnosOrdenados);
      } catch (err) {
        setError("Error al cargar los turnos");
      } finally {
        setIsLoading(false);
      }
    };

    if (cancha?.id) fetchTurnos();
  }, [cancha]);

  // Agrupar turnos por fecha
  useEffect(() => {
    const agrupados = turnos.reduce((acc, turno) => {
      const fecha = turno.fecha.split("T")[0];
      if (!acc[fecha]) acc[fecha] = [];
      acc[fecha].push({ ...turno, hora: turno.hora.slice(0, 5) });
      return acc;
    }, {});

    Object.keys(agrupados).forEach((fecha) => {
      agrupados[fecha].sort((a, b) => a.hora.localeCompare(b.hora));
    });

    setTurnosAgrupados(agrupados);
  }, [turnos]);

  const toggleFechaVisibility = (fecha) => {
    setFechaVisible((prev) => ({
      ...prev,
      [fecha]: !prev[fecha],
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full py-6 px-4 bg-gradient-to-b from-gray-900 via-emerald-900 to-green-900"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-300 hover:text-emerald-100 transition-colors"
          >
            <FaArrowLeft className="text-lg" />
            <span className="hidden sm:inline">Volver</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-300 to-green-100 bg-clip-text text-transparent">
            Gestión de Turnos
          </h1>
          <div className="w-8"></div>
        </header>

        {/* Info Cancha */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 mb-8 border border-emerald-700/30">
          <p className="text-gray-300 text-sm text-center font-semibold">
            Administrá los turnos de tu cancha
          </p>
        </div>

        {/* Contenido principal */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-emerald-400 rounded-full"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200 text-center">
            {error}
          </div>
        ) : Object.keys(turnosAgrupados).length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md p-8 text-center border border-gray-700">
            <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No hay turnos registrados</h3>
            <p className="text-gray-500">Aún no hay turnos cargados para esta cancha</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(turnosAgrupados).map(([fecha, turnosPorFecha]) => (
              <motion.div
                key={fecha}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-md rounded-xl shadow-md overflow-hidden border border-gray-700"
              >
                {/* Encabezado de fecha */}
                <div className="flex justify-between items-center p-4 bg-emerald-800/30 border-b border-emerald-700">
                  <h3 className="text-lg font-semibold text-emerald-200">
                    {formatFecha(fecha)}
                  </h3>
                  <button
                    onClick={() => toggleFechaVisibility(fecha)}
                    className="text-sm font-medium text-emerald-300 hover:text-emerald-100 px-3 py-1 rounded-lg bg-white/10 border border-emerald-600 hover:bg-white/20 transition"
                  >
                    {fechaVisible[fecha] ? "Ocultar" : "Mostrar"} turnos
                  </button>
                </div>

                {/* Lista de turnos con animación por elemento */}
                {fechaVisible[fecha] && (
                  <ul className="divide-y divide-gray-700 flex flex-col gap-4 p-4">
                    {turnosPorFecha.map((turno) => (
                      <TurnoItem key={turno.id} turno={turno} isReservado={isReservado} />
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}