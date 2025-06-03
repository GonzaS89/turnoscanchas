import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FcCalendar, FcPlus } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";

export default function PanelCancha() {
  const location = useLocation();
  const navigate = useNavigate();
  const cancha = location.state?.cancha;
  const [vista, setVista] = useState("");

  const handleLogout = () => {
    // Lógica para cerrar sesión
    navigate("/", { replace: true });
  };

  return (
    <section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-white text-gray-800 flex flex-col items-center justify-start px-4 py-8 sm:py-12"
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

      <header
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
          <p className="text-xl text-emerald-700 font-medium mb-1">
            Hola, {cancha?.propietario_nombre || "Propietario"} 👋
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            Panel de Gestión
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Cancha:{" "}
            <span className="font-medium text-gray-700 uppercase">
              {cancha?.nombre || "Tu cancha"}
            </span>
          </p>
        </div>
      </header>

      {/* Tarjetas de Acción */}
      <div className="w-full max-w-4xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link to="/verturnos" state={{ cancha }} className="group block">
            <div className="flex flex-col justify-between h-full p-5 sm:p-6 rounded-xl bg-white border border-emerald-200 hover:bg-emerald-50/70 transition-all duration-300 shadow-md hover:shadow-emerald-200/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <FcCalendar className="text-3xl text-emerald-600" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  Ver Turnos
                </span>
              </div>
              <div className="text-emerald-500 group-hover:text-emerald-700 transition-colors mt-2 text-right hidden lg:block">
                →
              </div>
            </div>
          </Link>
        </div>

        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/agregarturno" state={{ cancha }} className="group block">
            <div className="flex flex-col justify-between h-full p-5 sm:p-6 rounded-xl bg-white border border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-blue-200/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FcPlus className="text-3xl text-blue-600" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  Agregar Turnos
                </span>
              </div>
              <div className="text-blue-500 group-hover:text-blue-700 transition-colors mt-2 text-right hidden lg:block">
                →
              </div>
            </div>
          </Link>
        </div>

        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link to="/micuenta" state={{ cancha }} className="group block">
            <div className="flex flex-col justify-between h-full p-5 sm:p-6 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-gray-200/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <IoSettingsSharp className="text-3xl text-gray-600" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-700 transition-colors">
                  Mi Cuenta
                </span>
              </div>
              <div className="text-gray-500 group-hover:text-gray-700 transition-colors mt-2 text-right hidden lg:block">
                →
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Información adicional */}
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 text-center text-sm text-gray-500 max-w-md px-4"
      >
        <p>
          ¿Necesitas ayuda?{" "}
          <span className="text-emerald-600 font-medium hover:text-emerald-700 cursor-pointer transition-colors">
            Contacta a nuestro soporte
          </span>
        </p>
      </div>
    </section>
  );
}