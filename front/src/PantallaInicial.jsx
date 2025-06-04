import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  FaFutbol,
  FaArrowRight,
  FaWhatsapp,
  FaInstagram,
  FaRegHandshake,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import imgHero from "./assets/hero-cancha.jpeg";
import logo from "./assets/logo.png"; // Asegúrate de tener esta imagen
// Asegúrate de tener esta imagen

export default function PantallaInicial () {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full relative flex h-screen"
      style={{
        backgroundImage: `url(${imgHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay oscuro para mejorar contraste */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm backdrop-brightness-50"></div>

      {/* Contenido centrado */}
      <div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="z-10 max-w-xl mx-auto text-center px-6 py-12 space-y-8 flex flex-col justify-between items-center"
      >
        <img src={logo} alt="" className="w-[140px] lg:w-[180px]"/>
        <div className="flex flex-col gap-8 items-center h-3/4">
          {/* Icono + Título */}
          
          <h1 className="text-4xl lg:text-5xl xl:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent tex">
            Bienvenido a TurnoGol
          </h1>

          {/* Descripción */}
          <p className="text-base sm:text-base xl:text-2xl text-gray-100 max-w-lg mx-auto">
            Tu plataforma para reservar canchas de fútbol de forma rápida y sencilla.
            ¡Disfruta del mejor fútbol con amigos!
          </p>

          {/* Botón principal */}
          <Link
            to="/canchas"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98] lg:w-3/4 xl:py-6 xl:text-xl xl:px-8"
            aria-label="Reservar cancha"
          >
            <FaFutbol className="text-lg xl:text-3xl" />
            <span>Quiero reservar un turno</span>
            <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>


        {/* Info trabajo */}
        <div className="mt-6 xl:text-lg text-center text-gray-50 gap-4 flex flex-col items-center">
          <p>¿Querés trabajar con nosotros?</p>
          <button
            onClick={() => setShowModal(true)}
            className="font-medium text-gray-800 xl:text-md transition-colors duration-300 group mt-1 inline-flex items-center gap-1 bg-gray-50 py-2 px-4 rounded-md"
          >
            Más info aquí
            <FaArrowRight className="text-xs xl:text-lg group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Modal para dueños de canchas */}
      <AnimatePresence>
        {showModal && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 absolute"
            onClick={() => setShowModal(false)}
          >
            <div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative"
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
                    {/* <a
                      href="https://instagram.com/turnogol"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-3 rounded-lg transition-colors"
                    >
                      <FaInstagram className="text-xl" />
                      <span>@turnogol</span>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};