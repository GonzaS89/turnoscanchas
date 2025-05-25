import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FcCalendar, FcPlus } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";

export const PanelCancha = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cancha = location.state?.cancha;
  const [vista, setVista] = useState("");

  const handleLogout = () => {
    // Lógica para cerrar sesión
    navigate("/login-cancha");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-green-100 px-4 py-8 sm:py-12 flex flex-col items-center"
    >
      {/* Header con botón de cerrar sesión */}
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          aria-label="Cerrar sesión"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>

      {/* Título y bienvenida */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8 sm:mb-12 flex flex-col items-center gap-4"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">
            {cancha?.propietario_nombre?.charAt(0) || "P"}
          </span>
        </div>
        
        <div>
          <p className="text-xl text-emerald-700 font-medium mb-1">
            Hola, {cancha?.propietario_nombre || "Propietario"} 👋
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            Panel de Gestión
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Cancha: <span className="font-medium text-gray-700">{cancha?.nombre || "Tu cancha"}</span>
          </p>
        </div>
      </motion.header>

      {/* Tarjetas de acción */}
      <div className="w-full max-w-md grid gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link 
            to="/verturnos" 
            state={{ cancha }}
            className="group block"
          >
            <div className="flex items-center justify-between p-5 sm:p-6 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <FcCalendar className="text-3xl" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                  Ver Turnos
                </span>
              </div>
              <div className="text-emerald-500 group-hover:text-emerald-700 transition-colors">
                →
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link 
            to="/agregarturno" 
            state={{ cancha }}
            className="group block"
          >
            <div className="flex items-center justify-between p-5 sm:p-6 rounded-xl bg-white hover:bg-blue-50 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FcPlus className="text-3xl" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  Agregar Turnos
                </span>
              </div>
              <div className="text-blue-500 group-hover:text-blue-700 transition-colors">
                →
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link 
            to="/micuenta" 
            state={{ cancha }}
            className="group block"
          >
            <div className="flex items-center justify-between p-5 sm:p-6 rounded-xl bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <IoSettingsSharp className="text-3xl text-gray-600" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-700 transition-colors">
                  Mi Cuenta
                </span>
              </div>
              <div className="text-gray-500 group-hover:text-gray-700 transition-colors">
                →
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-10 text-center text-sm text-gray-500 max-w-md"
      >
        <p>¿Necesitas ayuda? <span className="text-emerald-600 font-medium">Contacta a nuestro soporte</span></p>
      </motion.div>
    </motion.section>
  );
};