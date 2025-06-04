import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTodosLosTurnos } from "../customHooks/useObtenerTodosLosTurnos";
import { format } from "date-fns";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Canchas () {
  const { datos: canchas, isLoading, error } = useCanchas();
  const {
    turnos,
    isLoading: isLoadingTurnos,
    error: errorTurnos,
  } = useObtenerTodosLosTurnos();

  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCanchas = canchas
  .filter((cancha) =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const turnosA = turnosLibres(a.id);
    const turnosB = turnosLibres(b.id);
    return turnosB - turnosA; // De mayor a menor
  });

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

  

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-around py-6 px-2 sm:px-4">
  {/* Header */}
  <header 
    className="mb-8 sm:mb-10 text-center w-full max-w-md px-3 sm:px-5 py-4 rounded-xl bg-gradient-to-b from-white to-emerald-50/50 shadow-sm"
  >
    <h1 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl xl:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-emerald-700"
    >
      Elegí tu Cancha
    </h1>
    <p 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-gray-600 mt-2 text-base lg:text-xl"
    >
      Seleccioná una cancha para reservar tu turno
    </p>
  </header>

  {/* Contenedor de resultados */}
  <div className="w-full lg:max-w-5xl xl:max-w-7xl py-3 sm:p-4 backdrop-blur-sm border border-gray-100 rounded-xl bg-white/80 shadow-md">
    {/* Estado de carga */}
    {isLoading ? (
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-40 sm:h-48 flex flex-col justify-center items-center bg-white/70 backdrop-blur-sm rounded-xl shadow-inner"
      >
        <div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-2 sm:mb-3"
        />
        <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600">
          Cargando canchas...
        </p>
      </div>
    ) : error ? (
      <div className="p-3 text-xs sm:text-sm text-red-700 text-center">
        Hubo un error al cargar las canchas. Inténtalo nuevamente.
      </div>
    ) : filteredCanchas.length === 0 ? (
      <div className="text-center py-4 text-gray-500 text-sm">
        No se encontraron canchas con ese nombre
      </div>
    ) : (
      <div className="flex flex-col gap-3 md:grid lg:grid-cols-2 xl:grid-cols-3 overflow-y-auto px-2 sm:px-3">
        {filteredCanchas.map((cancha, index) => (
          <div
            key={cancha.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="transform-gpu overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <Link
              to={`/${cancha.seccion}`}
              state={{ idCancha: cancha.id }}
              className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-5 pr-5 group ${
                turnosLibres(cancha.id) === 0 ? "opacity-70" : ""
              } border-l-4 border-transparent hover:border-emerald-400 transition-all duration-300`}
              aria-label={`Reservar en cancha ${cancha.nombre}`}
              role="button"
            >
              {/* Imagen - responsive */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden shadow-md">
                <img
                  src={cancha.logo}
                  alt={`Logo de ${cancha.nombre}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Información */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors capitalize truncate">
                  {cancha.nombre}
                </h3>

                {/* Dirección y localidad */}
                <div className="mt-1 flex flex-col text-xs sm:text-sm text-gray-600">
                  <span className="truncate flex items-center">
                    <FaMapMarkerAlt className="w-3 h-3 text-gray-500 mr-1.5" />
                    {cancha.direccion}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 ml-4">
                    {cancha.localidad}
                  </span>
                </div>

                {/* Estado de disponibilidad */}
                <div
                  className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${
                    turnosLibres(cancha.id) > 0
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
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
                      <span className="mr-1">🚫</span>Sin turnos disponibles
                    </>
                  )}
                </div>
              </div>

              {/* Flecha de acción */}
              <div className="flex-shrink-0 text-emerald-600 opacity-70 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
  );
};