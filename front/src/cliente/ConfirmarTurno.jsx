import {
  useState
} from "react";
import axios from "axios";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import {
  useCanchas
} from "../customHooks/useCanchas";
import {
  useObtenerTurnosxCancha
} from "../customHooks/useObtenerTurnosxCancha";
import {
  FaClock,
  FaUser,
  FaIdCard,
  FaPhone,
  FaWhatsapp
} from "react-icons/fa";
import {
  motion,
  AnimatePresence
} from "framer-motion";

const serverExterno = 'https://turnoscanchas-production.up.railway.app';

export const ConfirmarTurno = () => {
  const location = useLocation();
  const { idCancha } = location.state || {};
  const { idTurno } = location.state || {};

  const { datos: canchas } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha(idCancha);
  const cancha = canchas.find((cancha) => cancha.id === idCancha);
  const turno = turnos?.find((turno) => turno.id === idTurno);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    dni: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState(""); // Nuevo estado

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long'
    });
  };

  const formatearHora = (hora) => hora.slice(0, 5);

  const reservarTurno = async () => {
    try {
      setIsLoading(true);

      // Actualizamos los datos del turno
      await axios.put(`${serverExterno}/api/turnos/${idTurno}`, {
        nombre: formData.nombre,
        telefono: formData.telefono,
        dni: formData.dni,
      });

      // Generamos el mensaje para WhatsApp
      const mensaje = `
  📞 *Nueva solicitud de turno*

  👟 *Cancha:* ${cancha.nombre}
  📅 *Fecha:* ${formatearFecha(turno.fecha)}
  ⏰ *Hora:* ${formatearHora(turno.hora)} hs

  🧑‍🦱 *Cliente:* ${formData.nombre}
  📞 *Teléfono:* ${formData.telefono}
  🪪 *DNI:* ${formData.dni}

  🔗 [Haz clic aquí para aceptar o rechazar el turno](https://pruebaconwp.netlify.app/login)
`;

      // Codificamos el mensaje y creamos el link
      const mensajeCodificado = encodeURIComponent(mensaje);
      const link = `https://wa.me/ ${cancha.telefono}?text=${mensajeCodificado}`;
      setWhatsappLink(link);

      setTurnoConfirmado(true); // Mostrar modal final
    } catch (err) {
      console.error("Error al reservar turno:", err.response?.data || err.message);
      alert("Hubo un error al procesar tu solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    navigate("/");
    setShowModal(false);
    setFormData({
      nombre: "",
      telefono: "",
      dni: ""
    });
    setTurnoConfirmado(false);
    setWhatsappLink("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className="min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-green-100 flex flex-col items-center justify-center p-6"
    >
      {cancha && turno && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Tarjeta de información */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-emerald-100">
            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-4">
              Confirmá tu turno
            </h2>

            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-md">
                <FaClock className="text-white text-2xl" />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FaUser className="text-emerald-600" />
                </div>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FaIdCard className="text-emerald-600" />
                </div>
                <input
                  type="number"
                  name="dni"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-emerald-600" />
                </div>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!formData.nombre || !formData.dni || !formData.telefono}
              onClick={() => setShowModal(true)}
              className={`w-full py-3 rounded-lg font-bold text-white ${formData.nombre && formData.dni && formData.telefono
                ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md"
                : "bg-gray-300 cursor-not-allowed"
                } transition-all`}
            >
              Continuar
            </motion.button>
          </div>

          {/* Resumen del turno */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 mb-2">Resumen del turno:</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cancha:</span>
              <span className="font-medium capitalize">{cancha.nombre}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Fecha:</span>
              <span className="font-medium">{formatearFecha(turno.fecha)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Hora:</span>
              <span className="font-medium">{formatearHora(turno.hora)} hs</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modal de Confirmación */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Confirmar solicitud</h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-emerald-600 text-sm" />
                  </div>
                  <span className="font-medium">{formData.nombre}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaIdCard className="text-emerald-600 text-sm" />
                  </div>
                  <span className="font-medium">DNI: {formData.dni}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaPhone className="text-emerald-600 text-sm" />
                  </div>
                  <span className="font-medium">Tel: {formData.telefono}</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                <p className="font-semibold text-emerald-800 mb-1">Detalles del turno:</p>
                <p><span className="capitalize">{cancha?.nombre}</span> - {formatearFecha(turno?.fecha)} a las {formatearHora(turno?.hora)} hs</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Volver
                </button>
                <button
                  onClick={reservarTurno}
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    "Solicitar reserva"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Éxito */}
      {/* Modal de Éxito */}
      <AnimatePresence>
        {turnoConfirmado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl p-8 text-center max-w-sm w-full"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-green-500 text-4xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">¡Solicitud realizada!</h3>
              <p className="text-gray-600 mb-6">
                Tu turno en <span className="uppercase">{cancha?.nombre}</span> para el{" "}
                {formatearFecha(turno?.fecha)} a las {formatearHora(turno?.hora)} hs ha sido solicitado.
              </p>

              {/* Botón de WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-medium mb-4"
              >
                <FaWhatsapp /> Enviar al propietario
              </a>

              <button
                onClick={closeModal}
                className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
              >
                Finalizar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};