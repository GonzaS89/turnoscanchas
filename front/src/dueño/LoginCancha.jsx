import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useCanchas } from "../customHooks/useCanchas";
import { ArrowRight } from "lucide-react";

export const LoginCancha = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verContrasena, setVerContrasena] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { datos: canchas } = useCanchas();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simular un pequeño retardo para la carga
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const canchaEncontrada = canchas.find(
        (cancha) => cancha.usuario === usuario && cancha.contrasena === contrasena
      );

      if (canchaEncontrada) {
        navigate("/panelcancha", { state: { cancha: canchaEncontrada } });
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-emerald-200 p-6 sm:p-8"
    >
    
      {/* Tarjeta de login */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleLogin}
        className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-100/50 border border-green-50 p-8 w-full max-w-md flex flex-col gap-6"
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent text-center">
          Acceso para Canchas
        </h2>

        {/* Campos del formulario */}
        <div className="space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="contrasena"
                type={verContrasena ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setVerContrasena(!verContrasena)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors"
                aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {verContrasena ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center py-2 px-3 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`group relative flex items-center justify-center py-3 px-6 rounded-xl shadow-md transition-all duration-300 ${
            isLoading 
              ? 'bg-emerald-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800'
          }`}
        >
          <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </>
            ) : (
              <>
                Ingresar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>

        {/* <div className="text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?{' '}
          <button 
            type="button"
            onClick={() => alert('Contacta al soporte técnico')}
            className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
          >
            Recupérala aquí
          </button>
        </div> */}
      </motion.form>
    </motion.section>
  );
};