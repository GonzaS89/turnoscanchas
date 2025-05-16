import { Link } from "react-router-dom";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";

export const ReservaDeTurno = ({ id, enviarIdTurno }) => {
  const { datos: canchas } = useCanchas();
  const cancha = canchas.find((item) => item.id === id);
  const { turnos } = useObtenerTurnosxCancha(cancha?.id);

  // useEffect(() => {
  //   console.log(turnos)
  // },[turnos])

  
  const fechaHoy = new Date().toLocaleDateString("sv-SE"); // "YYYY-MM-DD"

  const turnosDeHoy = turnos?.filter((turno) => {
    const fechaTurno = turno.fecha.split("T")[0]; // también "YYYY-MM-DD"
    return fechaTurno === fechaHoy;
  }).sort((a, b) => {
    // Convertir las horas en minutos desde las 00:00 para hacer una comparación correcta
    const getMinutos = (horaStr) => {
      const [hora, minutos] = horaStr.split(":").map(Number);
      return hora === 0 ? 1440 : hora * 60 + minutos; // 1440 minutos para las 00:00
    };
  
    const minutosA = getMinutos(a.hora);
    const minutosB = getMinutos(b.hora);
  
    return minutosA - minutosB; // Ordenar de menor a mayor
  });
  


  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const día = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${día}`;
  };

  const formatearHora = (horaStr) => horaStr.slice(0, 5);

  // Filtrar turnos que coincidan con la fecha de hoy
  

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8 bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-center text-green-700 tracking-tight drop-shadow-sm">
          Elegí tu Turno ⚽
        </h1>
        {cancha && (
          <p className="text-center text-sm text-gray-500 mt-1 uppercase">
            Cancha: <span className="font-medium">{cancha.nombre}</span>
          </p>
        )}
      </header>

      {turnosDeHoy ? (
        <div className="flex flex-col gap-4 py-4 h-[500px] overflow-scroll">
          {turnosDeHoy.length === 0 ? (
            <p className="text-center text-lg text-gray-600">
              No hay turnos disponibles para hoy.
            </p>
          ) : (
            turnosDeHoy.map((turno) => (
              <Link
                to={"/confirmaciondeturno"}
                key={turno.id}
                className="w-full"
              >
                <button
                  disabled={turno.estado === "reservado"}
                  onClick={() => enviarIdTurno(turno.id)}
                  className={`
    group flex items-center justify-between w-full px-6 py-5 rounded-2xl shadow-md
    transition-all duration-200 ease-in-out transform
    ${
      turno.estado === "reservado"
        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
        : "bg-white text-green-700 hover:bg-green-100 hover:shadow-lg active:scale-95"
    }
  `}
                >
                  {/* Emoji con animación si está disponible */}
                  <span
                    className={`
      text-3xl transition-transform duration-200 
      ${turno.estado === "reservado" ? "" : "group-hover:scale-110"}
    `}
                  >
                    {turno.estado === "reservado" ? "❌" : "🟢"}
                  </span>

                  {/* Contenido */}
                  <div className="flex flex-col text-right ml-auto">
                    <p
                      className={`
        text-3xl font-extrabold tracking-tight 
        ${turno.estado === "reservado" ? "text-gray-600" : "text-green-800"}
      `}
                    >
                      {formatearHora(turno.hora)}
                    </p>
                    <p
                      className={`
        text-xs font-semibold uppercase tracking-wider 
        ${turno.estado === "reservado" ? "text-gray-500" : "text-green-600"}
      `}
                    >
                      {turno.estado === "reservado"
                        ? "Reservado"
                        : "Disponible"}
                    </p>
                  </div>
                </button>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};
