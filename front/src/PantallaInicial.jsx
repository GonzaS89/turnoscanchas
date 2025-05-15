import { Link } from "react-router-dom";

export const PantallaInicial = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-12 bg-gradient-to-b from-white via-green-50 to-green-400 p-8">
      <header className="bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_10px_30px_rgba(0,128,0,0.2)] border border-green-100 ring-4 ring-green-200 text-center">
        <h1 className="text-4xl font-extrabold text-green-800 drop-shadow-md mb-4 tracking-tight">
          Bienvenido a TurnoGol ⚽
        </h1>
        <p className="text-green-700 text-lg font-semibold">
          ¿Cómo querés continuar?
        </p>
      </header>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <Link
          to="/canchas"
          className="w-full bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:to-green-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition-transform duration-150 ease-in-out active:scale-95 text-center"
        >
          Quiero reservar un turno
        </Link>

        <Link
          to="/login-cancha"
          className="w-full bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:to-green-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition-transform duration-150 ease-in-out active:scale-95 text-center"
        >
          Soy Dueño de Cancha
        </Link>
      </div>
    </section>
  );
};
