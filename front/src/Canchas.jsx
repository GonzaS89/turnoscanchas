import React from 'react';
import { Link } from 'react-router-dom';
import { useCanchas } from '../customHooks/useCanchas';

export const Canchas = ({ idCancha }) => {

  const { datos : canchas } = useCanchas();

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      {canchas.map((cancha) => (
        <Link to={'/reservadeturno'} key={cancha.id}>
          <div
            key={cancha.id}
            className='flex h-16 w-[250px] gap-6 items-center justify-between shadow-sm shadow-white rounded-xl bg-slate-100 cursor-pointer hover:scale-110 duration-500 ease-out' onClick={()=> idCancha(cancha.id)}>
            <img src={cancha.logo} alt="" className='h-full rounded-full' />
            <h2 className='uppercase w-3/4 text-sm'>{cancha.nombre}</h2>
          </div>
        </Link>

      ))}
    </div>
  )
}
