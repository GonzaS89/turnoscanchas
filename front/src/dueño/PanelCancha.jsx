import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export const PanelCancha = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const [vista, setVista] = useState(""); // Para determinar qué vista mostrar después

//   const cerrarSesion = () => navigate("/");

  return (
    <section className="min-h-screen w-full justify-around py-10 px-6 bg-gradient-to-b from-white via-green-50 to-green-200 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-green-700 uppercase text-center">Panel de {cancha?.nombre}</h1>
        {/* <button
          onClick={cerrarSesion}
          className="text-sm bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button> */}
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to={'/verturnos'} state= {{cancha}}>
            <button
          onClick={() => setVista("verTurnos")}
          className="w-full bg-white hover:bg-green-100 border-2 border-green-300 p-6 rounded-2xl shadow text-green-900 font-semibold text-lg transition"
        >
          📅 Ver Turnos
        </button>
            </Link>
       
<Link to={'/agregarturno'} state={{cancha}}>
<button
          onClick={() => setVista("agregarTurno")}
          className="w-full bg-white hover:bg-blue-100 border-2 border-blue-300 p-6 rounded-2xl shadow text-blue-900 font-semibold text-lg transition"
        >
          ➕ Agregar Turno
        </button>
</Link>
       

        {/* <button
          onClick={() => setVista("buscar")}
          className="bg-white hover:bg-purple-100 border-2 border-purple-300 p-6 rounded-2xl shadow text-purple-900 font-semibold text-lg transition"
        >
          🔍 Buscar Turno
        </button>

        <button
          onClick={() => setVista("estadisticas")}
          className="bg-white hover:bg-yellow-100 border-2 border-yellow-300 p-6 rounded-2xl shadow text-yellow-900 font-semibold text-lg transition"
        >
          📊 Ver Estadísticas
        </button>

        <button
          onClick={() => setVista("config")}
          className="bg-white hover:bg-gray-100 border-2 border-gray-300 p-6 rounded-2xl shadow text-gray-700 font-semibold text-lg transition"
        >
          ⚙️ Configuración
        </button> */}
      </div>

      {/* Podés ir mostrando el componente que quieras según la vista seleccionada */}
      {/* {vista === "verTurnos" && <ComponenteVerTurnos cancha={cancha} />} */}
    </section>
  );
};
