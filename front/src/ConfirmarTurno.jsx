import React, { useState } from 'react';
import axios from 'axios';
import { useCanchas } from '../customHooks/useCanchas';
import { useObtenerTurnosxCancha } from '../customHooks/useObtenerTurnosxCancha';

export const ConfirmarTurno = ({ idCancha, idTurno }) => {


  const { datos: canchas } = useCanchas();
  const { turnos } = useObtenerTurnosxCancha(idCancha);

  const cancha = canchas.find((cancha) => cancha.id === idCancha);
  const turno = turnos?.find((turno) => turno.id === idTurno)

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

  }

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, turno.hora)
  }

  const [isData, setIsData] = useState(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState(false);

  function formatearHora(horaSQL) {
    if (!horaSQL) return '';

    const [hora, minutos] = horaSQL.split(':');
    return `${hora}:${minutos} hs`;
  }

  const reservarTurno = async () => {

    console.log(idTurno)
  
    try{
      const res = await axios.put(`https://turnoscanchas.onrender.com/api/turnos/${idTurno}`,
          {
              nombre: formData.nombre,
              telefono: formData.telefono
          }
      )

      console.log('Turno reservado correctamente', res.data);
      alert('Turnos reservado correctamente');

      setFormData({
          nombre:"",
          telefono:""
      })
    } catch (err) {
      console.error('Error al reservar turno:', err.response?.data || err.message);
      alert('Error al reservar turno');
    }
  }

  return (
    <div className='bg-inherit flex flex-col justify-evenly h-screen w-screen relative items-center overflow-hidden'>
      <span className='banner-cancha top-0 absolute brightness-[45%] h-full -z-10'></span>
      {
        cancha ? (
          //   <div className='relative flex items-center justify-center gap-4 text-slate-100 top-0'>
          // <img src={cancha.logo} alt="" className='h-[90px] w-[90px] rounded-full' />
          // <h2 className='text-2xl'>{cancha.nombre}</h2>
          // </div>
          <div className='w-full flex justify-center items-center relative'>
            <form className={`bg-slate-100 w-5/6 h-[300px] flex flex-col items-center justify-between uppercase font-bold gap-6 absolute ${isData ? 'left-full' : ''}`} onSubmit={handleSubmit}>

              <h2 className='py-3 bg-gray-600 w-full text-center text-slate-100'>Confirmá tu identidad</h2>
              <div className='flex flex-col justify-center w-full text-sm items-center gap-4'>
                <label className='font-bold uppercase'>Nombre y apellido</label>
                <input type="text"
                  className='border-b-2 border-opacity-30 border-slate-200 bg-transparent text-center placeholder:text-slate-700' placeholder='Ingresá tú nombre'
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
                  required />
              </div>
              <div className='flex flex-col justify-center w-full text-sm items-center gap-4'>
                <label className='font-bold uppercase'>Teléfono</label>
                <input type="text"
                  className='border-b-2 border-opacity-30 border-slate-200 bg-transparent text-center placeholder:text-slate-700' placeholder='Ingresá un teléfono'
                  name='telefono'
                  value={formData.telefono}
                  onChange={handleChange}
                  required />
              </div>
              <button type='submit'
                className={`py-3 uppercase ${formData.nombre && (formData.telefono && formData.telefono.length === 10) ? 'bg-blue-600' : 'bg-gray-500 pointer-events-none'} text-slate-100 w-full`}
                onClick={() => setIsData(true)}>Ingresar datos</button>
            </form>
            <div className={`${isData ? '' : 'right-full'} w-5/6 bg-slate-100 flex flex-col items-center justify-between gap-6 absolute`}>
              <h2 className='bg-slate-500 py-4 w-full text-center uppercase font-bold text-white'>Datos de la reserva</h2>
              <div className='flex flex-col items-center'>
                <h3 className='uppercase'>Cancha</h3>
                <p className='font-bold text-xl uppercase'>{cancha.nombre}</p>
              </div>
              <div className='flex flex-col items-center'>
                <h3 className='uppercase'>Horario</h3>
                <p className='font-bold text-xl uppercase'>{turno && formatearHora(turno.hora)}</p>
              </div>
              <div className='flex flex-col items-center'>
                <h3 className='uppercase'>A nombre de:</h3>
                <p className='font-bold text-xl uppercase'>{formData.nombre}</p>
              </div>
              <div className='flex flex-col items-center'>
                <h3 className='uppercase'>Teléfono</h3>
                <p className='font-bold text-xl uppercase'>{formData.telefono}</p>
              </div>
              <button className='bg-blue-600 py-4 w-full text-center uppercase font-bold text-white' onClick={()=> reservarTurno()}>Confirmar turno</button>
            </div>
          </div>
        ) : ''
      }

    </div>
  )
}
