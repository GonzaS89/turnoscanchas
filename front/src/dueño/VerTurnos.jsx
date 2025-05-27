import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTrashAlt, 
  FaCheck, 
  FaTimes, 
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaIdCard,
  FaPhone
} from "react-icons/fa";
import { FcClock } from "react-icons/fc";

export const VerTurnos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const [turnos, setTurnos] = useState([]);
  const [turnosAgrupados, setTurnosAgrupados] = useState({});
  const [fechaVisible, setFechaVisible] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const serverExterno = 'https://turnoscanchas-production.up.railway.app';

  const isReservado = (estado) => (estado === "reservado" || estado === "pendiente");

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${serverExterno}/api/turnos_canchas/canchas?id=${cancha.id}`);
        const turnosOrdenados = res.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setTurnos(turnosOrdenados);
      } catch (err) {
        console.error("Error al obtener turnos:", err);
        setError("Error al cargar los turnos. Intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    if (cancha?.id) fetchTurnos();
  }, [cancha]);

  useEffect(() => {
    const agrupados = turnos.reduce((acumulado, turno) => {
      const fecha = turno.fecha.split("T")[0];
      if (!acumulado[fecha]) {
        acumulado[fecha] = [];
      }
      acumulado[fecha].push(turno);
      return acumulado;
    }, {});

    Object.keys(agrupados).forEach((fecha) => {
      agrupados[fecha] = agrupados[fecha]
        .map((t) => ({ ...t, hora: t.hora.slice(0, 5) }))
        .sort((a, b) => {
          const horaA = a.hora === "00:00" ? "24:00" : a.hora;
          const horaB = b.hora === "00:00" ? "24:00" : b.hora;
          return horaA.localeCompare(horaB);
        });
    });

    setTurnosAgrupados(agrupados);
  }, [turnos]);

  const toggleFechaVisibility = (fecha) => {
    setFechaVisible((prevState) => ({
      ...prevState,
      [fecha]: !prevState[fecha],
    }));
  };

  const ponerDisponible = async (turnoId) => {
    try {
      await axios.put(`${serverExterno}/api/turnos/liberar/${turnoId}`);
      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === turnoId
            ? { ...turno, estado: "disponible", nombre: null, dni: null }
            : turno
        )
      );
    } catch (error) {
      console.error("Error al poner disponible:", error);
      alert("Error al liberar el turno");
    }
  };

  const confirmarPendiente = async (turnoId) => {
    try {
      await axios.put(`${serverExterno}/api/turnos/confirmar/${turnoId}`);
      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === turnoId ? { ...turno, estado: "reservado" } : turno
        )
      );
    } catch (error) {
      console.error("Error al confirmar turno:", error);
      alert("Error al confirmar el turno");
    }
  };

  const eliminarTurno = async (turnoId) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este turno?");
    if (!confirmar) return;

    try {
      await axios.delete(`${serverExterno}/api/turnos_canchas/${turnoId}`);
      setTurnos((prevTurnos) => prevTurnos.filter((turno) => turno.id !== turnoId));
    } catch (error) {
      console.error("Error al eliminar turno:", error);
      alert("Error al eliminar el turno");
    }
  };

  const formatFecha = (fechaStr) => {
  // Asegurarse de que la fecha se interprete correctamente
  const fecha = new Date(fechaStr);
  // Ajustar por huso horario local
  const fechaAjustada = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
  
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return fechaAjustada.toLocaleDateString('es-ES', options);
};

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full py-6 px-4 bg-gradient-to-b from-white via-green-50 to-green-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <FaArrowLeft className="text-lg" />
            <span className="hidden sm:inline">Volver</span>
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            Gestión de Turnos
          </h1>
          
          <div className="w-8"></div> {/* Spacer para alinear */}
        </header>

        {/* Información de la cancha */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 border border-emerald-100">
          <h2 className="text-lg font-semibold text-emerald-800 mb-2">
            {cancha?.nombre || "Tu cancha"}
          </h2>
          <p className="text-gray-600 text-sm">
            Administrá los turnos de tu cancha
          </p>
        </div>

        {/* Contenido principal */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
            {error}
          </div>
        ) : Object.keys(turnosAgrupados).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No hay turnos registrados</h3>
            <p className="text-gray-500">Aún no hay turnos cargados para esta cancha</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(turnosAgrupados).map(([fecha, turnosPorFecha]) => (
              <motion.div
                key={fecha}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="flex justify-between items-center p-4 bg-emerald-50 border-b border-emerald-100">
                  <h3 className="text-lg font-semibold text-emerald-800">
                    {formatFecha(fecha)}
                  </h3>
                  <button
                    onClick={() => toggleFechaVisibility(fecha)}
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-900 px-3 py-1 rounded-lg bg-white border border-emerald-200 hover:bg-emerald-100 transition"
                  >
                    {fechaVisible[fecha] ? "Ocultar" : "Mostrar"} turnos
                  </button>
                </div>

                <AnimatePresence>
                  {fechaVisible[fecha] && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="divide-y divide-gray-100"
                    >
                      {turnosPorFecha.map((turno) => (
                        <motion.li
                          key={turno.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`p-4 ${turno.estado === "disponible" ? "bg-white" : turno.estado === "pendiente" ? "bg-yellow-50" : "bg-green-50"}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Información del turno */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-white border border-emerald-100">
                                <FcClock className="text-3xl" />
                                <span className="sr-only">{turno.hora}</span>
                              </div>
                              
                              <div>
                                <p className="text-xl font-bold text-gray-800 mb-1">
                                  {turno.hora} hs
                                </p>
                                {isReservado(turno.estado) ? (
                                  <div className="space-y-1">
                                    <p className="flex items-center gap-2 text-sm text-gray-700">
                                      <FaUser className="text-emerald-600" />
                                      {turno.nombre}
                                    </p>
                                    <p className="flex items-center gap-2 text-sm text-gray-700">
                                      <FaIdCard className="text-emerald-600" />
                                      DNI: {turno.dni}
                                    </p>
                                    {turno.telefono && (
                                      <p className="flex items-center gap-2 text-sm text-gray-700">
                                        <FaPhone className="text-emerald-600" />
                                        Tel: {turno.telefono}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-emerald-600 font-medium">Disponible</p>
                                )}
                              </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex flex-col sm:flex-row gap-2 justify-end">
                              {turno.estado === "reservado" && (
                                <button
                                  onClick={() => ponerDisponible(turno.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                                >
                                  <FaTimes />
                                  <span>Liberar</span>
                                </button>
                              )}

                              {turno.estado === "pendiente" && (
                                <>
                                  <button
                                    onClick={() => confirmarPendiente(turno.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition"
                                  >
                                    <FaCheck />
                                    <span>Confirmar</span>
                                  </button>
                                  <button
                                    onClick={() => ponerDisponible(turno.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                                  >
                                    <FaTimes />
                                    <span>Cancelar</span>
                                  </button>
                                </>
                              )}

                              {turno.estado === "disponible" && (
                                <button
                                  onClick={() => eliminarTurno(turno.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                                  title="Eliminar turno"
                                >
                                  <FaTrashAlt />
                                  <span className="sm:hidden">Eliminar</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};