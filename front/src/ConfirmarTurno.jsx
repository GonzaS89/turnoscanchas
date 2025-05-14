import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useCanchas } from '../customHooks/useCanchas';
import { useObtenerTurnosxCancha } from '../customHooks/useObtenerTurnosxCancha';
import { FaCheckCircle } from 'react-icons/fa'; 

export const ConfirmarTurno = ({ idCancha, idTurno }) => {
  const { datos: canchas } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha(idCancha);

  const cancha = canchas.find((cancha) => cancha.id === idCancha);
  const turno = turnos && turnos.find((turno) => turno.id === idTurno);

  const [formData, setFormData] = useState({ nombre: '', telefono: '', dni: '' });
  const [isData, setIsData] = useState(false);
  const [showModal, setShowModal] = useState(false); // Para mostrar el modal de confirmación
  const [turnoConfirmado, setTurnoConfirmado] = useState(false); // Para saber si el turno fue confirmado

  const navigate = useNavigate();

  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  }
  

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para formatear la hora
  const formatearFecha = (fechaStr) => {
    const [año, mes, día] = fechaStr.split("T")[0].split("-");
    return `${día}-${mes}`;
  };
  

  // Reservar el turno mediante la API
  const reservarTurno = async () => {
    try {
      const res = await axios.put(
        `https://turnoscanchas.onrender.com/api/turnos/${idTurno}`,
        {
          nombre: formData.nombre,
          telefono: formData.telefono,
          dni: formData.dni
        }
      );

      console.log('Turno reservado correctamente', res.data);
      setTurnoConfirmado(true); // Setea que el turno ha sido confirmado
    } catch (err) {
      console.error('Error al reservar turno:', err.response?.data || err.message);
      alert('Error al reservar turno');
    }
  };

  // Manejar el cierre del modal
  const closeModal = () => {
    navigate('/')
    setShowModal(false);
    setFormData({ nombre: '', telefono: '' });
    setIsData(false);
  };

  return (
    <div className="bg-gradient-to-b from-white via-green-50 to-green-400 flex flex-col justify-center h-screen w-full items-center p-5">
      {cancha ? (
        <div className="w-full flex justify-center items-center relative">
          {/* Formulario para ingresar los datos */}
          <form
            className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 flex flex-col items-center gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Confirmá tu identidad
            </h2>

            <div className="flex flex-col w-full gap-6">
              {/* Campo para nombre */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Nombre y apellido</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingresá tu nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Campo para DNI */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">DNI</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingresá tu dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Campo para teléfono */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingresá tu teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              

              {/* Botón para enviar el formulario */}
              <button
                type="submit"
                className={`py-3 uppercase rounded-lg text-white font-bold w-full ${formData.nombre && formData.telefono && formData.telefono.length === 10 ? 'bg-green-600' : 'bg-gray-400 pointer-events-none'}`}
                onClick={() => {
                  setIsData(true);
                  setShowModal(true); // Mostrar el modal de confirmación
                }}
              >
                Ingresar datos
              </button>
            </div>
          </form>

          {/* Modal de confirmación de datos */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">Confirmar Reserva</h3>

                <div className="mb-4">
                  <p className="font-semibold text-lg text-gray-700 capitalize">Cancha: {cancha.nombre}</p>
                  <p className="font-semibold text-lg text-gray-700">Hora: {turno && formatearHora(turno.hora)}</p>
                  <p className="font-semibold text-lg text-gray-700">Fecha: {turno && formatearFecha(turno.fecha)}</p>
                  <p className="font-semibold text-lg text-gray-700">A nombre de: {formData.nombre}</p>
                  <p className="font-semibold text-lg text-gray-700">DNI: {formData.dni}</p>
                  <p className="font-semibold text-lg text-gray-700">Teléfono: {formData.telefono}</p>
                </div>

                <div className="flex justify-center gap-4">
        
                  {/* Botón para confirmar el turno */}
                  <button
                    className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold"
                    onClick={async () => {
                      await reservarTurno();
                    }}
                  >
                    Confirmar Turno
                  </button>
  
                  {/* Botón para cerrar el modal */}
                  <button
                    className="bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Si el turno fue confirmado, mostrar el check */}
          {turnoConfirmado && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg max-w-xs w-full text-center flex flex-col items-center">
                <FaCheckCircle className="text-green-600 text-6xl mb-4" />
                <h3 className="font-semibold text-lg text-gray-800">¡Turno Confirmado!</h3>
                <p className="text-gray-700">Tu turno ha sido reservado correctamente.</p>
                <button
                  className="mt-6 w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
