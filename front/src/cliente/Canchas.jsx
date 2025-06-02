import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTodosLosTurnos } from "../customHooks/useObtenerTodosLosTurnos";
import { format } from "date-fns";
import { FaMapMarkerAlt } from "react-icons/fa";

export const Canchas = () => {
  const { datos: canchas, isLoading, error } = useCanchas();
  const {
    turnos,
    isLoading: isLoadingTurnos,
    error: errorTurnos,
  } = useObtenerTodosLosTurnos();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCanchas = canchas.filter((cancha) =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return format(fecha, "dd-MM-yyyy");
  }

  function getFechaHoy() {
    const hoy = new Date();

    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
    const anio = hoy.getFullYear();

    return `${dia}-${mes}-${anio}`;
  }

  const turnosLibres = (id) =>
    turnos.reduce(
      (total, turno) =>
        turno.estado === "disponible" &&
        turno.cancha_id === id &&
        formatearFecha(turno.fecha) === getFechaHoy()
          ? total + 1
          : total,
      0
    );

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-around py-4 px-2 sm:p-5">
      {/* Header */}
      <header className="mb-4 sm:mb-6 text-center w-full max-w-md px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
          Elegí tu Cancha
        </h1>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
          Seleccioná una cancha para reservar tu turno
        </p>
      </header>

      {/* Contenedor de resultados */}
      <div className="w-full lg:max-w-5xl xl:max-w-7xl rounded-2xl sm:rounded-3xl shadow-lg py-3 sm:p-4 backdrop-blur-sm border border-gray-100">
        {/* Estado de carga */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-40 sm:h-48 flex flex-col justify-center items-center bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-inner"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-2 sm:mb-3"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm md:text-base font-medium text-gray-600"
            >
              Cargando canchas...
            </motion.p>
          </motion.div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs sm:text-sm text-red-700 text-center">
            Hubo un error al cargar las canchas. Inténtalo nuevamente.
          </div>
        ) : filteredCanchas.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            No se encontraron canchas con ese nombre
          </div>
        ) : (
          <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[80vh] sm:max-h-[calc(100vh-100px)] px-2 sm:px-3">
            {filteredCanchas.map((cancha, index) => (
              <motion.div
                key={cancha.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transform-gpu m-2 bg-gray-50"
              >
                <Link
                  to={`/${cancha.seccion}`}
                  state={{ idCancha: cancha.id }}
                  className={`flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg ${
                    turnosLibres(cancha.id) === 0 ? "brightness-75" : ""
                  } border border-gray-200 hover:border-green-300 transition-all duration-300 group`}
                  aria-label={`Reservar en cancha ${cancha.nombre}`}
                  role="button"
                >
                  {/* Imagen redonda - responsive */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-emerald-200 shadow-inner flex-shrink-0 ring-1 ring-emerald-100 group-hover:ring-emerald-300 transition-all duration-300">
                    <img
                      src={cancha.logo}
                      alt={`Logo de ${cancha.nombre}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Información - responsive */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors capitalize truncate py-1">
                      {cancha.nombre}
                    </h3>

                    <div className="mt-1 flex flex-col text-xs sm:text-sm lg:text-base text-gray-600">
                      <span className="truncate flex items-center">
                        <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-500 mr-1" />
                        {cancha.direccion}
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 ml-4 sm:ml-5 lg:ml-6">
                        {cancha.localidad}
                      </span>
                    </div>

                    {/* Estado de disponibilidad - responsive */}
                    <div
                      className={`mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs sm:text-sm font-medium ${
                        turnosLibres(cancha.id) > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {turnosLibres(cancha.id) > 0 ? (
                        <>
                          <span className="mr-1">✅</span>
                          {turnosLibres(cancha.id)}{" "}
                          {turnosLibres(cancha.id) !== 1
                            ? "turnos disponibles"
                            : "turno disponible"}
                        </>
                      ) : (
                        <>
                          <span className="mr-1">🚫</span>Sin turnos
                          disponibles
                        </>
                      )}
                    </div>
                  </div>

                  {/* Flecha de acción - responsive */}
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-600 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transform transition-all duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};