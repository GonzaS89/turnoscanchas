import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

// Componentes iniciales (PantallaInicial puede quedar sincrónico si es muy pequeño)
const PantallaInicial = React.lazy(() => import('./PantallaInicial'));

function App() {
  const [idCancha, setIdCancha] = useState();
  const [idTurno, setIdTurno] = useState();

  return (
    <div className="gap-8 bg-gradient-to-br from-white via-green-50 to-emerald-200 min-h-screen flex flex-col items-center justify-around relative fondo-app">
      <BrowserRouter>
        {/* Fallback global mientras se cargan componentes */}
        <Suspense fallback="Cargando pantalla...">
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<PantallaInicial />} />

            {/* Vista para jugadores */}
            <Route path="/canchas" element={
              <Suspense fallback="Cargando canchas...">
                <CanchasLazy idCancha={setIdCancha} />
              </Suspense>
            } />
            <Route path="/:seccioncancha" element={
              <Suspense fallback="Cargando reserva...">
                <ReservaDeTurnoLazy id={idCancha} enviarIdTurno={setIdTurno} />
              </Suspense>
            } />
            <Route path="/confirmaciondeturno" element={
              <Suspense fallback="Confirmando turno...">
                <ConfirmarTurnoLazy idTurno={idTurno} idCancha={idCancha} />
              </Suspense>
            } />

            {/* Vista para dueños */}
            <Route path="/login" element={
              <Suspense fallback="Cargando login...">
                <LoginCanchaLazy />
              </Suspense>
            } />
            <Route path="/panelcancha" element={
              <Suspense fallback="Cargando panel...">
                <PanelCanchaLazy />
              </Suspense>
            } />
            <Route path="/verturnos" element={
              <Suspense fallback="Cargando turnos...">
                <VerTurnosLazy />
              </Suspense>
            } />
            <Route path="/agregarturno" element={
              <Suspense fallback="Agregando turno...">
                <AgregarTurnoLazy />
              </Suspense>
            } />
            <Route path="/micuenta" element={
              <Suspense fallback="Cargando cuenta...">
                <MiCuentaLazy />
              </Suspense>
            } />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

// === Componentes Lazy Load ===
const CanchasLazy = React.lazy(() => import('./cliente/Canchas'));
const ReservaDeTurnoLazy = React.lazy(() => import('./cliente/ReservaDeTurno'));
const ConfirmarTurnoLazy = React.lazy(() => import('./cliente/ConfirmarTurno'));
const LoginCanchaLazy = React.lazy(() => import('./dueño/LoginCancha'));
const PanelCanchaLazy = React.lazy(() => import('./dueño/PanelCancha'));
const VerTurnosLazy = React.lazy(() => import('./dueño/VerTurnos'));
const AgregarTurnoLazy = React.lazy(() => import('./dueño/AgregarTurno'));
const MiCuentaLazy = React.lazy(() => import('./dueño/MiCuenta'));

export default App;