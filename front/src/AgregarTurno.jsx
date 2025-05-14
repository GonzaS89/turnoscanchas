import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const AgregarTurno = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const [hora, setHora] = useState("");

  useEffect(() => {
    if (!cancha) {
      alert("No se encontró la cancha. Volviendo al panel.");
      navigate(-1);
    }
  }, [cancha, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/turnos_canchas", {
        hora,
        cancha_id: cancha.id,
        estado: "disponible"
      });

      alert("Turno agregado correctamente");
    //   navigate(-1);
    } catch (error) {
      console.error("Error al agregar turno:", error);
      alert("Hubo un error al guardar el turno");
    }

    setHora('')
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-green-50 py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Agregar Turno
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Hora</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition"
          >
            Guardar Turno
          </button>
        </form>
      </div>
    </section>
  );
};
