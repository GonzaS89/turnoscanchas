import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const AgregarTurno = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const [horarios, setHorarios] = useState([""]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Promise.all(
        horarios.map((hora) =>
          axios.post("https://turnoscanchas.onrender.com/api/turnos_canchas", {
            hora,
            cancha_id: cancha.id,
            estado: "disponible"
          })
        )
      );

      alert("Turnos agregados correctamente");
      navigate(-1);
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition uppercase tracking-wider"
          >
            Guardar Turnos
          </button>
        </form>
      </div>
    </section>
  );
};
