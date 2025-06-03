// TurnoItem.jsx
import { motion } from "framer-motion";
import React from "react";
import { 
    FaClock,FaIdCard,FaPhone,FaRegThumbsUp,FaTimes,FaTrashAlt,FaUser,FaCheck
  } from "react-icons/fa";
  import { 
    FcClock
  } from "react-icons/fc";

const TurnoItem = ({ turno, isReservado }) => {
    
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-lg ${
        turno.estado === "disponible"
          ? "bg-white/5"
          : turno.estado === "pendiente"
          ? "bg-yellow-900/20"
          : "bg-green-900/20"
      }`}
    >
      {/* Contenido del turno */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Información del turno */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-white/10 border border-emerald-700">
            <FcClock className="text-3xl" />
          </div>
          <div>
            <p className="text-xl font-bold text-white mb-1">{turno.hora} hs</p>
            {isReservado(turno.estado) ? (
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm text-gray-300">
                  <FaUser className="text-emerald-400" /> {turno.nombre}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-300">
                  <FaIdCard className="text-emerald-400" /> DNI: {turno.dni}
                </p>
                {turno.telefono && (
                  <p className="flex items-center gap-2 text-sm text-gray-300">
                    <FaPhone className="text-emerald-400" /> Tel: {turno.telefono}
                  </p>
                )}
                <div>
                  {turno.estado === "pendiente" ? (
                    <span className="text-yellow-400 font-medium text-xs inline-flex items-center gap-1">
                      <FaClock /> Pendiente de confirmación
                    </span>
                  ) : (
                    <span className="text-green-400 font-medium text-xs inline-flex items-center gap-1">
                      <FaRegThumbsUp /> Reservado
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-emerald-400 font-medium">Disponible</p>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          {turno.estado === "reservado" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-800/70 text-red-200 rounded-lg transition">
              <FaTimes />
              <span>Liberar</span>
            </button>
          )}

          {turno.estado === "pendiente" && (
            <>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-800/70 hover:bg-green-700/80 text-green-200 rounded-lg transition">
                <FaCheck />
                <span>Confirmar</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-800/70 text-red-200 rounded-lg transition">
                <FaTimes />
                <span>Cancelar</span>
              </button>
            </>
          )}

          {turno.estado === "disponible" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-800/70 text-red-200 rounded-lg transition">
              <FaTrashAlt />
              <span className="sm:hidden">Eliminar</span>
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default React.memo(TurnoItem);