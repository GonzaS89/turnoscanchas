import { Link } from "react-router-dom";

export const PantallaInicial = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm mb-2">
          Bienvenido a TurnoGol ⚽
        </h1>
        <p className="text-gray-600">¿Cómo querés continuar?</p>
      </header>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <Link
          to="/canchas"
          className="bg-white text-green-700 text-lg font-semibold p-4 rounded-2xl shadow-md hover:shadow-lg hover:bg-green-100 transition-all duration-200 active:scale-95 text-center"
        >
          Quiero reservar un turno
        </Link>

        <Link
          to="/login-cancha"
          className="bg-white text-green-700 text-lg font-semibold p-4 rounded-2xl shadow-md hover:shadow-lg hover:bg-green-100 transition-all duration-200 active:scale-95 text-center"
        >
          Soy Dueño de Cancha
        </Link>
      </div>
    </section>
  );
};
