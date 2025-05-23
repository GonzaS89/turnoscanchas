import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcCalendar, FcPlus } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";

export const PanelCancha = () => {
  const location = useLocation();
  const cancha = location.state?.cancha;
  const [vista, setVista] = useState("");

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-green-100 px-4 py-10 flex flex-col items-center">
      {/* Título */}
      <header className="text-center mb-10 flex flex-col items-center gap-12">
        <p className="text-xl text-green-800 font-medium mb-2 capitalize">
          Hola, {cancha?.propietario_nombre || "propietario"} 👋
        </p>
        <h1 className="text-3xl font-bold text-green-700 uppercase text-center tracking-wide">
          Gestión de cancha <br /> 
          <span className="text-xs text-gray-500">cancha: {cancha?.nombre || "tu cancha"}</span>
        </h1>
      </header>

      {/* Botones de acción */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Ver Turnos */}
        <Link to="/verturnos" state={{ cancha }}>
          <button
            onClick={() => setVista("verTurnos")}
            className="w-full flex items-center justify-between p-6 rounded-2xl bg-white hover:bg-green-100 border border-green-300 shadow transition"
          >
            <FcCalendar className="text-5xl" />
            <span className="text-lg font-semibold text-green-800 uppercase w-3/4 text-right">
              Ver turnos
            </span>
          </button>
        </Link>

        {/* Agregar Turnos */}
        <Link to="/agregarturno" state={{ cancha }}>
          <button
            onClick={() => setVista("agregarTurno")}
            className="w-full flex items-center justify-between p-6 rounded-2xl bg-white hover:bg-blue-100 border border-blue-300 shadow transition"
          >
            <FcPlus className="text-5xl" />
            <span className="text-lg font-semibold text-blue-800 uppercase w-3/4 text-right">
              Agregar turnos
            </span>
          </button>
        </Link>

        {/* Mi Cuenta */}
        <Link to="/" state={{ cancha }}>
          <button
            onClick={() => setVista("miCuenta")}
            className="w-full flex items-center justify-between p-6 rounded-2xl bg-white hover:bg-gray-100 border border-gray-300 shadow transition"
          >
            <IoSettingsSharp className="text-5xl text-gray-600" />
            <span className="text-lg font-semibold text-gray-800 uppercase w-3/4 text-right">
              Mi cuenta
            </span>
          </button>
        </Link>

      </div>
    </section>
  );
};
