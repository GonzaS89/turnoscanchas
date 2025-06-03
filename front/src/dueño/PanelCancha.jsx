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
    navigate("/", { replace: true });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-emerald-900 to-green-900 flex flex-col items-center justify-start px-4 py-8 sm:py-12"
    >
      {/* Header - Bienvenida */}
      <div className="w-full max-w-4xl flex justify-end mb-6 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
          <FaSignOutAlt />
        </button>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8 sm:mb-12 flex flex-col items-center gap-4"
      >
        {/* Logo */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
          <img
            src={cancha?.logo || "/default-logo.png"}
            alt="Logo de la cancha"
            className="rounded-full object-cover w-full h-full"
          />
        </div>

        {/* Mensaje de bienvenida */}
        <div>
          <p className="text-xl text-emerald-300 font-medium mb-1">
            Hola, {cancha?.propietario_nombre || "Propietario"} 👋
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-100 bg-clip-text text-transparent">
            Panel de Gestión
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Cancha:{" "}
            <span className="font-medium text-gray-200 uppercase">
              {cancha?.nombre || "Tu cancha"}
            </span>
          </p>
        </div>
      </motion.header>

      {/* Tarjetas de Acción */}
      <div className="w-full max-w-4xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.5 }}
  >
    <Link to="/verturnos" state={{ cancha }} className="group block">
      <div className="flex h-full justify-between p-5 sm:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-emerald-700/30 hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-emerald-500/20">
        <div className="flex justify-between items-center gap-4">
          <div className="bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
            <FcCalendar className="text-3xl" />
          </div>
          <span className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
            Ver Turnos
          </span>

        </div>
        <div className="text-emerald-300 group-hover:text-emerald-100 transition-colors text-right text-lg lg:hidden">
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
    <Link to="/agregarturno" state={{ cancha }} className="group block">
      <div className="flex h-full justify-between p-5 sm:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-blue-700/30 hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-blue-500/20">
        <div className="flex justify-betwee items-center gap-4">
          <div className="bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
            <FcPlus className="text-3xl" />
          </div>
          <span className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
            Agregar Turnos
          </span>
        </div>
        <div className="text-blue-300 group-hover:text-blue-100 transition-colors text-right lg:hidden">
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
    <Link to="/micuenta" state={{ cancha }} className="group block">
      <div className="flex h-full justify-between p-5 sm:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-gray-700/30 hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-gray-500/20">
        <div className="flex justify-between items-center gap-4">
          <div className="bg-gray-500/20 rounded-lg group-hover:bg-gray-500/30 transition-colors">
            <IoSettingsSharp className="text-3xl text-gray-300" />
          </div>
          <span className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
            Mi Cuenta
          </span>
        </div>
        <div className="text-gray-300 group-hover:text-gray-100 transition-colors text-right lg:hidden">
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
        className="mt-12 text-center text-sm text-gray-400 max-w-md px-4"
      >
        <p>
          ¿Necesitas ayuda?{" "}
          <span className="text-emerald-400 font-medium hover:text-emerald-200 cursor-pointer transition-colors">
            Contacta a nuestro soporte
          </span>
        </p>
      </motion.div>
    </motion.section>
  );
};