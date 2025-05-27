import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";
import { FaFutbol, FaClock } from "react-icons/fa";
// Obtener el id de la cancha desde el estado de la ubicación

export const ReservaDeTurno = () => {
  const location = useLocation();
  const { idCancha : id } = location.state || {}; 
  const { datos: canchas, isLoading : loadingCancha } = useCanchas();
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
      className="w-full min-h-screen flex flex-col gap-4 sm:gap-6"
    >
{/* Header con efecto blur, logo dentro y texto destacado */}
{/* Banner con loader */}
<div className="w-full relative">
  {/* Imagen de portada */}
  <div className="h-40 sm:h-48 md:h-56 w-full bg-gray-200 overflow-hidden relative">
    {cancha?.portada ? (
      <img
        src={cancha.portada}
        alt={`Portada de ${cancha.nombre}`}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-r from-green-600 to-emerald-800"></div>
    )}

    {/* Overlay sutil */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent backdrop-brightness-50 backdrop-blur-sm"></div>
  </div>

  {/* Loader mientras carga */}
  {loadingCancha ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-sm"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-emerald-300 border-t-transparent rounded-full"
      />
    </motion.div>
  ) : (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-4 sm:px-6">
      {/* Logo circular */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-lg overflow-hidden flex-shrink-0 z-10">
          {cancha?.logo ? (
            <img
              src={cancha.logo}
              alt={`Logo de ${cancha.nombre}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-emerald-500 flex items-center justify-center">
              <FaFutbol className="text-white text-xl sm:text-2xl" />
            </div>
          )}
        </div>
        {/* Texto del nombre y ubicación */}
        <div className="text-white drop-shadow-lg px-4 py-3 sm:px-5 sm:py-4 rounded-xl inline-block max-w-md">
          <h2 className="text-xl sm:text-2xl font-extrabold capitalize tracking-wide">
            {cancha?.nombre || "Cancha"}
          </h2>
          <p className="text-sm sm:text-base text-white/90 mt-1 flex items-center gap-2">
            <span className="text-emerald-300">📍</span>
            {cancha?.direccion ? `${cancha.direccion} - ` : ""}{cancha?.localidad || "Localidad no disponible"}
          </p>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 flex items-center gap-2">
            <span className="text-emerald-300">💰</span>
            Precio por turno: $ {cancha?.tarifa1 } {cancha?.tarifa2 ? `- $${cancha.tarifa2}` : ""}
          </p>
       
        </div>
      </div>

      {/* Información adicional opcional */}
      <div className="hidden sm:flex flex-col items-end text-right text-white/90 text-xs">
        <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
          {cancha?.tipo || "Césped natural"}
        </span>
        <span className="mt-1">Capacidad: {cancha?.capacidad || 10} jugadores</span>
      </div>
    </div>
  )}
</div>
  
      {/* Contenido principal */}
      <div className="mt-14 sm:mt-16 px-4 sm:px-5 pb-4 sm:pb-5 flex-1 flex flex-col">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-3 sm:mb-4 text-center"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            Elegí tu Turno
          </h1>
        </motion.header>
  
        <div className="flex-1 flex flex-col items-center">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-red-700 text-center max-w-md w-full">
              Error al cargar los turnos. Intente nuevamente.
            </div>
          ) : turnosDeHoy?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 text-center max-w-md w-full"
            >
              <FaClock className="mx-auto text-3xl sm:text-4xl text-gray-400 mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1">
                No hay turnos disponibles
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                No hay turnos disponibles para hoy en esta cancha.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full max-w-md space-y-2 sm:space-y-3"
            >
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 mb-1 sm:mb-2">
                <p className="text-center text-xs sm:text-sm font-medium text-emerald-700">
                  Turnos disponibles para hoy
                </p>
              </div>
  
              <div className="space-y-2 sm:space-y-3">
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
                    className="w-full mb-3 sm:mb-4"
                  >
                    <Link
                      to={turno.estado === "disponible" ? "/confirmaciondeturno" : "#"}
                      state={{ idCancha: cancha.id, idTurno: turno.id }}
                      className={`block w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl relative overflow-hidden ${
                        turno.estado === "disponible"
                          ? "bg-white border-2 border-emerald-300/30 hover:border-emerald-400/50"
                          : "bg-gray-100/80 border-2 border-gray-200/50"
                      } transition-all duration-300 shadow-sm hover:shadow-md`}
                    >
                      {turno.estado === "disponible" && (
                        <motion.div
                          initial={{ opacity: 0, x: -100 }}
                          whileHover={{ opacity: 0.4, x: 100 }}
                          transition={{ duration: 0.8 }}
                          className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                        />
                      )}
  
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <motion.div
                            animate={{
                              scale: [1, 1.05, 1],
                              transition: { repeat: Infinity, duration: 2 }
                            }}
                            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                              turno.estado === "disponible"
                                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-300/50"
                                : "bg-gradient-to-br from-gray-400 to-gray-500 text-gray-100 shadow-gray-400/30"
                            } shadow-md`}
                          >
                            <svg
                              width="18"
                              height="18"
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
                            <span className={`text-xl sm:text-2xl font-bold ${
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
  
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl ${
                            turno.estado === "disponible"
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-400/30"
                              : "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-400/20"
                          }`}
                        >
                          <span className={`text-xs sm:text-sm font-extrabold tracking-wider ${
                            turno.estado === "disponible" ? "text-white" : "text-gray-100"
                          }`}>
                            {turno.estado === "disponible" ? "RESERVAR" : "RESERVADO"}
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
      </div>
    </motion.div>
  );
};