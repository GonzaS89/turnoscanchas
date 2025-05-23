import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export const AgregarTurno = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha; 2

  const serverLocal = 'http://localhost:3001';
  const serverExterno = 'https://https://turnoscanchas-production.up.railway.app';

  const [horarios, setHorarios] = useState([""]);
  const [showModal, setShowModal] = useState(false);
  const [confIngresos, setConfIngresos] = useState(false);

  const handleHorarioChange = (index, value) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index] = value;
    setHorarios(nuevosHorarios);
  };

  const agregarCampo = () => setHorarios([...horarios, ""]);

  const eliminarCampo = (index) => {
    const nuevosHorarios = horarios.filter((_, i) => i !== index);
    setHorarios(nuevosHorarios);
  };

  const [horariosExistentes, setHorariosExistentes] = useState([]);

  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        const { data } = await axios.get(`${serverExterno}/api/turnos_canchas/canchas`, {
          params: { id: cancha.id }
        });
        console.log("Turnos recibidos del backend:", data);
        setHorariosExistentes(data);
      } catch (error) {
        console.error("Error al obtener horarios existentes:", error);
      }
    };

    if (cancha?.id) {
      obtenerHorarios();
    }
  }, [cancha]);


  const fechaHoy = new Date().toISOString().split("T")[0]; // Ej: "2025-05-20"

  const turnosHoy = horariosExistentes.filter((turno) => {
    const fechaTurno = turno.fecha.split("T")[0]; // "2025-05-20"
    return fechaTurno === fechaHoy;
  });


  const handleSubmit = async () => {
    try {
      await Promise.all(
        horarios.map((hora) =>
          axios.post(`${serverExterno}/api/turnos_canchas`, {
            hora,
            cancha_id: cancha.id,
            estado: "disponible"
          })
        )
      );

      setShowModal(true);
      setConfIngresos(false);
      setHorarios([""]);

      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch (error) {
      console.error("Error al agregar turnos:", error);
      alert("Error al guardar los turnos");
    }
  };



  return (
    <section className="min-h-screen w-full py-10 px-4 bg-gradient-to-b from-white via-green-50 to-green-200 flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full flex flex-col justify-around">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-4 uppercase tracking-wide">Agregar Turnos</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Cancha: <span className="uppercase font-semibold">{cancha?.nombre}</span>
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2 text-center">
            Horarios ya cargados para hoy :
          </h3>
          {turnosHoy.length > 0 ? (
            <ul className="list-disc list-inside grid grid-cols-4 gap-2 font-thin">
              {turnosHoy
                .slice()
                .sort((a, b) => a.hora.localeCompare(b.hora)) // 👈 Ordena por hora ascendente
                .map((turno) => (
                  <li
                    key={turno.id}
                    className="list-none bg-green-400 text-slate-800 font-semibold text-sm text-center py-2 px-3 rounded-xl shadow-sm tracking-wide"
                  >
                    {turno.hora.slice(0, 5)}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay horarios cargados para hoy.</p>
          )}

        </div>



        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {horarios.map((hora, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="time"
                value={hora}
                onChange={(e) => handleHorarioChange(index, e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              {horarios.length > 1 && (
                <button
                  type="button"
                  onClick={() => eliminarCampo(index)}
                  className="text-red-500 font-bold text-xl"
                  title="Eliminar horario"
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={agregarCampo}
              className="text-green-600 hover:text-green-800 font-semibold transition"
            >
              ➕ Agregar otro horario
            </button>
          </div>

          <button
            type="button"
            onClick={() => setConfIngresos(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition uppercase tracking-wider"
          >
            Guardar Turnos
          </button>
        </form>
      </div>

      {/* MODAL CONFIRMACIÓN */}
      {confIngresos && (
        <div className="w-full h-screen bg-black bg-opacity-40 backdrop-blur-sm fixed top-0 left-0 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              ¿Confirmás el ingreso de {horarios.length > 1 ? 'los siguientes turnos' : 'él siguiente turno'}?
            </h2>
            <p className="text-lg text-slate-700 font-medium break-words">
              {horarios.join(" - ")}
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={handleSubmit}
              >
                Confirmar
              </button>
              <button
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => setConfIngresos(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

      )}

      {/* MODAL ÉXITO */}
      {showModal && (
        <div className="w-full h-screen bg-black bg-opacity-50 absolute top-0 left-0 z-50 flex items-center justify-center px-4">
          <div className="bg-white flex flex-col items-center py-8 px-6 gap-8 rounded-xl shadow-xl">
            <FaCheckCircle className="text-7xl text-green-600" />
            <h2 className="text-green-600 font-light text-3xl text-center">
              {horarios.length > 1 ? 'Turnos agregados' : 'Turno agregado'} correctamente
            </h2>
          </div>
        </div>
      )}
    </section>
  );
};
