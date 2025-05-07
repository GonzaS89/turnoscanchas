import React from 'react';
import { useObtenerCancha } from '../customHooks/useObtenerCancha';

export const Confirmaciondeturno = (id) => {

    const { datos : canchas} = useObtenerCancha();

    const cancha = canchas.find((cancha) => cancha.id === id);

    console.log(id)

  return (
    <div className='h-screen'>
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
    </div>
  )
}
