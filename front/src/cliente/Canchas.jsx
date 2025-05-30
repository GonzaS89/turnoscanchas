import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTodosLosTurnos } from "../customHooks/useObtenerTodosLosTurnos";
import { format } from "date-fns";

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
    <section className="w-full min-h-screen flex flex-col items-center justify-around p-5">
      {/* Header */}
      <header className="mb-6 text-center w-full max-w-md px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
          Elegí tu Cancha
        </h1>

        <p className="text-gray-600 mt-2 text-sm sm:text-base">
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
          <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-250px)] px-2">
            {/* Barra de búsqueda */}

            {/* Lista de canchas */}

            {filteredCanchas.length > 0 ? (
              [...filteredCanchas]
                .sort((a, b) => turnosLibres(b.id) - turnosLibres(a.id))
                .map((cancha, index) => (
                  <motion.div
                    key={cancha.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="transform-gpu mt-1"
                  >
                    <Link
                      to={`/${cancha.seccion}`}
                      state={{ idCancha: cancha.id }}
                      className={`flex items-center gap-4 rounded-2xl p-4 shadow-md hover:shadow-lg ${
                        turnosLibres(cancha.id) === 0 ? "brightness-75" : ""
                      } border border-gray-200 hover:border-green-300 transition-all duration-300 group`}
                      aria-label={`Reservar en cancha ${cancha.nombre}`}
                      role="button"
                    >
                      {/* Imagen redonda */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-200 shadow-inner flex-shrink-0 ring-1 ring-emerald-100 group-hover:ring-emerald-300 transition-all duration-300">
                        <img
                          src={cancha.logo}
                          alt={`Logo de ${cancha.nombre}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Información */}
                      <div className="flex-1 min-w-0">
                        {/* Nombre de la cancha */}
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors capitalize truncate py-2">
                          {cancha.nombre}
                        </h3>

                        {/* Dirección y localidad */}
                        <div className="mt-1 flex flex-col text-sm text-gray-600">
                          <span className="truncate flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1.5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {cancha.direccion}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5 ml-5.5">
                            {cancha.localidad}
                          </span>
                        </div>

                        {/* Estado de disponibilidad */}
                        <div
                          className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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

                      {/* Flecha de acción */}
                      <FaArrowRight className="w-4 h-4 text-emerald-600 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transform transition-all duration-200" />
                    </Link>
                  </motion.div>
                ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-700">
                  No se encontraron canchas
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Intente ajustar los términos de búsqueda.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
