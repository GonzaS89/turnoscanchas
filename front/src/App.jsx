import { useState } from 'react';
import './App.css'
import { Canchas } from './Canchas';
import { ReservaDeTurno } from './ReservaDeTurno';
import { ConfirmarTurno } from './ConfirmarTurno';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  const [idCancha, setIdCancha] = useState();
  const [idTurno, setIdTurno] = useState();

  const recibirIdCancha = (id) => setIdCancha(id);
  const recibirIdTurno = id => setIdTurno(id);



  return (
    <div className='min-h-screen flex flex-col items-center justify-around relative fondo-app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Canchas idCancha={recibirIdCancha} />}></Route>
          <Route path='/reservadeturno' element={<ReservaDeTurno id={idCancha} enviarIdTurno={recibirIdTurno} />}>
          </Route>
          <Route path='/confirmaciondeturno' element={<ConfirmarTurno idTurno={idTurno} idCancha={idCancha} />}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App
