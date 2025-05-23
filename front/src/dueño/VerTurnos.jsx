import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";


export const VerTurnos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const [turnos, setTurnos] = useState([]);
  const [turnosAgrupados, setTurnosAgrupados] = useState({});
  const [fechaVisible, setFechaVisible] = useState({});

  const serverLocal = 'http://localhost:3001';
  const serverExterno = 'https://turnoscanchas-production.up.railway.app';

  const isReservado = (estado) => (estado === "reservado" || estado === "pendiente")


  useEffect(() => {
    if (cancha?.id) {
      axios
        .get(
          `${serverLocal}/api/turnos_canchas/canchas?id=${cancha.id}`
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
        `${serverLocal}/api/turnos/liberar/${turnoId}`
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

  const confirmarPendiente = async (turnoId) => {
    try {
      await axios.put(
        `${serverLocal}/api/turnos/confirmar/${turnoId}`
      );
  
      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === turnoId
            ? { ...turno, estado: "reservado" } // 🛠️ este es el fix
            : turno
        )
      );
    } catch (error) {
      console.error("Error al confirmar turno:", error);
    }
  };
  

  const eliminarTurno = async (turnoId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar este turno?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(
        `${serverLocal}/api/turnos_canchas/${turnoId}`
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
      <header className="flex justify-between items-center mb-6 w-full max-w-4xl px-2">
        <h1 className="text-2xl font-bold text-green-700 uppercase">Gestión de turnos</h1>
      </header>
  
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-4xl border-t-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Turnos por fechas
        </h2>
        {Object.keys(turnosAgrupados).length === 0 ? (
          <p className="text-gray-500 text-center">No hay turnos cargados.</p>
        ) : (
          Object.entries(turnosAgrupados).map(([fecha, turnosPorFecha]) => (
            <div key={fecha} className="mb-8">
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{fecha}</h3>
                <button
                  onClick={() => toggleFechaVisibility(fecha)}
                  className="py-2 px-5 rounded-lg shadow-md border border-gray-300 text-sm text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  {fechaVisible[fecha] ? "Ocultar" : "Mostrar"} turnos
                </button>
              </div>
  
              {fechaVisible[fecha] && (
                <ul className="space-y-5 px-2">
                  {turnosPorFecha.map((turno) => (
                    <li
                      key={turno.id}
                      className={`relative min-h-[90px] border rounded-2xl flex flex-col sm:flex-row font-poppins gap-4 shadow-md p-4 ${
                        turno.estado === "disponible"
                          ? "bg-gray-100"
                          : turno.estado === "pendiente"
                          ? "bg-yellow-100"
                          : "bg-green-200"
                      }`}
                    >
                      <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center w-full sm:w-24">
                        <span className="text-3xl font-bold text-gray-800">
                          {turno.hora.slice(0,5)} HS
                        </span>
                      </div>
  
                      <div className="flex flex-col justify-center w-full sm:w-3/4">
                        {isReservado(turno.estado) ? (
                          <div className="text-sm sm:text-base leading-snug text-gray-800">
                            <p>Reservado por: <span className="font-semibold">{turno.nombre}</span></p>
                            <p>DNI: <span className="font-semibold">{turno.dni}</span></p>
                            <p>Tel: <span className="font-semibold">{turno.telefono}</span></p>
                          </div>
                        ) : (
                          <p className="text-gray-600 text-center sm:text-left font-semibold">Disponible</p>
                        )}
                      </div>
  
                      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center sm:w-1/4">
                        {turno.estado === "reservado" && (
                          <button
                            onClick={() => ponerDisponible(turno.id)}
                            className="w-full sm:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
                          >
                            Liberar
                          </button>
                        )}
  
                        {turno.estado === "pendiente" && (
                          <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <button
                              onClick={() => confirmarPendiente(turno.id)}
                              className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => ponerDisponible(turno.id)}
                              className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
  
                        {turno.estado === "disponible" && (
                          <button
                            onClick={() => eliminarTurno(turno.id)}
                            className="py-3 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                            title="Eliminar turno"
                          >
                            <FaTrashAlt className="text-xl"/>
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
