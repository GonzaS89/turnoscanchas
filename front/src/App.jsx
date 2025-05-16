import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PantallaInicial } from './PantallaInicial';
import { Canchas } from './cliente/Canchas';
import { ReservaDeTurno } from './cliente/ReservaDeTurno';
import { ConfirmarTurno } from './cliente/ConfirmarTurno';
import { LoginCancha } from './dueño/LoginCancha'; // <-- Asegurate de tener este componente creado
import { PanelCancha } from './dueño/PanelCancha';
import { VerTurnos } from './dueño/VerTurnos';
import { AgregarTurno } from './dueño/AgregarTurno';


function App() {
  const [idCancha, setIdCancha] = useState();
  const [idTurno, setIdTurno] = useState();

  return (
    <div className="min-h-screen flex flex-col items-center justify-around relative fondo-app">
      <BrowserRouter>
        <Routes>

          {/* Pantalla inicial */}
          <Route path="/" element={<PantallaInicial />} />

          {/* Vista para jugadores */}
          <Route path="/canchas" element={<Canchas idCancha={setIdCancha} />} />
          <Route
            path="/reservadeturno"
            element={
              <ReservaDeTurno
                id={idCancha}
                enviarIdTurno={setIdTurno}
               
              />
            }
          />
          <Route
            path="/confirmaciondeturno"
            element={<ConfirmarTurno idTurno={idTurno} idCancha={idCancha} />}
          />

          {/* Vista para dueños */}
          <Route path="/login-cancha" element={<LoginCancha />} />
          <Route path="/panelcancha" element={<PanelCancha />} /> 
          <Route path='/verturnos' element={<VerTurnos />}></Route>
          <Route path='/agregarturno' element={<AgregarTurno />}></Route>
          {/* Agregar más rutas para dueños según lo que necesites después del login */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
