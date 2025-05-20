import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";


export const VerTurnos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  console.log(cancha.id)

  const [turnos, setTurnos] = useState([]);
  const [turnosAgrupados, setTurnosAgrupados] = useState({});
  const [fechaVisible, setFechaVisible] = useState({});

  const serverLocal = 'http://localhost:3001';
  const serverExterno = 'https://turnoscanchas-production.up.railway.app';


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
          console.log(turnosOrdenados)
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
        `${serverLocal}/api/turnos/confirmar/${turnoId}`)
        ;

      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === turnoId
            ? { ...turno, estado: "reservado", nombre: null, dni: null }
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
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700 uppercase">Gestión de turnos</h1>
      </header>

      <div className="bg-white rounded-xl p-6 shadow-xl w-full mt-8 border-t-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Turnos por fechas
        </h2>
        {Object.keys(turnosAgrupados).length === 0 ? (
          <p className="text-gray-500">No hay turnos cargados.</p>
        ) : (
          Object.entries(turnosAgrupados).map(([fecha, turnosPorFecha]) => (
            <div key={fecha} className="mb-6">
  <div className="flex justify-between items-center">
    <h3 className="text-2xl font-semibold text-gray-900">{fecha}</h3>
    <button
      onClick={() => toggleFechaVisibility(fecha)}
      className="py-2 px-4 shadow-md border-2 border-gray-300 text-sm text-gray-700 font-medium hover:bg-gray-100 transition"
    >
      {fechaVisible[fecha] ? "Ocultar" : "Mostrar"} turnos
    </button>
  </div>

  {fechaVisible[fecha] && (
    <ul className="space-y-4 mt-5">
      {turnosPorFecha.map((turno) => (
        <li
          key={turno.id}
          className={`relative overflow-hidden min-h-24 border rounded-2xl flex flex-col justify-center items-center gap-4 shadow-md px-4 py-2 ${
            turno.estado === "disponible"
              ? "bg-gray-50"
              : turno.estado === "pendiente"
              ? "bg-yellow-100"
              : "bg-red-100"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
            <span className="text-lg font-bold text-gray-800">
              {turno.hora.split(":").slice(0, 2).join(":")} HS
            </span>

            {turno.nombre && (
              <div className="text-center text-sm text-gray-700 leading-snug">
                <p className="font-semibold">Reservado por:</p>
                <p className="text-base font-medium text-gray-900">{turno.nombre}</p>
                <p>DNI: <span className="font-medium">{turno.dni}</span></p>
                <p>Tel: <span className="font-medium">{turno.telefono}</span></p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {turno.estado === "reservado" && (
              <button
                onClick={() => ponerDisponible(turno.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-md shadow transition uppercase"
              >
                Liberar
              </button>
            )}

            {turno.estado === "pendiente" && (
              <div className="flex flex-col gap-2">
                <button
                  className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg"
                  onClick={() => confirmarPendiente(turno.id)}
                >
                  Confirmar
                </button>
                <button
                  className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg"
                  onClick={() => ponerDisponible(turno.id)}
                >
                  Liberar
                </button>
              </div>
            )}

            {turno.estado === "disponible" && (
              <button
                onClick={() => eliminarTurno(turno.id)}
                className="absolute h-full bg-red-600 top-0 right-0 px-3"
                title="Eliminar turno"
              >
                <FaTrashAlt className="text-xl text-white" />
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
