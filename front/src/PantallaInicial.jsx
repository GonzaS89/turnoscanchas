import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFutbol,
  FaUserTie,
  FaArrowRight,
  FaWhatsapp,
  FaInstagram,
  FaRegHandshake,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

export const PantallaInicial = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-gradient-to-br from-white via-green-50 to-emerald-200 p-6 sm:p-8 relative"
      
    >
      
      {/* Header con animación */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 200}}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl shadow-green-100/50 border border-green-50 text-center"
      >
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
            <FaFutbol className="text-white text-3xl" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent drop-shadow-sm mb-3">
          Bienvenido a TurnoGol
        </h1>

        <p className="text-emerald-700 text-base sm:text-lg font-medium">
          Tu plataforma para reservar canchas de fútbol
        </p>
      </motion.header>

      {/* Botones con animaciones escalonadas */}
      <div className="flex flex-col gap-5 w-full max-w-sm">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3, type: "spring", stiffness: 200}}
        >
          <Link
            to="/canchas"
            className="group relative w-full flex items-center justify-between bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-emerald-200/30 transition-all duration-300 active:scale-[0.98] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-3">
              <FaFutbol className="text-lg" />
              <span>Quiero reservar un turno</span>
            </span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              <FaArrowRight />
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3, type: "spring", stiffness: 200}}
        >
          <Link
            to="/login-cancha"
            className="group relative w-full flex items-center justify-between bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-emerald-200/30 transition-all duration-300 active:scale-[0.98] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-3">
              <FaUserTie className="text-lg" />
              <span>Soy Dueño de Cancha</span>
            </span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              <FaArrowRight />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Footer adicional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.1, type: "spring", stiffness: 500}}
        className="mt-4 text-center text-sm text-emerald-600/80 flex flex-col items-center gap-2"
      >
        <p>¿Querés trabajar con nosotros?</p>
        <button
          onClick={() => setShowModal(true)}
          className="font-medium text-emerald-700 hover:text-emerald-900 transition-colors duration-300 group"
        >
          Más info aquí
          <span className="block h-0.5 bg-emerald-700 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
        </button>
      </motion.div>

      {/* Modal para dueños de canchas */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Cerrar modal"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Contenido del modal */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <FaRegHandshake className="text-emerald-600 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-800">
                    Sumá tu cancha a TurnoGol
                  </h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Únete a la plataforma líder de reservas de canchas deportivas
                  y hacé crecer tu negocio.
                </p>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3">
                    Beneficios exclusivos:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Gestión automatizada de reservas 24/7",
                      "Aumento de visibilidad y clientes",
                      "Sistema de pagos integrado",
                      "Panel de control para administrar tu cancha",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <div className="mb-8">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3">Cómo funciona:</h3>
                  <ol className="space-y-4 list-decimal list-inside">
                    {[
                      "Completás el formulario de registro",
                      "Nuestro equipo verifica tu cancha",
                      "Configurás tus horarios y precios",
                      "Empezás a recibir reservas inmediatamente"
                    ].map((step, index) => (
                      <li key={index} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div> */}

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-4">
                    Contacto directo:
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-3">
                      <a
                        href="https://wa.me/5491234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-3 rounded-lg transition-colors"
                      >
                        <FaWhatsapp className="text-xl" />
                        <span>WhatsApp Business</span>
                      </a>
                      <a
                        href="https://instagram.com/turnogol"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-3 rounded-lg transition-colors"
                      >
                        <FaInstagram className="text-xl" />
                        <span>@turnogol</span>
                      </a>
                    </div>

                    {/* <Link
                      to="/registro-cancha"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center justify-center text-center"
                      onClick={() => setShowModal(false)}
                    >
                      Registrarme ahora
                    </Link> */}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
