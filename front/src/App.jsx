import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import PantallaInicial from './PantallaInicial';
import Canchas from './cliente/Canchas';
import ReservaDeTurno from './cliente/ReservaDeTurno';
import ConfirmarTurno from './cliente/ConfirmarTurno';
import LoginCancha from './dueño/LoginCancha';
import PanelCancha from './dueño/PanelCancha';
import VerTurnos from './dueño/VerTurnos';
import AgregarTurno from './dueño/AgregarTurno';
import MiCuenta from './dueño/MiCuenta';
import Footer from './Footer'; // Importamos el footer

// Componente para ocultar footer en PantallaInicial
const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/';

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  const [idCancha, setIdCancha] = useState();
  const [idTurno, setIdTurno] = useState();

  return (
    <BrowserRouter>
      <div className="gap-8 bg-gradient-to-br from-white via-green-50 to-emerald-200 min-h-screen flex flex-col items-center justify-around relative fondo-app">
        <Layout>
          <Routes>
            {/* Pantalla inicial */}
            <Route path="/" element={<PantallaInicial />} />

            {/* Vista para jugadores */}
            <Route path="/canchas" element={<Canchas idCancha={setIdCancha} />} />
            <Route
              path="/:seccioncancha"
              element={<ReservaDeTurno id={idCancha} enviarIdTurno={setIdTurno} />}
            />
            <Route
              path="/confirmaciondeturno"
              element={<ConfirmarTurno idTurno={idTurno} idCancha={idCancha} />}
            />

            {/* Vista para dueños */}
            <Route path="/login" element={<LoginCancha />} />
            <Route path="/panelcancha" element={<PanelCancha />} />
            <Route path="/verturnos" element={<VerTurnos />} />
            <Route path="/agregarturno" element={<AgregarTurno />} />
            <Route path="/micuenta" element={<MiCuenta />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;