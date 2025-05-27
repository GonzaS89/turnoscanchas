import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTodosLosTurnos } from "../customHooks/useObtenerTodosLosTurnos";
import { format } from "date-fns";


export const Canchas = () => {
  const { datos: canchas, isLoading, error } = useCanchas();
  const { turnos, isLoading: isLoadingTurnos, error: errorTurnos } = useObtenerTodosLosTurnos();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCanchas = canchas.filter((cancha) =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return format(fecha, 'dd-MM-yyyy');
  }

  function getFechaHoy() {
    const hoy = new Date();
  
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const anio = hoy.getFullYear();
  
    return `${dia}-${mes}-${anio}`;
  }

  const turnosLibres = (id) =>
  turnos.reduce(
    (total, turno) =>
      turno.estado === "disponible" && turno.cancha_id === id &&
      formatearFecha(turno.fecha) === getFechaHoy()
        ? total + 1
        : total,
    0
  );

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-around p-5">
      {/* Header */}
      <header className="mb-6 text-center w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow-sm">
          Elegí tu Cancha
        </h1>
        <p className="text-gray-500 mt-1">
          Seleccioná una cancha para reservar tu turno
        </p>
      </header>

      {/* Contenedor de resultados */}
      <div className="w-full max-w-md rounded-3xl shadow-lg p-4 bg-white backdrop-blur-sm border border-gray-100">
        {/* Estado de carga */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 flex flex-col justify-center items-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-inner"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-3"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm font-medium text-gray-600"
            >
              Cargando canchas...
            </motion.p>
          </motion.div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-red-700 text-center max-w-md w-full">
            Hubo un error al cargar las canchas. Inténtalo nuevamente.
          </div>
        ) : filteredCanchas.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No se encontraron canchas con ese nombre
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredCanchas.map((cancha, index) => (
              <motion.div
              key={cancha.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="transform-gpu"
            >
              <Link
                to="/reservadeturno"
                state={{ idCancha: cancha.id }}
                className="flex items-center gap-4 rounded-2xl p-4 shadow-sm hover:shadow-md bg-white hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all duration-200 group"
                aria-label={`Reservar en cancha ${cancha.nombre}`}
                role="button"
              >
                {/* Imagen redonda */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-200 shadow-sm flex-shrink-0">
                  <img
                    src={cancha.logo}
                    alt={`Logo de ${cancha.nombre}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
            
                {/* Información */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors capitalize">
                    {cancha.nombre}
                  </h3>
                  {/* Cantidad de turnos libres */}
                  <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-green-800">
                    
                    <span>
                    {turnosLibres(cancha.id) > 0
  ? `✅ ${turnosLibres(cancha.id)} turnos disponibles hoy`
  : '🚫 No hay turnos disponibles'}
                    </span>
                  </div>
                </div>
            
                {/* Flecha de acción */}
                <FaArrowRight className="w-4 h-4 text-emerald-600 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transform transition-all" />
              </Link>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};