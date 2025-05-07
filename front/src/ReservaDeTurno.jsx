import React from "react";
import { useObtenerCancha } from "../customHooks/useObtenerCancha";
import { useObtenerTurnosxCancha } from "../customHooks/useObtenerTurnosxCancha";
import { Link } from "react-router-dom";

export const ReservaDeTurno = ({ id , enviarIdTurno }) => {
  const { datos: canchas } = useObtenerCancha();
  const { turnos } = useObtenerTurnosxCancha(id);
  const cancha = canchas.find((cancha) => cancha.id === id);

  function formatearHora(horaSQL) {
    if (!horaSQL) return "";

    const [hora, minutos] = horaSQL.split(":");
    return `${hora}:${minutos} hs`;
  }

  return (
    <div className="bg-inherit flex flex-col h-screen w-screen font-principal">
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
      <div className="flex flex-col items-center w-3/4 my-0 mx-auto">
        <h2 className="text-slate-100 text-center text-5xl mt-10">
          Turnos disponibles
        </h2>
        {turnos && (
          <div className="grid grid-cols-3 gap-4 mt-12">
            {turnos.map((turno) => (
              <Link to={'/confirmarturno'}>
               <div
                key={turno.id}
                className={`${
                  turno.estado === "reservado"
                    ? "bg-gray-700 cursor-not-allowed pointer-events-none"
                    : "bg-slate-200 cursor-pointer"
                } py-6 px-12 rounded-lg relative flex justify-center`}
              >
                <p className="text-3xl">{formatearHora(turno.hora)}</p>
                <p
                  className={`text-red-700 text-2xl uppercase absolute -rotate-[15deg] ${
                    turno.estado === "reservado" ? "flex" : "hidden"
                  }`}
                >
                  Reservado
                </p>
              </div>
              </Link>
             
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
