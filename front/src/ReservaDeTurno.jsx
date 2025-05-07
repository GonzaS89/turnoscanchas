import React from 'react';
import { Link } from 'react-router-dom';
import { useObtenerCancha } from '../customHooks/useObtenerCancha';
import { useObtenerTurnosxCancha } from '../customHooks/useObtenerTurnosxCancha';


export const ReservaDeTurno = ({ id, enviarIdTurno }) => {
  const { datos: canchas } = useObtenerCancha();
  const { turnos } = useObtenerTurnosxCancha(id);
  const cancha = canchas.find((cancha) => cancha.id === id);

  function formatearHora(horaSQL) {
    if (!horaSQL) return '';

    const [hora, minutos] = horaSQL.split(':');
    return `${hora}:${minutos} hs`;
  }

  return (

    <div className='bg-inherit flex flex-col justify-evenly h-screen w-screen font-principal relative'>
      <span className='banner-cancha top-0 absolute brightness-[45%] h-full'></span>
      {cancha ? (
        <div className='flex z-20 items-center justify-center gap-4'>
          <img src={cancha.logo} alt="" className='h-[90px] w-[90px] rounded-full' />
          <h2 className='uppercase text-3xl text-slate-100 font-principal shadow-md shadow-black'>{cancha.nombre}</h2>
        </div>
      ) : (
        <p></p>
      )}
      <div className='flex flex-col items-center w-full lg:w-1/2 my-0 mx-auto'>
        <h2 className='text-slate-100 text-center text-2xl lg:text-3xl mt-10 z-50'>Turnos disponibles</h2>
        {turnos && (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
            {turnos.map((turno) => (
              <div className={`${turno.estado === 'reservado' ? 'bg-gray-800 cursor-not-allowed' : 'bg-slate-300 cursor-pointer'} py-4 px-8 rounded-lg relative flex justify-center`}>
                <p>{formatearHora(turno.hora)}</p>
                <p className={`text-red-700 uppercase absolute -rotate-[25deg] ${turno.estado === 'reservado' ? 'flex' : 'hidden'}`}>Reservado</p>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};
