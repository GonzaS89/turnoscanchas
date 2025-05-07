import React from 'react';
import { useObtenerCancha } from '../customHooks/useObtenerCancha';

export const ConfirmarTurno = ({ id }) => {

    const { datos : canchas } = useObtenerCancha(id);
    const cancha = canchas.find((cancha) => cancha.id === id)

  return (
    <div className='bg-inherit flex flex-col h-screen w-screen font-principal' >
       <div className="flex items-center justify-center h-[300px] relative">
        <span className="banner-cancha top-0 absolute brightness-[60%] blur-sm h-full"></span>
        {cancha ? (
          <div className="flex z-20 items-center gap-8">
            <img
              src={cancha.logo}
              alt=""
              className="h-[180px] w-[180px] rounded-full"
            />
            <h2 className="uppercase text-5xl text-slate-100 font-principal shadow-md shadow-black">
              {cancha.nombre}
            </h2>
          </div>
        ) : (
          <p></p>
        )}
      </div>
        
    </div>
  )
}
