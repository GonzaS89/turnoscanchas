import React from 'react';
import { Link } from 'react-router-dom';
import { useObtenerCancha } from '../customHooks/useObtenerCancha';

export const Canchas = ({ idCancha }) => {

  const { datos: canchas } = useObtenerCancha();

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      {canchas.map((cancha) => (
        <Link to={'/reservadeturno'}>
          <div
            key={cancha.id}
            className='w-60 h-16 px-2 flex gap-6 items-center justify-between shadow-sm shadow-white rounded-xl bg-[#FBFBFB] cursor-pointer hover:scale-110 duration-500 ease-out' onClick={()=> idCancha(cancha.id)}>
            <img src={cancha.logo} alt="" className='rounded-full h-full' />
            <h2 className='text-sm uppercase basis-2/3'>{cancha.nombre}</h2>
          </div>
        </Link>

      ))}
    </div>
  )
}
