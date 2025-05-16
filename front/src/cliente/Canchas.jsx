import { Link } from 'react-router-dom';
import {useCanchas} from '../customHooks/useCanchas'
// import { useTodosLosTurnos } from '../customHooks/useTodosLosTurnos';

export const Canchas = ({ idCancha }) => {
  const { datos: canchas } = useCanchas();
  // const contarDisponibles = (canchaId) =>
  //   turnos.filter(
  //     (t) => t.cancha_id === canchaId && t.estado === "disponible"
  //   ).length;

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-around bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <header className="mb-6 text-center max-w-md">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow-sm">
          Elegí tu Cancha
        </h1>
        <p className="text-gray-500 mt-1">Seleccioná una cancha para reservar tu turno</p>
      </header>

      {/* Contenedor que encuadra las canchas */}
      <div className="w-full max-w-md rounded-3xl shadow-lg  p-4">
        <div className="flex flex-col gap-4">
          {canchas.map((cancha) => (
            <Link
              key={cancha.id}
              to="/reservadeturno"
              state={{ idCancha: cancha.id }}
              className="flex items-center gap-4 rounded-2xl p-4 shadow-md hover:shadow-lg bg-white hover:bg-green-100 transition-all duration-200 active:scale-95 group"
              onClick={() => idCancha(cancha.id)}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-300 shadow-sm">
                <img
                  src={cancha.logo}
                  alt={`Logo de ${cancha.nombre}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800 group-hover:text-green-800 transition capitalize">
                  {cancha.nombre}
                </p>
                <p className="text-xs text-gray-500">Toque para reservar</p>
              </div>

              <div className="text-green-600 text-xl font-bold">→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
