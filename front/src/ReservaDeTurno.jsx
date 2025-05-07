import React from 'react';
import { useObtenerCancha } from '../customHooks/useObtenerCancha';
import { useObtenerTurnosxCancha } from '../customHooks/useObtenerTurnosxCancha';
import { Link } from 'react-router-dom';

export const ReservaDeTurno = ({ id }) => {

  const { datos: canchas } = useObtenerCancha();
  const { turnos } = useObtenerTurnosxCancha(id);
  const cancha = canchas.find((cancha) => cancha.id === id)

  function formatearHora(horaSQL) {
    if (!horaSQL) return '';

    const [hora, minutos] = horaSQL.split(':');
    return `${hora}:${minutos} hs`;
  }

  return (

    <div className='bg-inherit flex flex-col h-screen w-screen font-principal'>
      <div className='flex items-center justify-center h-[180px] w-full relative'>
        <span className='banner-cancha top-0 absolute brightness-[45%] h-full'></span>
        {cancha ? (
          <div className='flex z-20 items-center gap-8'>
            <img src={cancha.logo} alt="" className='h-[100px] w-[100px] rounded-full' />
            <h2 className='uppercase text-2xl text-slate-100 font-principal shadow-md shadow-black'>{cancha.nombre}</h2>
          </div>

        ) :
          (<p></p>)
        }
      </div>
      <div className='flex flex-col items-center lg:w-1/2 my-0 mx-auto'>
        <h2 className='text-slate-100 text-center text-2xl mt-10'>Turnos disponibles</h2>
        {turnos && (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
            {turnos.map((turno) => (
              <Link to={'/confirmaciondeturno'}>
                <div className={`${turno.estado === 'reservado' ? 'bg-gray-800 cursor-not-allowed' : 'bg-slate-100 cursor-pointer'} py-4 px-8 rounded-lg relative flex justify-center`}>
                  <p>{formatearHora(turno.hora)}</p>
                  <p className={`text-red-700 uppercase absolute -rotate-[25deg] ${turno.estado === 'reservado' ? 'flex' : 'hidden'}`}>Reservado</p>
                </div>
              </Link>

            ))}
          </div>
        )}
      </div>


    </div>
  )
}
