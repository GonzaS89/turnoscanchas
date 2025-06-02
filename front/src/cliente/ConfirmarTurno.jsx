import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useCanchas } from "../customHooks/useCanchas";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";
import {
  FaClock,
  FaUser,
  FaIdCard,
  FaPhone,
  FaWhatsapp,
  FaMoneyBillWave 
} from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const serverLocal = "http://localhost:3001";

export const ConfirmarTurno = () => {
  const location = useLocation();
  const { idCancha } = location.state || {};
  const { idTurno } = location.state || {};
  const { datos: canchas } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha(idCancha);
  const cancha = canchas.find((c) => c.id === idCancha);
  const turno = turnos?.find((t) => t.id === idTurno);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    dni: "",
    metodoPago: "presencial",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [infoCopiadaAlias, setInfoCopiadaAlias] = useState(false);
  const [infoCopiadaCVU, setInfoCopiadaCVU] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
    });
  };

  const formatearHora = (hora) => hora.slice(0, 5);

  const reservarTurno = async () => {
    try {
      setIsLoading(true);
      // Actualizamos los datos del turno
      await axios.put(`https://turnogol.site/api/turnos/${idTurno}`, {
        nombre: formData.nombre,
        telefono: formData.telefono,
        dni: formData.dni,
        metodoPago: formData.metodoPago,
      });

      // Generamos mensaje para WhatsApp
      const mensaje = `
  📞 *Nueva solicitud de turno*
  👟 *Cancha:* ${cancha.nombre}
  📅 *Fecha:* ${formatearFecha(turno.fecha)}
  ⏰ *Hora:* ${formatearHora(turno.hora)} hs
  🧑‍🦱 *Cliente:* ${formData.nombre}
  📞 *Teléfono:* ${formData.telefono}
  🪪 *DNI:* ${formData.dni}
  💳 *Método de pago:* ${
    formData.metodoPago === "presencial"
      ? "Pago presencial"
      : "Pago por transferencia"
  }
  🔗 [Haz clic aquí para aceptar o rechazar el turno](https://pruebaconwp.netlify.app/login) 
`;
      const mensajeCodificado = encodeURIComponent(mensaje);
      const link = `https://wa.me/${cancha.telefono}?text=${mensajeCodificado}`;
      setWhatsappLink(link);
      setTurnoConfirmado(true);
    } catch (err) {
      console.error(
        "Error al reservar turno:",
        err.response?.data || err.message
      );
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
      dni: "",
      metodoPago: "presencial",
    });
    setTurnoConfirmado(false);
    setWhatsappLink("");
    setInfoCopiadaAlias(false);
    setInfoCopiadaCVU(false);
  };

  const copiarAlPortapapeles = (texto, tipo) => {
    if (!texto || texto === "No disponible") return;

    navigator.clipboard.writeText(texto).then(() => {
      if (tipo === "alias") {
        setInfoCopiadaAlias(true);
        setTimeout(() => setInfoCopiadaAlias(false), 2000);
      } else if (tipo === "cvu") {
        setInfoCopiadaCVU(true);
        setTimeout(() => setInfoCopiadaCVU(false), 2000);
      }
    });
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
          className="w-full md:flex justify-center items-center gap-4"
        >
          {/* Tarjeta de información */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 md:mb-0 border border-emerald-100 md:w-1/2">
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
              className={`w-full py-3 rounded-lg font-bold text-white ${
                formData.nombre && formData.dni && formData.telefono
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md"
                  : "bg-gray-300 cursor-not-allowed"
              } transition-all`}
            >
              Continuar
            </motion.button>
          </div>
          {/* Resumen del turno */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 md:w-1/3 md:py-16 md:flex flex-col justify-center gap-4 shadow-lg">
            <h3 className="font-semibold text-emerald-800 mb-2 md:text-xl">
              Resumen del turno:
            </h3>
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
              <span className="font-medium">
                {formatearHora(turno.hora)} hs
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Precio:</span>
              <span className="font-medium">
               $ {turno?.precio || 20000}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Seña:</span>
              <span className="font-medium">
               $ {Math.trunc(cancha?.adelanto)}
              </span>
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
              <h3 className="text-xl font-bold text-emerald-800 mb-4">
                Confirmar solicitud
              </h3>
              {/* Campo de método de pago */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Método de pago de seña:
                </label>
                <select
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleChange}
                  className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="presencial">Pago presencial</option>
                  <option value="transferencia">Pago por transferencia</option>
                </select>
              </div>
              {/* Datos del cliente */}
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
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaMoneyBillWave className="text-emerald-600 text-sm" />
                  </div>
                  <span className="font-medium">Precio: $ {turno.precio}</span>
                </div>
              </div>
              {/* Detalles del turno + Datos bancarios si aplica */}
              <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                <p className="font-semibold text-emerald-800 mb-1">Detalles del turno:</p>
                <p><span className="capitalize">{cancha?.nombre}</span> - {formatearFecha(turno?.fecha)} a las {formatearHora(turno?.hora)} hs</p>
                {/* Mostrar alias y CVU si es transferencia */}
                {/* {formData.metodoPago === "transferencia" && (
                  <>
                    <div className="mt-3 pt-3 border-t border-emerald-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Datos para transferir:</h4>
                      <button 
                        className="text-sm inline-flex items-center gap-1 w-full text-left"
                        onClick={() => copiarAlPortapapeles(cancha.alias, "alias")}
                        type="button"
                      >
                        <strong>Alias:</strong> {cancha.alias || "No disponible"}
                        {infoCopiadaAlias && <span className="text-green-500 ml-1">Copiado!</span>}
                        <IoCopyOutline className="text-lg text-gray-500 group-hover:text-emerald-600" />
                      </button>
                      <button 
                        className="text-sm inline-flex items-center gap-1 w-full text-left mt-1"
                        onClick={() => copiarAlPortapapeles(cancha.cvu, "cvu")}
                        type="button"
                      >
                        <strong>CVU / CBU:</strong> {cancha.cvu || "No disponible"}
                        {infoCopiadaCVU && <span className="text-green-500 ml-1">Copiado!</span>}
                        <IoCopyOutline className="text-lg text-gray-500 group-hover:text-emerald-600" />
                      </button>
                    </div>
                  </>
                )} */}
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
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                      >
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
                    "Solicitar reserva"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
                {formData.metodoPago === 'transferencia' ? 'Contactá con el propietario de la cancha para enviarle el comprobante por la seña. Aquí te dejamos los datos para transferir:' : 'Tu solicitud ha sido enviada exitosamente. El propietario de la cancha esperá que abones para confirmar el turno.'}
              </p>
              {/* Mostrar alias y CVU si fue pago por transferencia */}
              {formData.metodoPago === "transferencia" && (
                <div className="mb-6 text-left bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Datos bancarios:</h4>
                  <button 
                    className="text-sm inline-flex items-center gap-1 w-full text-left"
                    onClick={() => copiarAlPortapapeles(cancha.alias, "alias")}
                    type="button"
                  >
                    <strong>Alias:</strong> {cancha.alias || "No disponible"}
                    
                    <IoCopyOutline className="text-lg text-gray-500 group-hover:text-emerald-600" />
                    {infoCopiadaAlias && <span className="text-green-500 ml-1">Copiado!</span>}
                  </button>
                  <button 
                    className="text-sm inline-flex items-center gap-1 w-full text-left mt-1"
                    onClick={() => copiarAlPortapapeles(cancha.cvu, "cvu")}
                    type="button"
                  >
                    <strong>CVU / CBU:</strong> {cancha.cvu || "No disponible"}
               
                    <IoCopyOutline className="text-lg text-gray-500 group-hover:text-emerald-600" />
                         {infoCopiadaCVU && <span className="text-green-500 ml-1">Copiado!</span>}
                    
                  </button>
                  <p className="text-sm"><strong>A nombre de: </strong>{cancha.wallet_nombre}</p>
                  <p className="text-sm"><strong>Banco: </strong>{cancha.wallet_banco}</p>
                </div>
              )}
              {/* Botón de WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-medium mb-4"
                onClick={closeModal}
              >
                <FaWhatsapp /> Enviar al propietario
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};