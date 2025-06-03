import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaEdit, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";

export default function MiCuenta () {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    usuario: "",
    nuevaContrasena: "",
    confirmarContrasena: ""
  });
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const { cancha } = location.state || {};

  // Inicializar formData con los valores actuales al abrir el modal
  const handleOpenModal = () => {
    setFormData({
      usuario: cancha?.usuario || "",
      nuevaContrasena: "",
      confirmarContrasena: ""
    });
    setErrors({});
    setShowModal(true);
  };

  const handleBack = () => {
    navigate("/panel-cancha", { state: { cancha } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.usuario.trim()) {
      newErrors.usuario = "El usuario es requerido";
    }
    
    if (formData.nuevaContrasena && formData.nuevaContrasena.length < 6) {
      newErrors.nuevaContrasena = "La contraseña debe tener al menos 6 caracteres";
    }
    
    if (formData.nuevaContrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí iría la lógica para actualizar los datos en el backend
      console.log("Datos a actualizar:", formData);
      setShowModal(false);
      // Podrías actualizar el estado de la cancha aquí si es necesario
    }
  };

  return (
    <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-emerald-900 to-green-900"
  >
    {/* Contenido principal */}
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-emerald-800/30">
      {/* Encabezado */}
      <div className="bg-emerald-700/60 p-6 text-white flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-200 hover:text-white transition-colors"
        >
          <FaArrowLeft className="text-lg" />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-100 bg-clip-text text-transparent text-center flex-1">
          Mi Cuenta
        </h1>
        <div className="w-8"></div> {/* Spacer */}
      </div>
  
      {/* Información de la cancha */}
      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white border-b pb-2 border-emerald-800">
            Información Básica
          </h2>
          <div>
            <p className="text-sm text-gray-400">Nombre de la cancha</p>
            <p className="text-gray-200 font-medium uppercase">
              {cancha?.nombre || "No especificado"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Dirección</p>
            <p className="text-gray-200 font-medium">
              {cancha?.direccion || "No especificada"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Barrio</p>
            <p className="text-gray-200 font-medium capitalize">
              {cancha?.barrio || "No especificado"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Localidad</p>
            <p className="text-gray-200 font-medium">
              {cancha?.localidad || "No especificada"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Teléfono</p>
            <p className="text-gray-200 font-medium">
              {cancha?.telefono || "No especificado"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Usuario</p>
            <p className="text-gray-200 font-medium">
              {cancha?.usuario || "No especificado"}
            </p>
          </div>
          <div className="relative">
            <p className="text-sm text-gray-400">Contraseña</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-200 font-medium">
                {cancha?.contrasena
                  ? showPassword
                    ? cancha.contrasena
                    : "••••••••"
                  : "No especificada"}
              </p>
              {cancha?.contrasena && (
                <button
                  className="text-xs text-white hover:text-emerald-300 transition-colors bg-emerald-700/60 px-2 py-1 rounded"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              )}
            </div>
          </div>
        </div>
  
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white border-b pb-2 border-emerald-800">
            Datos del Propietario
          </h2>
          <div>
            <p className="text-sm text-gray-400">Nombre</p>
            <p className="text-gray-200 font-medium capitalize">
              {cancha?.propietario_nombre || "No especificado"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Apellido</p>
            <p className="text-gray-200 font-medium capitalize">
              {cancha?.propietario_apellido || "No especificado"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-gray-200 font-medium">
              {cancha?.email || "No especificado"}
            </p>
          </div>
        </div>
  
        {/* Sección de configuración (opcional) */}
        {/* 
        <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-700">
          <h2 className="text-lg font-semibold text-white border-b pb-2 border-emerald-800">
            Configuración
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors">
              <p className="font-medium text-gray-200">Horario de atención</p>
              <p className="text-sm text-gray-400">Configura tus horarios disponibles</p>
            </div>
            <div className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors">
              <p className="font-medium text-gray-200">Precios</p>
              <p className="text-sm text-gray-400">Establece tus tarifas</p>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  
    {/* Botón para editar credenciales */}
    <div className="max-w-4xl mx-auto mt-6 flex justify-end px-6">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-md transition-all"
      >
        Editar Credenciales
      </button>
    </div>
  
    {/* Modal para editar credenciales */}
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md border border-gray-700"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Editar Credenciales</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-white/5 border ${
                      errors.usuario ? "border-red-500" : "border-gray-600"
                    } rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.usuario && (
                    <p className="mt-1 text-sm text-red-400">{errors.usuario}</p>
                  )}
                </div>
  
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="nuevaContrasena"
                      value={formData.nuevaContrasena}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-white/5 border ${
                        errors.nuevaContrasena ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      placeholder="Dejar en blanco para no cambiar"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.nuevaContrasena && (
                    <p className="mt-1 text-sm text-red-400">{errors.nuevaContrasena}</p>
                  )}
                </div>
  
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmarContrasena"
                    value={formData.confirmarContrasena}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-white/5 border ${
                      errors.confirmarContrasena ? "border-red-500" : "border-gray-600"
                    } rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  {errors.confirmarContrasena && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmarContrasena}</p>
                  )}
                </div>
  
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/70 rounded-lg hover:bg-gray-700/70 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.section>
  );
};