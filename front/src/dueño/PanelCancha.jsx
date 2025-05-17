import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcCalendar } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";

export const PanelCancha = () => {
  const location = useLocation();
  const cancha = location.state?.cancha;

  console.log(cancha);

  const [vista, setVista] = useState(""); // Para determinar qué vista mostrar después

  //   const cerrarSesion = () => navigate("/");

  return (
    <section className="min-h-screen w-full justify-around py-10 px-6 bg-gradient-to-b from-white via-green-50 to-green-200 flex flex-col items-center relative">
      <p className="absolute top-0 text-white text-center py-4 w-full bg-green-600 bg-opacity-60">¡Bienvenido {cancha.propietario_nombre}!</p>
      <header className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-green-700 uppercase text-center w-full">
          Panel de gestión
        </h1>
      </header>

      <div className="w-full max-w-4xl flex flex-col gap-4">
        <Link to={"/verturnos"} state={{ cancha }}>
          <button
            onClick={() => setVista("verTurnos")}
            className=" w-full bg-white hover:bg-green-100 border-2 border-green-300 p-6 rounded-2xl shadow text-green-900 font-semibold text-lg transition flex items-center justify-between"
          >
            <FcCalendar className="text-5xl"/>
            <p className="w-3/4 uppercase">Ver turnos</p>
          </button>
        </Link>

        <Link to={"/agregarturno"} state={{ cancha }}>
          <button
            onClick={() => setVista("agregarTurno")}
            className="w-full bg-white hover:bg-blue-100 border-2 border-blue-300 p-6 rounded-2xl shadow text-blue-900 font-semibold text-lg transition flex items-center justify-between"
          >
            <FcPlus className="text-5xl"/>
            <p className="w-3/4 uppercase">Agregar turnos</p>
          </button>
        </Link>
      </div>

      {/* Podés ir mostrando el componente que quieras según la vista seleccionada */}
      {/* {vista === "verTurnos" && <ComponenteVerTurnos cancha={cancha} />} */}
    </section>
  );
};
