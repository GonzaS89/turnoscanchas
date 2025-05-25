import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";
import { FaFutbol, FaClock, FaCheckCircle, FaTimes } from "react-icons/fa";

export const ReservaDeTurno = ({ id, enviarIdTurno }) => {
  const { datos: canchas } = useCanchas();
  const cancha = canchas.find((item) => item.id === id);
  const { turnos, isLoading, error } = useObtenerTurnosxCancha(cancha?.id);

  const fechaHoy = new Date().toLocaleDateString("sv-SE"); // "YYYY-MM-DD"

  // Función para ordenar los turnos por hora
  const ordenarTurnos = (turnos) => {
    return turnos?.sort((a, b) => {
      const getMinutos = (horaStr) => {
        const [hora, minutos] = horaStr.split(":").map(Number);
        return hora === 0 ? 1440 : hora * 60 + minutos;
      };
      return getMinutos(a.hora) - getMinutos(b.hora);
    });
  };

  // Filtrar y ordenar turnos de hoy
  const turnosDeHoy = ordenarTurnos(
    turnos?.filter((turno) => turno.fecha.split("T")[0] === fechaHoy)
  );

  const formatearHora = (horaStr) => horaStr.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col justify-center gap-6 bg-gradient-to-b from-white via-green-50 to-green-400 p-5"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-4 text-center"
      >
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
            <FaFutbol className="text-white text-2xl" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
          Elegí tu Turno
        </h1>
        {cancha && (
          <p className="text-sm text-gray-500 mt-2">
            Cancha:{" "}
            <span className="font-medium uppercase">{cancha.nombre}</span>
          </p>
        )}
      </motion.header>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center max-w-md">
            Error al cargar los turnos. Intente nuevamente.
          </div>
        ) : turnosDeHoy?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 text-center max-w-md w-full"
          >
            <FaClock className="mx-auto text-4xl text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No hay turnos disponibles
            </h3>
            <p className="text-gray-500">
              No hay turnos disponibles para hoy en esta cancha.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-md space-y-3"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 mb-2">
              <p className="text-center text-sm font-medium text-emerald-700">
                Turnos disponibles para hoy
              </p>
            </div>

            <div className="space-y-3">
              {turnosDeHoy?.map((turno) => (
             <motion.div
  key={turno.id}
  whileHover={{ y: -4 }}
  whileTap={{ scale: 0.96 }}
  transition={{ 
    type: "spring", 
    stiffness: 300,
    damping: 15,
    mass: 0.5
  }}
  className="w-full mb-4"
>
  <Link
    to={turno.estado === "disponible" ? "/confirmaciondeturno" : "#"}
    onClick={() => turno.estado === "disponible" && enviarIdTurno(turno.id)}
    className={`block w-full p-5 rounded-2xl relative overflow-hidden ${
      turno.estado === "disponible"
        ? "bg-white border-2 border-emerald-300/30 hover:border-emerald-400/50"
        : "bg-gray-100/80 border-2 border-gray-200/50"
    } transition-all duration-300 shadow-sm hover:shadow-md`}
  >
    {/* Efecto de brillo al hover */}
    {turno.estado === "disponible" && (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileHover={{ opacity: 0.4, x: 100 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
    )}
    
    <div className="flex items-center justify-between relative z-10">
      {/* Hora con indicador premium */}
      <div className="flex items-center space-x-4">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            transition: { repeat: Infinity, duration: 2 }
          }}
          className={`p-3 rounded-xl ${
            turno.estado === "disponible"
              ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-300/50"
              : "bg-gradient-to-br from-gray-400 to-gray-500 text-gray-100 shadow-gray-400/30"
          } shadow-md`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </motion.div>
        
        <div>
          <span className={`text-2xl font-bold ${
            turno.estado === "disponible" ? "text-gray-900" : "text-gray-600"
          }`}>
            {formatearHora(turno.hora)}
          </span>
          <p className={`text-xs ${
            turno.estado === "disponible" ? "text-emerald-600" : "text-gray-500"
          } font-medium mt-1`}>
            {turno.estado === "disponible" ? "Disponible ahora" : "Turno ocupado"}
          </p>
        </div>
      </div>

      {/* Botón premium */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-5 py-3 rounded-xl ${
          turno.estado === "disponible"
            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-400/30"
            : "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-400/20"
        }`}
      >
        <span className={`text-sm font-extrabold tracking-wider ${
          turno.estado === "disponible" ? "text-white" : "text-gray-100"
        }`}>
          {turno.estado === "disponible" ? "RESERVAR" : "COMPLETO"}
        </span>
      </motion.div>
    </div>
  </Link>
</motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center text-sm text-gray-500 mt-4"
      >
        <p>¿No encontrás el turno que buscás?</p>
        <p>
          <span className="font-medium text-emerald-600">
            Prueba con otra fecha
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};
