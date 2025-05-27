import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaPlus,
  FaTimes,
  FaArrowLeft,
  FaClock,
} from "react-icons/fa";

export const AgregarTurno = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cancha = location.state?.cancha;

  const serverExterno = "https://turnoscanchas-production.up.railway.app";

  const [horarios, setHorarios] = useState([""]);
  const [showModal, setShowModal] = useState(false);
  const [confIngresos, setConfIngresos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [horariosExistentes, setHorariosExistentes] = useState([]);

  // Obtener horarios existentes
  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${serverExterno}/api/turnos_canchas/canchas`,
          {
            params: { id: cancha.id },
          }
        );
        setHorariosExistentes(data);
      } catch (error) {
        console.error("Error al obtener horarios existentes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (cancha?.id) obtenerHorarios();
  }, [cancha]);

  // Formatear fecha actual
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Normalizar a inicio del día

  const turnosHoy = horariosExistentes
    .filter((turno) => {
      const fechaTurno = new Date(turno.fecha);
      fechaTurno.setHours(0, 0, 0, 0); // Normalizar a inicio del día
      return fechaTurno.getTime() === hoy.getTime();
    })
    .sort((a, b) => a.hora.localeCompare(b.hora));

  // Manejo de horarios
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

  // Enviar turnos
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await Promise.all(
        horarios.map((hora) =>
          axios.post(`${serverExterno}/api/turnos_canchas`, {
            hora,
            cancha_id: cancha.id,
            estado: "disponible",
          })
        )
      );

      setShowModal(true);
      setConfIngresos(false);
      setHorarios([""]);

      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      console.error("Error al agregar turnos:", error);
      alert("Error al guardar los turnos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full py-8 px-4 bg-gradient-to-b from-white via-green-50 to-green-100 flex justify-center items-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-md w-full border border-emerald-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Volver</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
            Agregar Turnos
          </h2>
          <div className="w-6"></div> {/* Spacer para alinear */}
        </div>

        {/* Info Cancha */}
        <div className="bg-emerald-50 rounded-lg p-4 mb-6 border border-emerald-100">
          <p className="text-center text-emerald-800 font-medium">
            Cancha: <span className="uppercase">{cancha?.nombre}</span>
          </p>
        </div>

        {/* Horarios existentes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaClock className="text-emerald-600" />
            Turnos para hoy:
          </h3>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : turnosHoy.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {turnosHoy.map((turno) => (
                <span
                  key={turno.id}
                  className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {turno.hora.slice(0, 5)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No hay turnos cargados para hoy.
            </p>
          )}
        </div>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {horarios.map((hora, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <input
                type="time"
                value={hora}
                onChange={(e) => handleHorarioChange(index, e.target.value)}
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {horarios.length > 1 && (
                <button
                  type="button"
                  onClick={() => eliminarCampo(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                  title="Eliminar horario"
                >
                  <FaTimes />
                </button>
              )}
            </motion.div>
          ))}

          <button
            type="button"
            onClick={agregarCampo}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium transition-colors text-sm"
          >
            <FaPlus /> Agregar otro horario
          </button>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => setConfIngresos(true)}
              disabled={horarios.some((h) => !h)}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                horarios.some((h) => !h)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white shadow-md hover:shadow-lg"
              }`}
            >
              Guardar Turnos
            </button>
          </div>
        </form>
      </motion.div>

      {/* Modal de Confirmación */}
      <AnimatePresence>
        {confIngresos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirmar turnos
              </h3>

              <p className="text-gray-600 mb-6">
                ¿Estás seguro de agregar {horarios.length}{" "}
                {horarios.length === 1 ? "turno" : "turnos"}?
              </p>

              <ul className="space-y-2 mb-6">
                {horarios.map((hora, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      {hora}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfIngresos(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    "Confirmar"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Éxito */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl p-8 text-center max-w-sm w-full"
            >
              <FaCheckCircle className="mx-auto text-5xl text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ¡Turnos agregados!
              </h3>
              <p className="text-gray-600 mb-4">
                Los turnos se han registrado correctamente.
              </p>
              <div className="h-1 bg-emerald-100 rounded-full w-full mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
