import React from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'; // Importa el icono de WhatsApp
import { Link } from 'react-router-dom';

/**
 * Componente Footer minimalista de la aplicación.
 * Muestra el nombre de la página, la atribución del desarrollador,
 * y un botón de contacto por WhatsApp.
 * Tiene un fondo oscuro para un alto contraste.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full py-5 sm:py-6 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 text-center flex flex-col items-center"> {/* Added flex flex-col items-center here */}
        {/* Contenido del footer */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 text-center text-gray-300 w-full max-w-sm"> {/* Changed to md:grid-cols-1 and added max-w-sm to control width */}
          {/* Columna de Contacto con botón de WhatsApp */}
          <div className="flex flex-col items-center"> {/* Added flex flex-col items-center to center content within this div */}
            <h3 className="text-white text-lg font-semibold mb-4">¿Tenés dudas? Contactanos</h3>
            <div className="flex justify-center"> {/* Ensures the button itself is centered within its parent */}
              <a
                href="https://wa.me/5493814482619"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FaWhatsapp className="text-xl" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-700 pt-4 text-gray-500 w-full"> {/* Added w-full to make border stretch */}
          &copy; {currentYear} TurnoGol. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;