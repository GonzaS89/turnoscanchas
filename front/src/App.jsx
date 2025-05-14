import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PantallaInicial } from './PantallaInicial';
import { Canchas } from './Canchas';
import { ReservaDeTurno } from './ReservaDeTurno';
import { ConfirmarTurno } from './ConfirmarTurno';
import { LoginCancha } from './LoginCancha'; // <-- Asegurate de tener este componente creado
import { PanelCancha } from './PanelCancha';
import { VerTurnos } from './VerTurnos';
import { AgregarTurno } from './AgregarTurno';


function App() {
  const [idCancha, setIdCancha] = useState();
  const [idTurno, setIdTurno] = useState();
  const [turnosLibres, setTurnosLibres] = useState();

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
                turnosLibres={setTurnosLibres}
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
