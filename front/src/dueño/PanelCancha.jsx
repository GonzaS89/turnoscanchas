import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";;
import { FaSignOutAlt } from "react-icons/fa";
import { SeccionPanelCancha } from "./components/SeccionPanelCancha";

export default function PanelCancha() {
  const location = useLocation();
  const navigate = useNavigate();
  const cancha = location.state?.cancha;
  const [vista, setVista] = useState("");

  const handleLogout = () => {
    // Lógica para cerrar sesión
    navigate("/", { replace: true });
  };

  const secciones = [
    { seccion: "/verturnos", titulo: "Ver Turnos" },
    { seccion: "/agregarturno", titulo: "Agregar Turnos" },
    { seccion: "/micuenta", titulo: "Mi Cuenta" },
  ];


  return (
    <section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full text-gray-800 flex flex-col items-center justify-start px-4 py-8 sm:py-12"
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
        <div className="w-20 h-20 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
          <img
            src={cancha?.logo || "/default-logo.png"}
            alt="Logo de la cancha"
            className="rounded-full object-cover w-full h-full"
          />
        </div>

        {/* Mensaje de bienvenida */}
        <div className="flex flex-col gap-4">
          <p className="text-xl lg:text-2xl xl:text-3xl text-emerald-700 font-medium mb-1">
            Hola, {cancha?.propietario_nombre || "Propietario"} 👋
          </p>
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            Panel de Gestión
          </h1>
          <p className="text-sm md:text-base xl:text-xl text-gray-500 mt-2">
            Cancha:{" "}
            <span className="font-medium text-gray-700 uppercase">
              {cancha?.nombre || "Tu cancha"}
            </span>
          </p>
        </div>
      </header>

      {/* Tarjetas de Acción */}
      <div className="w-full max-w-4xl px-4 grid grid-cols-1 gap-5 sm:gap-6">
        {secciones.map((item, index) => (
          <SeccionPanelCancha
            key={index}
            seccion={item.seccion}
            titulo={item.titulo}
            cancha={cancha}
          />
        ))}
      </div>
    </section>
  );
}