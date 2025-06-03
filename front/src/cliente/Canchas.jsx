import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

// Hooks personalizados
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTodosLosTurnos } from "../customHooks/useObtenerTodosLosTurnos";
import { format } from "date-fns";

export default function Canchas() {
  const { datos: canchas, isLoading, error } = useCanchas();
  const {
    turnos,
    isLoading: isLoadingTurnos,
    error: errorTurnos,
  } = useObtenerTodosLosTurnos();

  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar canchas por nombre
  const filteredCanchas = canchas.filter((cancha) =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatear fecha
  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return format(fecha, "dd-MM-yyyy");
  }

  function getFechaHoy() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
    const anio = hoy.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  // Contar turnos libres para hoy
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
    <section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-emerald-900 to-green-900 flex flex-col items-center justify-around py-6 px-4"
    >
      {/* Header */}
      <header className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-green-100 bg-clip-text text-transparent">
          Elegí tu Cancha
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">
          Seleccioná una cancha para reservar tu turno
        </p>
      </header>

      {/* Campo de búsqueda opcional */}
      <div className="w-full max-w-4xl mb-6 px-4">
        <input
          type="text"
          placeholder="Buscar cancha..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl bg-white/5 border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute left-4 top-3.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </span>
      </div>

      {/* Contenedor de resultados */}
      <div className="w-full lg:max-w-5xl xl:max-w-7xl rounded-2xl shadow-lg backdrop-blur-sm border border-emerald-800/30 overflow-hidden">
        {/* Estado de carga */}
        {isLoading || isLoadingTurnos ? (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-40 flex flex-col justify-center items-center bg-black/20 backdrop-blur-sm rounded-xl shadow-inner"
          >
            <div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-400 border-t-transparent rounded-full mb-3"
            />
            <p className="text-xs sm:text-sm text-gray-400">Cargando canchas...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200 text-center">
            {error}
          </div>
        ) : filteredCanchas.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md p-6 text-center border border-gray-700">
            <p className="text-gray-400">No se encontraron canchas con ese nombre</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4">
            {filteredCanchas.map((cancha, index) => (
              <div
                key={cancha.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transform-gpu bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-700"
              >
                <Link
                  to={`/${cancha.seccion}`}
                  state={{ idCancha: cancha.id }}
                  className="block p-4 sm:p-5 hover:bg-white/10 transition-all"
                  aria-label={`Reservar en cancha ${cancha.nombre}`}
                  role="button"
                >
                  <div className="flex items-center gap-4">
                    {/* Imagen redonda */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-emerald-600 ring-1 ring-emerald-500/50 group-hover:ring-emerald-400 transition-all duration-300">
                      <img
                        src={cancha.logo}
                        alt={`Logo de ${cancha.nombre}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-md sm:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors capitalize truncate">
                        {cancha.nombre}
                      </h3>

                      <div className="mt-1 flex flex-col text-xs sm:text-sm text-gray-400">
                        <span className="truncate flex items-center">
                          <FaMapMarkerAlt className="w-3 h-3 mr-1 text-gray-500" />
                          {cancha.direccion}
                        </span>
                        <span className="text-xs text-gray-500 ml-4 sm:ml-5">
                          {cancha.localidad}
                        </span>
                      </div>

                      {/* Estado de disponibilidad */}
                      <div
                        className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          turnosLibres(cancha.id) > 0
                            ? "bg-emerald-800/50 text-emerald-200"
                            : "bg-red-800/50 text-red-200"
                        }`}
                      >
                        {turnosLibres(cancha.id) > 0 ? (
                          <>
                            <span className="mr-1">✅</span>
                            {turnosLibres(cancha.id)}{" "}
                            {turnosLibres(cancha.id) !== 1 ? "turnos disponibles" : "turno disponible"}
                          </>
                        ) : (
                          <>
                            <span className="mr-1">🚫</span>Sin turnos
                          </>
                        )}
                      </div>
                    </div>

                    {/* Flecha de acción */}
                    <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transform transition-all duration-200" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}