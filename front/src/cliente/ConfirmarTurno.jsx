import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaClock,
  FaUser,
  FaIdCard,
  FaPhone,
  FaWhatsapp,
  FaMoneyBillWave,
  FaMoneyBill1Wave,
  IoCopyOutline,
} from "react-icons/io5";

export default function ConfirmarTurno() {
  const location = useLocation();
  const navigate = useNavigate();

  const { idCancha } = location.state || {};
  const { idTurno } = location.state || {};

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

  // Datos de cancha y turno desde hooks personalizados
  const { datos: canchas } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha(idCancha);

  const cancha = canchas.find((c) => c.id === idCancha);
  const turno = turnos?.find((t) => t.id === idTurno);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
  };

  const formatearHora = (hora) => hora.slice(0, 5);

  const reservarTurno = async () => {
    try {
      setIsLoading(true);
      await axios.put(`https://turnogol.site/api/turnos/${idTurno}`,  {
        nombre: formData.nombre,
        telefono: formData.telefono,
        dni: formData.dni,
        metodoPago: formData.metodoPago,
      });

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
`.trim();

      const mensajeCodificado = encodeURIComponent(mensaje);
      const link = `https://wa.me/${cancha.telefono}?text=${mensajeCodificado}`;
      setWhatsappLink(link);
      setTurnoConfirmado(true);
    } catch (err) {
      console.error("Error al reservar turno:", err.message);
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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-emerald-900 to-green-900 flex flex-col items-center justify-center p-6 text-white">
      {/* Contenedor principal */}
      {cancha && turno && (
        <div className="w-full max-w-4xl md:flex justify-center gap-6">
          {/* Tarjeta de información */}
          <div className="md:w-1/2 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-center text-white mb-4">
              Confirmá tu turno
            </h2>

            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-md">
                <FaClock className="text-white text-2xl" />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100/20 rounded-lg flex items-center justify-center">
                  <FaUser className="text-emerald-300" />
                </div>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100/20 rounded-lg flex items-center justify-center">
                  <FaIdCard className="text-emerald-300" />
                </div>
                <input
                  type="number"
                  name="dni"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100/20 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-emerald-300" />
                </div>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="flex-1 p-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              disabled={!formData.nombre || !formData.dni || !formData.telefono}
              onClick={() => setShowModal(true)}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                formData.nombre && formData.dni && formData.telefono
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continuar
            </button>
          </div>

          {/* Resumen del turno */}
          <div className="md:w-1/3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-emerald-800/30 shadow-lg">
            <h3 className="font-semibold text-emerald-200 mb-3">Resumen del turno:</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-400">Cancha:</span>
                <span className="capitalize">{cancha.nombre}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Fecha:</span>
                <span>{formatearFecha(turno.fecha)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Hora:</span>
                <span>{formatearHora(turno.hora)} hs</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Precio:</span>
                <span>$ {Math.trunc(cancha.tarifa1 || turno.precio)}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Confirmar solicitud</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-300 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Datos del cliente */}
            <div className="space-y-3 mb-6 text-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <FaUser className="text-emerald-300" />
                </div>
                <span>Nombre: {formData.nombre}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <FaIdCard className="text-emerald-300" />
                </div>
                <span>DNI: {formData.dni}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <FaPhone className="text-emerald-300" />
                </div>
                <span>Tel: {formData.telefono}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <FaMoneyBill1Wave className="text-emerald-300" />
                </div>
                <span>Precio: $ {Math.trunc(turno.precio)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <FaMoneyBillWave className="text-emerald-300" />
                </div>
                <span>Seña: $ {Math.trunc(cancha.adelanto)}</span>
              </div>
            </div>

            {/* Detalles bancarios si aplica */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mb-6 border border-emerald-800/30">
              <p className="font-medium text-gray-200 mb-2">
                Método de pago:{" "}
                <span className="capitalize">{formData.metodoPago.replace("presencial", "Efectivo").replace("transferencia", "Transferencia")}</span>
              </p>

              {formData.metodoPago === "transferencia" && (
                <div className="mt-3 pt-3 border-t border-emerald-700/30 space-y-2">
                  <button
                    type="button"
                    onClick={() => copiarAlPortapapeles(cancha.alias, "alias")}
                    className="text-left flex items-center justify-between w-full text-sm text-gray-300 hover:text-emerald-300 transition-colors"
                  >
                    <strong>Alias:</strong>{" "}
                    <span className="flex items-center gap-1">
                      {cancha.alias || "No disponible"}
                      <IoCopyOutline className="ml-2 text-gray-400 hover:text-emerald-300" />
                      {infoCopiadaAlias && (
                        <span className="text-green-400 ml-1 text-xs">Copiado!</span>
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copiarAlPortapapeles(cancha.cvu, "cvu")}
                    className="text-left flex items-center justify-between w-full text-sm text-gray-300 hover:text-emerald-300 transition-colors mt-1"
                  >
                    <strong>CVU / CBU:</strong>{" "}
                    <span className="flex items-center gap-1">
                      {cancha.cvu || "No disponible"}
                      <IoCopyOutline className="ml-2 text-gray-400 hover:text-emerald-300" />
                      {infoCopiadaCVU && (
                        <span className="text-green-400 ml-1 text-xs">Copiado!</span>
                      )}
                    </span>
                  </button>

                  <p className="text-sm mt-2 text-gray-400">
                    <strong>A nombre de:</strong> {cancha.wallet_nombre}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Banco:</strong> {cancha.wallet_banco}
                  </p>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3">
            <button
  onClick={() => setShowModal(false)}
  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
>
  Volver
</button>
              <button
                onClick={reservarTurno}
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Procesando...
                  </>
                ) : (
                  "Solicitar reserva"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {turnoConfirmado && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-sm text-center border border-green-800/30">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100/20 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-green-400 text-4xl" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">¡Solicitud realizada!</h3>

            <p className="text-gray-300 mb-6">
              {formData.metodoPago === "transferencia"
                ? "Envía el comprobante al propietario."
                : "El propietario te contactará para confirmar el pago."}
            </p>

            {formData.metodoPago === "transferencia" && (
              <div className="mb-6 text-left bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">
                <h4 className="text-sm font-medium text-emerald-300 mb-1">Datos bancarios:</h4>
                <p className="text-sm text-gray-300">
                  <strong>Alias:</strong> {cancha.alias || "No disponible"}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>CVU:</strong> {cancha.cvu || "No disponible"}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>A nombre de:</strong> {cancha.wallet_nombre}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Banco:</strong> {cancha.wallet_banco}
                </p>
              </div>
            )}

            {formData.metodoPago === "presencial" ? (
              <button
                onClick={closeModal}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium"
              >
                Finalizar
              </button>
            ) : (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition font-medium"
              >
                <FaWhatsapp /> Enviar al propietario
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}