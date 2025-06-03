import { Link, useLocation, useParams } from "react-router-dom";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";
import { FaFutbol, FaClock } from "react-icons/fa";

export default function ReservaDeTurno() {
  const location = useLocation();
  const { seccioncancha: seccion } = useParams();
  const { idCancha: id } = location.state || {};
  const { datos: canchas, isLoading: loadingCancha } = useCanchas();
  const cancha = canchas.find((item) => item.seccion === seccion);
  const { turnos, isLoading, error } = useObtenerTurnosxCancha(cancha?.id);

  const fechaHoy = new Date().toLocaleDateString("sv-SE"); // formato YYYY-MM-DD

  // Función para ordenar los turnos por hora
  const ordenarTurnos = (turnos) => {
    return (
      turnos?.sort((a, b) => {
        const getMinutos = (horaStr) => {
          const [hora, minutos] = horaStr.split(":").map(Number);
          return hora === 0 ? 1440 : hora * 60 + minutos;
        };
        return getMinutos(a.hora) - getMinutos(b.hora);
      }) || []
    );
  };

  const turnosDeHoy = ordenarTurnos(
    turnos?.filter((turno) => turno.fecha.split("T")[0] === fechaHoy)
  );

  const formatearHora = (horaStr) => horaStr.slice(0, 5);

  return (
    <section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-emerald-900 to-green-900 flex flex-col items-center justify-around py-6 px-4"
    >
      {/* Header con banner */}
      <header className="w-full max-w-4xl mx-auto mb-6">
        <div className="relative h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden shadow-lg">
          {/* Imagen de portada */}
          <div className="absolute inset-0">
            {cancha?.portada ? (
              <img
                src={cancha.portada}
                alt={`Portada de ${cancha.nombre}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-emerald-700 to-green-800"></div>
            )}
            {/* Overlay blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>

          {/* Contenido centrado */}
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6">
            {/* Logo y datos izquierda */}
            <div className="flex items-center gap-3 sm:gap-4 z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-lg overflow-hidden flex-shrink-0">
                {cancha?.logo ? (
                  <img
                    src={cancha.logo}
                    alt={`Logo de ${cancha.nombre}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-500 flex items-center justify-center">
                    <FaFutbol className="text-white text-xl sm:text-2xl" />
                  </div>
                )}
              </div>
              <div className="text-white">
                <h2 className="text-xl sm:text-2xl font-extrabold capitalize tracking-wide">
                  {cancha?.nombre || "Cancha"}
                </h2>
                <p className="text-xs sm:text-sm text-white/90 mt-1 flex items-center gap-2">
                  <span>📍</span>
                  {cancha?.direccion ? `${cancha.direccion} - ` : ""}
                  {cancha?.localidad || "Localidad no disponible"}
                </p>
                <p className="text-xs text-emerald-200 mt-1 flex items-center gap-2">
                  <span>💰</span>
                  Precio por turno: $ {cancha?.tarifa1 || "N/A"}{" "}
                  {cancha?.tarifa2 && <>- $ {cancha.tarifa2}</>}
                </p>
              </div>
            </div>

            {/* Información adicional (solo en desktop) */}
            <div className="hidden sm:flex flex-col items-end text-right text-white/90 text-xs">
              <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {cancha?.tipo || "Césped natural"}
              </span>
              <span className="mt-1">Capacidad: {cancha?.capacidad || 10} jugadores</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center pb-6">
        {loadingCancha || isLoading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-emerald-400 border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200 text-center max-w-md w-full">
            Hubo un error al cargar los turnos. Vuelva a intentarlo.
          </div>
        ) : turnosDeHoy.length === 0 ? (
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white/5 backdrop-blur-md rounded-xl shadow-md p-6 text-center border border-gray-700 w-full max-w-md"
          >
            <FaClock className="mx-auto text-3xl text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-300 mb-1">No hay turnos disponibles</h3>
            <p className="text-gray-500">No hay turnos cargados para hoy en esta cancha.</p>
          </div>
        ) : (
          <>
            {/* Título de disponibilidad */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 mb-6 border border-emerald-800/30 w-full max-w-4xl">
              <p className="text-center text-sm text-emerald-200 font-medium">
                Turnos disponibles para hoy
              </p>
            </div>

            {/* Lista de turnos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {turnosDeHoy.map((turno) => (
                <div
                  key={turno.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    mass: 0.5,
                  }}
                  className="w-full"
                >
                  <Link
                    to={turno.estado === "disponible" ? "/confirmaciondeturno" : "#"}
                    state={{ idCancha: cancha?.id, idTurno: turno.id }}
                    className={`block w-full p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg ${
                      turno.estado === "disponible"
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-white/10"
                    } border border-gray-700/50 backdrop-blur-md`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div
                          animate={{
                            scale: [1, 1.05, 1],
                            transition: { repeat: Infinity, duration: 2 },
                          }}
                          className={`p-2 sm:p-3 rounded-lg ${
                            turno.estado === "disponible"
                              ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/30"
                              : "bg-gradient-to-br from-gray-500 to-gray-600 text-gray-100 shadow-md shadow-gray-500/20"
                          }`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="text-white"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div>
                          <span
                            className={`text-lg sm:text-xl font-bold ${
                              turno.estado === "disponible"
                                ? "text-white"
                                : "text-gray-300"
                            }`}
                          >
                            {formatearHora(turno.hora)} hs
                          </span>
                          <p
                            className={`text-xs mt-1 ${
                              turno.estado === "disponible"
                                ? "text-emerald-300"
                                : "text-gray-400"
                            }`}
                          >
                            {turno.estado === "disponible"
                              ? "Disponible ahora"
                              : "Turno ocupado"}
                          </p>
                        </div>
                      </div>

                      <div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg ${
                          turno.estado === "disponible"
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-md shadow-emerald-500/30"
                            : "bg-gradient-to-r from-gray-500 to-gray-600 shadow-md shadow-gray-500/20"
                        } text-white font-semibold uppercase tracking-wider text-xs sm:text-sm`}
                      >
                        {turno.estado === "disponible" ? "Reservar" : "Ocupado"}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </section>
  );
}