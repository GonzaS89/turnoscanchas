import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaStar, FaSearch } from 'react-icons/fa';
import { useCanchas } from '../customHooks/useCanchas';

const CanchaSkeleton = () => (
  <div className="flex items-center gap-4 rounded-2xl p-4 shadow-md bg-white">
    <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </div>
    <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
  </div>
);

export const Canchas = ({ idCancha }) => {
  const { datos: canchas, isLoading, error } = useCanchas();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return (
    <section className="w-full min-h-screen flex flex-col items-center justify-around bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <div className="w-full max-w-md space-y-4">
        <CanchaSkeleton />
        <CanchaSkeleton />
        <CanchaSkeleton />
      </div>
    </section>
  );

  if (error) return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <div className="text-center py-10 text-red-500">
        Error al cargar canchas: {error.message}
      </div>
    </section>
  );

  if (!canchas || canchas.length === 0) return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <div className="text-center py-10 text-gray-500">
        No hay canchas disponibles en este momento
      </div>
    </section>
  );

  const filteredCanchas = canchas.filter(cancha => 
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-around p-5">
      <header className="mb-6 text-center w-full max-w-md">  
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow-sm">
          Elegí tu Cancha
        </h1>
        <p className="text-gray-500 mt-1">
          Seleccioná una cancha para reservar tu turno
        </p>
        
        {/* <div className="relative mt-4">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cancha..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar canchas"
          />
        </div> */}
      </header>

      <div className="w-full max-w-md rounded-3xl shadow-lg p-4 bg-white backdrop-blur-sm">
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
              >
                <Link
                  to="/reservadeturno"
                  state={{ idCancha: cancha.id }}
                  className="flex items-center gap-4 rounded-2xl p-4 shadow-md hover:shadow-lg bg-white hover:bg-green-100 transition-all duration-200 active:scale-95 group"
                  onClick={() => idCancha(cancha.id)}
                  aria-label={`Reservar en cancha ${cancha.nombre}`}
                  role="button"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-300 shadow-sm">
                    <img
                      src={cancha.logo}
                      alt={`Logo de ${cancha.nombre}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800 group-hover:text-green-800 transition capitalize">
                      {cancha.nombre}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Tocá para ver turnos disponibles
                    </p>
                  </div>

                  <FaArrowRight className="text-green-600 text-xl" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};