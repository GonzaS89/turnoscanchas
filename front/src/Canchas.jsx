import React from 'react';
import { Link } from 'react-router-dom';
import { useObtenerCancha } from '../customHooks/useObtenerCancha';

export const Canchas = ({ idCancha }) => {

  const { datos: canchas } = useObtenerCancha();

  return (
    <div className='flex justify-center items-center gap-6'>
      {canchas.map((cancha) => (
        <Link to={'/reservadeturno'} key={cancha.id}>
          <div
            
            className='h-[300px] w-[250px] flex flex-col gap-6 items-center justify-center shadow-sm shadow-white rounded-xl bg-slate-100 cursor-pointer hover:scale-110 duration-500 ease-out' onClick={()=> idCancha(cancha.id)}>
            <img src={cancha.logo} alt="" className='w-40 rounded-full' />
            <h2 className='uppercase font-bold text-2xl'>{cancha.nombre}</h2>
          </div>
        </Link>

      ))}
    </div>
  )
}
