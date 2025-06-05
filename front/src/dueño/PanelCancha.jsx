import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaCalendarAlt,
  FaRegClock,
  FaUserCog,
} from "react-icons/fa";
import { SeccionPanelCancha } from "./components/SeccionPanelCancha";

export default function PanelCancha() {
  const location = useLocation();
  const navigate = useNavigate();
  const cancha = location.state?.cancha;

  const handleLogout = () => {
    // Lógica para cerrar sesión
    navigate(-1);
  };

  const secciones = [
    { seccion: "/verturnos", titulo: "Ver Turnos", icono: <FaCalendarAlt /> },
    {
      seccion: "/agregarturno",
      titulo: "Agregar Turnos",
      icono: <FaRegClock />,
    },
    { seccion: "/micuenta", titulo: "Mi Cuenta", icono: <FaUserCog /> },
  ];

  return (
    <section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full text-gray-800 flex flex-col items-center justify-start px-4 py-6 sm:py-12"
    >
      {/* Header - Cerrar sesión */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-red-500 bg-transparent px-3 py-1.5 rounded-lg transition-all duration-200 group focus:outline-none"
          aria-label="Cerrar sesión"
        >
          <FaSignOutAlt className="text-gray-400 group-hover:text-red-500 transition-colors" />
          <span>Cerrar sesión</span>
        </button>
      </div>

      {/* Mensaje de bienvenida */}
      <header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8 sm:mb-12 flex flex-col items-center gap-5"
      >
        {/* Logo circular */}
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 p-[2px] shadow-xl">
          <img
            src={cancha?.logo || "/default-logo.png"}
            alt="Logo de la cancha"
            className="rounded-full object-cover w-full h-full"
          />
        </div>

        {/* Título */}
        <div className="flex flex-col gap-3">
          <p className="text-xl sm:text-2xl text-emerald-700 font-semibold mb-1">
            Hola, {cancha?.propietario_nombre || "Propietario"} 👋
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            Panel de Gestión
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Cancha:{" "}
            <span className="font-medium text-gray-700 uppercase">
              {cancha?.nombre || "Tu cancha"}
            </span>
          </p>
        </div>
      </header>

      {/* Tarjetas de Acción */}
      <div className="w-full max-w-4xl grid grid-cols-1 gap-5 sm:gap-6 px-2 sm:px-4">
        {secciones.map((item, index) => (
          <SeccionPanelCancha
            key={index}
            seccion={item.seccion}
            titulo={item.titulo}
            cancha={cancha}
            icono={item.icono}
          />
        ))}
      </div>
    </section>
  );
}
