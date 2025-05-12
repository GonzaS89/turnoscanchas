import React from 'react';
import { Link } from 'react-router-dom';
import { useCanchas } from '../customHooks/useCanchas';
import { useObtenerTurnosxCancha } from '../customHooks/useObtenerTurnosxCancha';

export const ReservaDeTurno = ({ id, enviarIdTurno }) => {

  const { datos: canchas } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha(id);

  const cancha = canchas.find((item) => item.id === id);
  const fechaHoy = new Date().toISOString().split("T")[0]; 


  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const día = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${día}`;
  };

  const formatearHora = (horaStr) => horaStr.slice(0, 5);

  
  // Filtrar turnos que coincidan con la fecha de hoy
  const turnosDeHoy = turnos?.filter((turno) => formatearFecha(turno.fecha) === fechaHoy);

  console.log(fechaHoy)

  return (
    <section className="w-full h-screen flex flex-col justify-center gap-8 bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-center text-green-700 tracking-tight drop-shadow-sm">
          Elegí tu Turno ⚽
        </h1>
        {cancha && (
          <p className="text-center text-sm text-gray-500 mt-1 uppercase">
            Cancha: <span className="font-medium">{cancha.nombre}</span>
          </p>
        )}
      </header>

      {turnosDeHoy ? (
        <div className="flex flex-col gap-4 py-4 h-[500px] overflow-scroll">
          {turnosDeHoy.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No hay turnos disponibles para hoy.</p>
          ) : (
            turnosDeHoy.map((turno) => (
              <Link to={'/confirmaciondeturno'} className='w-full'>
               <button
                key={turno.id}
                disabled={turno.estado === 'reservado'}
                className={`flex items-center gap-4 py-6 w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg hover:bg-green-100 transition-all duration-200 active:scale-95 group ${turno.estado === 'reservado' ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'text-green-600'}`}
                onClick={() => enviarIdTurno(turno.id)}
              >
                <p className="text-lg font-semibold text-gray-800 group-hover:text-green-800 transition">
                  {formatearHora(turno.hora)}
                </p>
                {turno.estado === 'reservado' ? (
                  <p className="text-xs text-gray-800">Reservado</p>
                ) : (
                  <p className="text-xs text-gray-500">Disponible</p>
                )}
              </button>
              </Link>
             
            ))
          )}
        </div>
      ) : null}
    </section>
  );
};
