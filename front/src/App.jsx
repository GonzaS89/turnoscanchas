import { useState } from 'react';
import './App.css'
import { Canchas } from './Canchas';
import { ReservaDeTurno } from './ReservaDeTurno';
import { ConfirmarTurno } from './ConfirmarTurno';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Confirmaciondeturno } from './Confirmaciondeturno';

function App() {

  const [idCancha, setIdCancha] = useState();

  const recibirIdCancha = (id) => {
    setIdCancha(id);  
  }

  return (
    <div className='min-h-screen flex items-center justify-center overflow-hidden'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Canchas idCancha={recibirIdCancha}/>}></Route>
          <Route path='/reservadeturno' element={<ReservaDeTurno id={idCancha}/>}>
          </Route>
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App
