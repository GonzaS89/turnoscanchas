import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './assets/logo-turnogol.png'
import { useCanchas } from '../customHooks/useCanchas';

export const Canchas = ({ idCancha }) => {

  const { datos : canchas } = useCanchas();

  return (
    <section className='canchas-layout flex flex-col justify-around h-screen'>
      <img src={Logo} alt="" className='w-[300px]'/>
          <div className='flex flex-col justify-center items-center gap-4'>
      {canchas.map((cancha) => (
        <Link to={'/reservadeturno'} key={cancha.id}>
          <div
            key={cancha.id}
            className='flex h-20 w-[250px] gap-6 items-center justify-between shadow-sm shadow-white rounded-[50px] bg-[#333333] text-slate-50 cursor-pointer' onClick={()=> idCancha(cancha.id)}>
            <img src={cancha.logo} alt="" className='h-full rounded-full' />
            <h2 className='uppercase w-3/4 text-sm font-poppins'>{cancha.nombre}</h2>
          </div>
        </Link>

      ))}
    </div>
    </section>
    
  )
}
