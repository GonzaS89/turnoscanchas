import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export const AgregarTurno = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

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

  const handleSubmit = async () => {
    try {
      await Promise.all(
        horarios.map((hora) =>
          axios.post(`${serverLocal}/api/turnos_canchas`, {
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
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-4 uppercase tracking-wide">Agregar Turnos</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Cancha: <span className="uppercase font-semibold">{cancha?.nombre}</span>
        </p>

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
        <div className="w-full h-screen bg-black bg-opacity-50 absolute top-0 left-0 z-50 flex items-center justify-center px-4">
          <div className="bg-white py-6 px-6 rounded-xl flex flex-col items-center gap-4 shadow-xl">
            <h2 className="text-center text-xl text-gray-700">
              ¿Confirmás el ingreso de {horarios.length > 1 ? 'los siguientes turnos' : 'el siguiente turno'}?
            </h2>
            <p className="text-lg text-slate-800 font-bold">{horarios.join(" - ")}</p>
            <div className="flex gap-4 mt-4">
              <button
                className="py-2 px-4 text-white bg-green-700 hover:bg-green-800 rounded"
                onClick={handleSubmit}
              >
                Confirmar
              </button>
              <button
                className="py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded"
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
