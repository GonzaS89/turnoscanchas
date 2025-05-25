import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaEdit, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";

export const MiCuenta = () => {
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
      className="min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-green-100"
    >
      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto bg-white shadow-md overflow-hidden">
        {/* Encabezado */}
        <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <IoSettingsSharp className="text-3xl" />
            <h1 className="text-2xl font-bold">Mi Cuenta</h1>
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <FaEdit />
            <span>Editar Credenciales</span>
          </button>
        </div>

        {/* Información de la cancha */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Información Básica
            </h2>
            <div>
              <p className="text-sm text-gray-500">Nombre de la cancha</p>
              <p className="text-gray-800 font-medium">
                {cancha?.nombre || "No especificado"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="text-gray-800 font-medium">
                {cancha?.direccion || "No especificada"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-gray-800 font-medium">
                {cancha?.telefono || "No especificado"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Usuario</p>
              <p className="text-gray-800 font-medium">
                {cancha?.usuario || "No especificado"}
              </p>
            </div>
            <div className="relative">
              <p className="text-sm text-gray-500">Contraseña</p>
              <div className="flex items-center gap-2">
                <p className="text-gray-800 font-medium">
                  {cancha?.contrasena 
                    ? (showPassword ? cancha.contrasena : '••••••••') 
                    : "No especificada"}
                </p>
                {cancha?.contrasena && (
                  <button
                    className="text-xs text-white hover:text-emerald-800 transition-colors bg-green-300 rounded px-2 py-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Datos del Propietario
            </h2>
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="text-gray-800 font-medium capitalize">
                {cancha?.propietario_nombre || "No especificado"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Apellido</p>
              <p className="text-gray-800 font-medium capitalize">
                {cancha?.propietario_apellido || "No especificado"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">
                {cancha?.email || "No especificado"}
              </p>
            </div>
          </div>

          {/* Sección de configuración */}
          {/* <div className="md:col-span-2 space-y-4 pt-4 border-t">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Configuración
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-800">Horario de atención</p>
                <p className="text-sm text-gray-500">
                  Configura tus horarios disponibles
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-800">Precios</p>
                <p className="text-sm text-gray-500">Establece tus tarifas</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Modal para editar credenciales */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Editar Credenciales
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Usuario
                    </label>
                    <input
                      type="text"
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.usuario ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.usuario && (
                      <p className="mt-1 text-sm text-red-600">{errors.usuario}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nueva Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="nuevaContrasena"
                        value={formData.nuevaContrasena}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors.nuevaContrasena ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Dejar en blanco para no cambiar"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.nuevaContrasena && (
                      <p className="mt-1 text-sm text-red-600">{errors.nuevaContrasena}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      name="confirmarContrasena"
                      value={formData.confirmarContrasena}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.confirmarContrasena ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.confirmarContrasena && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmarContrasena}</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
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