import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const VerTurnos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const [turnos, setTurnos] = useState([]);
  const [turnosAgrupados, setTurnosAgrupados] = useState({});
  const [fechaVisible, setFechaVisible] = useState({});

  useEffect(() => {
    if (cancha?.id) {
      axios
        .get(
          `https://turnoscanchas-production.up.railway.app/api/turnos_canchas/canchas?id=${cancha.id}`
        )
        .then((res) => {
          const turnosOrdenados = res.data.sort(
            (a, b) => new Date(b.fecha) - new Date(a.fecha)
          );
          setTurnos(turnosOrdenados);
        })
        .catch((err) => console.error("Error al obtener turnos:", err));
    }
  }, [cancha]);

  useEffect(() => {
    const agrupados = turnos.reduce((acumulado, turno) => {
      const fecha = turno.fecha.split("T")[0];
      if (!acumulado[fecha]) {
        acumulado[fecha] = [];
      }
      acumulado[fecha].push(turno);
      return acumulado;
    }, {});

    Object.keys(agrupados).forEach((fecha) => {
      agrupados[fecha] = agrupados[fecha]
        .map((t) => ({ ...t, hora: t.hora.slice(0, 5) })) // limpiar segundos
        .sort((a, b) => {
          const horaA = a.hora === "00:00" ? "24:00" : a.hora;
          const horaB = b.hora === "00:00" ? "24:00" : b.hora;
          return horaA.localeCompare(horaB);
        });
    });

    setTurnosAgrupados(agrupados);
  }, [turnos]);

  const cerrarSesion = () => navigate("/");

  const toggleFechaVisibility = (fecha) => {
    setFechaVisible((prevState) => ({
      ...prevState,
      [fecha]: !prevState[fecha],
    }));
  };

  const ponerDisponible = async (turnoId) => {
    try {
      await axios.put(
        `https://turnoscanchas-production.up.railway.app/api/turnos_canchas/liberar`,
        { id: turnoId }
      );

      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === turnoId
            ? { ...turno, estado: "disponible", nombre: null, dni: null }
            : turno
        )
      );
    } catch (error) {
      console.error("Error al poner disponible:", error);
    }
  };

  const eliminarTurno = async (turnoId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar este turno?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(
        `https://turnoscanchas-production.up.railway.app/api/turnos_canchas/${turnoId}`
      );
      setTurnos((prevTurnos) =>
        prevTurnos.filter((turno) => turno.id !== turnoId)
      );
    } catch (error) {
      console.error("Error al eliminar turno:", error);
    }
  };

  return (
    <section className="min-h-screen w-full py-6 px-4 bg-gradient-to-b from-white via-green-50 to-green-200 flex flex-col items-center">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700 uppercase">Turnos</h1>
      </header>

      <div className="bg-white rounded-xl p-6 shadow-xl w-full mt-8 border-t-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Turnos del día
        </h2>
        {Object.keys(turnosAgrupados).length === 0 ? (
          <p className="text-gray-500">No hay turnos cargados.</p>
        ) : (
          Object.entries(turnosAgrupados).map(([fecha, turnosPorFecha]) => (
            <div key={fecha} className="mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">{fecha}</h3>
                <button
                  onClick={() => toggleFechaVisibility(fecha)}
                  className="text-green-600 hover:text-green-700"
                >
                  {fechaVisible[fecha] ? "Ocultar" : "Mostrar"} turnos
                </button>
              </div>
              {fechaVisible[fecha] && (
                <ul className="space-y-4 mt-4">
                  {turnosPorFecha.map((turno) => (
                    <li
                      key={turno.id}
                      className={`relative p-6 border rounded-2xl flex flex-col justify-between items-center gap-4 shadow-lg border-l-8 ${
                        turno.estado === "disponible" 
                          ? "bg-green-50  border-l-green-500" 
                          : turno.estado === 'pendiente' ? 'bg-yellow-50 border-l-yellow-300'
                          : "bg-red-50 border-l-red-500"
                      }`}
                    >
                      <div className="flex flex-col justify-center items-center gap-4">
                        <span className="text-xl font-bold text-gray-800">
                          {turno.hora.split(":").slice(0, 2).join(":")} HS
                        </span>
                        {turno.nombre && (
                          <span className="text-sm text-center text-gray-600 uppercase">
                            Reservado por: <br /> {turno.nombre} <br />
                            {turno.dni} <br />
                            {turno.telefono}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 flex-wrap justify-center">
                        <span
                          className={`text-sm font-bold uppercase ${
                            turno.estado === "reservado"
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          {turno.estado === "disponible" ? "disponible" : ""}
                        </span>

                        {turno.estado === "reservado" ? (
                          <button
                            onClick={() => ponerDisponible(turno.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-md shadow transition uppercase"
                          >
                            Liberar
                          </button>
                        ) :  turno.estado === 'pendiente' &&
                        (
                            <div className="flex flex-col gap-2">
                                <button className="py-2 px-4 bg-green-400 text-gray-100 uppercase text-sm rounded-lg">Confirmar</button>
                                <button className="py-2 px-4 bg-red-500 text-gray-100 uppercase text-sm rounded-lg" onClick={() => ponerDisponible(turno.id)}>Liberar</button>
                            </div>
                        )}

                        {turno.estado === "disponible" && (
                          <button
                            onClick={() => eliminarTurno(turno.id)}
                            className="absolute top-0 right-2 text-red-500 hover:text-red-700 text-lg"
                            title="Eliminar turno"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};
