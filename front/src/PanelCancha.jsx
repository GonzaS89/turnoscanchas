import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const PanelCancha = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha; // Obtenés los datos pasados desde el login

  const [turnos, setTurnos] = useState([]);
  const [turnosAgrupados, setTurnosAgrupados] = useState({});
  const [fechaVisible, setFechaVisible] = useState({}); // Para controlar el estado desplegable

  useEffect(() => {
    if (cancha?.id) {
      axios
        .get(`http://localhost:3001/api/turnos_canchas/canchas?id=${cancha.id}`)
        .then((res) => {
          const turnosOrdenados = res.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenamos los turnos por fecha más reciente
          setTurnos(turnosOrdenados);
        })
        .catch((err) => console.error("Error al obtener turnos:", err));
    }
  }, [cancha]);

  useEffect(() => {
    // Agrupamos los turnos por fecha
    const agrupados = turnos.reduce((acumulado, turno) => {
      const fecha = turno.fecha.split("T")[0]; // Suponiendo que la fecha está en formato ISO
      if (!acumulado[fecha]) {
        acumulado[fecha] = [];
      }
      acumulado[fecha].push(turno);
      return acumulado;
    }, {});
    setTurnosAgrupados(agrupados);
  }, [turnos]);

  const cerrarSesion = () => navigate("/");

  // Función para alternar la visibilidad de cada grupo de turnos por fecha
  const toggleFechaVisibility = (fecha) => {
    setFechaVisible((prevState) => ({
      ...prevState,
      [fecha]: !prevState[fecha], // Cambia el estado de visibilidad de la fecha
    }));
  };

  const ponerDisponible = async (turnoId) => {
    try {
      await axios.put(`http://localhost:3001/api/turnos_canchas/liberar`, {
        id: turnoId
      });
  
      // Actualizamos el estado local sin recargar
      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === turnoId
            ? {
                ...turno,
                estado: "disponible",
                nombre: null,
                dni: null
              }
            : turno
        )
      );
    } catch (error) {
      console.error("Error al poner disponible:", error);
    }
  };
  

  return (
    <section className="min-h-screen w-full py-6 px-4 bg-gradient-to-b from-white via-green-50 to-green-200 flex flex-col items-center">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700 uppercase">Gestion de turnos</h1>
        {/* <button
          onClick={cerrarSesion}
          className="text-sm text-white bg-red-500 py-4 w-32"
        >
          Cerrar sesión
        </button> */}
      </header>

      <div className="bg-white rounded-xl p-6 shadow-xl w-full mt-8 border-t-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Turnos del día</h2>
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
                </button> x
              </div>
              {fechaVisible[fecha] && ( 
               <ul className="space-y-4 mt-4">
  {turnosPorFecha.map((turno) => (
    <li
      key={turno.id}
      className={`p-6 border rounded-2xl flex flex-col justify-between items-center gap-4 shadow-lg border-l-8 ${
        turno.estado === 'disponible' ? 'bg-green-50  border-l-green-500' : 'bg-red-50 border-l-red-500'
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <span className="text-xl font-bold text-gray-800">
          {turno.hora.split(":").slice(0, 2).join(":")} HS
        </span>
        {turno.nombre && (
          <span className="text-sm text-center text-gray-600 uppercase">Reservado por: <br /> {turno.nombre} <br />{turno.dni} <br />{turno.telefono}</span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`text-sm font-bold uppercase ${
            turno.estado === 'reservado' ? 'text-red-500' : 'text-green-600'
          }`}
        >
          {turno.estado === 'disponible' ? 'disponible' : ''}
        </span>

        {turno.estado === 'reservado' && (
          <button
            onClick={() => ponerDisponible(turno.id)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-md shadow transition uppercase"
          >
            Liberar
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
