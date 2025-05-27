import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";

export const Canchas = () => {
  const { datos: canchas, isLoading, error } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCanchas = canchas.filter((cancha) =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
        {filteredCanchas.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No se encontraron canchas con ese nombre
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredCanchas.map((cancha, index) => (
              <motion.div
                key={cancha.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transform-gpu"
              >
                <Link
                  to="/reservadeturno"
                  state={{ idCancha: cancha.id }}
                  className="flex items-center gap-4 rounded-2xl p-4 shadow-md hover:shadow-lg bg-white hover:bg-green-50 transition-all duration-200 active:scale-95 group"
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
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {cancha.direccion || "Dirección no disponible"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {cancha.localidad || "Localidad no especificada"}
                    </p>

                    {/* Cantidad de turnos libres */}
                    <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="mr-1">⏳</span>
                      {cancha.turnosDisponibles > 0
                        ? `${cancha.turnosDisponibles} turnos`
                        : "Sin turnos"}
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <div className="flex items-center gap-1 text-emerald-600 group-hover:text-emerald-800 transition-colors">
                    <span className="text-xs font-medium">Ver turnos</span>
                    <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
