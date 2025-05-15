import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const ConfirmarTurno = ({ idCancha, idTurno }) => {
  const { datos: canchas } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha(idCancha);

  const cancha = canchas.find((cancha) => cancha.id === idCancha);
  const turno = turnos && turnos.find((turno) => turno.id === idTurno);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    dni: "",
  });
  const [isData, setIsData] = useState(false);
  const [showModal, setShowModal] = useState(false); // Para mostrar el modal de confirmación
  const [turnoConfirmado, setTurnoConfirmado] = useState(false); // Para saber si el turno fue confirmado

  const navigate = useNavigate();

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para formatear la hora
  const formatearFecha = (fechaStr) => {
    const [año, mes, día] = fechaStr.split("T")[0].split("-");
    return `${día}-${mes}`;
  };

  const formatearHora = (hora) => hora.slice(0, 5);

  // Reservar el turno mediante la API
  const reservarTurno = async () => {
    try {
      const res = await axios.put(
        `https://turnoscanchas-production.up.railway.app/api/turnos/${idTurno}`,
        {
          nombre: formData.nombre,
          telefono: formData.telefono,
          dni: formData.dni,
        }
      );

      console.log("Turno reservado correctamente", res.data);
      setTurnoConfirmado(true); // Setea que el turno ha sido confirmado
    } catch (err) {
      console.error(
        "Error al reservar turno:",
        err.response?.data || err.message
      );
      alert("Error al reservar turno");
    }
  };

  // Manejar el cierre del modal
  const closeModal = () => {
    navigate("/");
    setShowModal(false);
    setFormData({ nombre: "", telefono: "" });
    setIsData(false);
  };

  return (
    <div className="bg-gradient-to-b from-white via-green-50 to-green-400 flex flex-col justify-center h-screen w-full items-center p-5">
      {cancha ? (
        <div className="w-full flex justify-center items-center relative">
          {/* Formulario para ingresar los datos */}

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 shadow-lg rounded-lg max-w-md p-6 flex flex-col gap-6 border border-gray-100 backdrop-blur"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Confirmá tu identidad
            </h2>

            {/* Nombre y apellido */}
            <label className="flex flex-col gap-1 text-gray-700 font-semibold">
              Nombre y apellido
              <input
                type="text"
                name="nombre"
                placeholder="Ingresá tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400"
              />
            </label>

            {/* DNI */}
            <label className="flex flex-col gap-1 text-gray-700 font-semibold">
              DNI
              <input
                type="number"
                name="dni"
                placeholder="Ingresá tu dni"
                value={formData.dni}
                onChange={handleChange}
                required
                className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400"
              />
            </label>

            {/* Teléfono */}
            <label className="flex flex-col gap-1 text-gray-700 font-semibold">
              Teléfono
              <input
                type="number"
                name="telefono"
                placeholder="Ingresá tu teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400"
              />
            </label>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={
                !(
                  formData.nombre &&
                  formData.telefono &&
                  formData.telefono.length === 10
                )
              }
              onClick={() => {
                setIsData(true);
                setShowModal(true);
              }}
              className={`py-3 rounded-md text-white font-bold w-full transition ${
                formData.nombre &&
                formData.telefono &&
                formData.telefono.length === 10
                  ? "bg-green-600 hover:bg-green-700 shadow"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Confirmar turno
            </motion.button>
          </motion.form>

          {/* Modal de confirmación de datos */}
          <AnimatePresence>
            {showModal && (
              <div
                className={`fixed inset-0 ${
                  turnoConfirmado ? "-z-10" : "z-50"
                } flex items-center justify-center bg-black bg-opacity-60 px-6`}
              >
                <div className="bg-white rounded-3xl max-w-xl w-full p-10 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,128,0,0.3)] border border-green-100 ring-4 ring-green-200">
                  <h3 className="text-3xl font-extrabold text-center text-green-800 mb-8 tracking-tight">
                    Confirmación de Reserva
                  </h3>

                  <div className="mb-8 space-y-4 text-gray-700 text-[17px] leading-relaxed font-sans max-w-md w-full">
                    <div>
                      <span className="font-semibold text-green-700 tracking-wide">
                        Cancha:
                      </span>{" "}
                      <span className="capitalize font-semibold">
                        {cancha.nombre}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700 tracking-wide">
                        Hora:
                      </span>{" "}
                      <span className="capitalize font-semibold">
                        {formatearHora(turno.hora)}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700 tracking-wide">
                        Fecha:
                      </span>{" "}
                      <span className="capitalize font-semibold">
                        {formatearFecha(turno.fecha)}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700 tracking-wide">
                        A nombre de:
                      </span>{" "}
                      <span className="capitalize font-semibold">
                        {formData.nombre}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700 tracking-wide">
                        DNI:
                      </span>{" "}
                      <span className="capitalize font-semibold">
                        {formData.dni}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700 tracking-wide">
                        Teléfono:
                      </span>{" "}
                      <span className="capitalize font-semibold">
                        {formData.telefono}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6 w-full max-w-md">
                    <button
                      className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:to-green-700 text-white py-4 px-8 rounded-2xl font-semibold shadow-lg transition-transform duration-150 ease-in-out active:scale-95 w-full sm:w-auto"
                      onClick={async () => {
                        await reservarTurno();
                      }}
                    >
                      Confirmar Reserva
                    </button>

                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-8 rounded-2xl font-semibold shadow-md transition w-full sm:w-auto"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Si el turno fue confirmado, mostrar el check */}
          {turnoConfirmado && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 px-6">
              <div className="bg-white rounded-3xl max-w-sm w-full p-10 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,128,0,0.3)] border border-green-100 ring-4 ring-green-200">
                <FaCheckCircle className="text-green-700 text-8xl mb-6 drop-shadow-md" />
                <h3 className="text-3xl font-extrabold text-green-800 mb-4 tracking-tight text-center">
                  ¡Turno Confirmado!
                </h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-xs text-center mb-8">
                  Tu turno ha sido reservado correctamente.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:to-green-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition-transform duration-150 ease-in-out active:scale-95"
                  aria-label="Cerrar modal de confirmación"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
