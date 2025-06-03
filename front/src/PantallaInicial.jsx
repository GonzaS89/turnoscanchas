import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFutbol,
  FaUser,
  FaArrowRight,
  FaWhatsapp,
  FaInstagram,
  FaRegHandshake,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import imgHero from "./assets/hero-cancha.jpeg"; // Asegúrate de tener una imagen en esta ruta

export const PantallaInicial = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-screen mx-auto flex flex-col lg:flex-row items-center justify-between relative"
    >
      
      {/* Columna Izquierda - Hero Image */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="lg:w-1/2 w-64 h-64 sm:h-80 lg:h-auto hidden xl:block relative rounded-2xl shadow-xl"
      >
        <img
          src={imgHero} // Reemplaza con tu propia imagen
          alt="Cancha de fútbol iluminada por la noche"
          className="hidden lg:inline-block w-full h-screen object-cover transition-transform duration-700 blur-md rounded-2xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-transparent to-green-900/70"></div>
      </motion.div>

      {/* Columna Derecha - Contenido */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="lg:w-1/2 w-full h-screen max-w-lg mx-auto text-center flex flex-col justify-between lg:text-left px-6 lg:px-12 py-8 lg:py-16 relative"
      >
        {/* Header */}
        <motion.button
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        
        aria-label="Perfil de usuario"
      >
        <Link className="bg-emerald-600 w-32 lg:w-44 uppercase py-2 px-6 text-gray-50 rounded-lg justify-self-end p-2 shadow-lg flex items-center gap-2 mt-6 bg-blue text-sm"
        to={'/login'}>
        <FaUser className="text-gray-50 text-lg hover:text-emerald-600 transition-colors duration-300" />
        Login
        </Link>
        
      </motion.button>
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h1 className="text-5xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent inline-flex items-center justify-center flex-col gap-2 text-center lg:text-left">
            <FaFutbol className="text-5xl lg:text-4xl text-green-600" />
            Bienvenido a  <br /> TurnoGol
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-xl text-gray-500 max-w-2xl mx-auto text-left px-4">
            Tu plataforma para reservar canchas de fútbol de forma rápida y
            sencilla. ¡Disfruta del mejor fútbol con amigos!
          </p>
          <div className="mt-8 space-y-6">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link
              to="/canchas"
              className="group relative w-full flex items-center justify-start lg:gap-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-4 lg:py-4 px-4 rounded-xl shadow-lg hover:shadow-emerald-300/30 transition-all duration-300 active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-3">
                <FaFutbol className="text-lg lg:text-4xl" />
                <span className="lg:text-xl uppercase">
                  Quiero reservar un turno
                </span>
              </span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                <FaArrowRight className="lg:text-xl" />
              </span>
            </Link>
          </motion.div>
        </div>
        </motion.header>        

        {/* Footer / Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="mt-10 text-center lg:text-left text-sm lg:text-lg text-emerald-600/80"
        >
          <p>¿Querés trabajar con nosotros?</p>
          <button
            onClick={() => setShowModal(true)}
            className="font-medium text-emerald-700 hover:text-emerald-900 transition-colors duration-300 group mt-1 inline-flex items-center gap-1"
          >
            Más info aquí
            <span className="block h-px w-8 bg-emerald-700 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </button>
        </motion.div>
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
              className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
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
                  Si sos dueño de una cancha de fútbol y querés aumentar tus
                  reservas, ¡este es el momento! Con TurnoGol, podés gestionar
                  tus turnos de forma fácil y rápida.
                </p>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3">
                    Beneficios:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Gestión automatizada de reservas 24/7",
                      "Aumento de visibilidad",
                      "Panel de control intuitivo y fácil de usar",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="text-emerald-500 mt-1" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-4">
                    Contacto directo:
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://wa.me/5491234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-3 rounded-lg transition-colors"
                    >
                      <FaWhatsapp className="text-xl" />
                      <span>WhatsApp</span>
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
