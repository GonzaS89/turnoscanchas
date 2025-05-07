import React from 'react';
import { useObtenerCancha } from '../customHooks/useObtenerCancha';

export const ConfirmarTurno = ({ id }) => {

    const { datos : canchas } = useObtenerCancha(id);
    const cancha = canchas.find((cancha) => cancha.id === id)

  return (
    <div className='bg-inherit flex flex-col justify-evenly h-screen w-screen font-principal relative'>
      <span className='banner-cancha top-0 absolute brightness-[45%] h-full'></span>
    </div>
  )
}
