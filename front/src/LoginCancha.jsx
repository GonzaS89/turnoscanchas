import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useCanchas } from "../customHooks/useCanchas";

export const LoginCancha = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verContrasena, setVerContrasena] = useState(false);
  const navigate = useNavigate();

  const { datos: canchas } = useCanchas();

  const handleLogin = (e) => {
    e.preventDefault();
   

    // Buscar cancha con usuario y contraseña válidos
    const canchaEncontrada = canchas.find(
      (cancha) => cancha.usuario === usuario && cancha.contrasena === contrasena
    );

    if (canchaEncontrada) {
      navigate("/panelcancha", { state: { cancha: canchaEncontrada } });
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white via-green-50 to-green-400 p-5">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center">
          Acceso para Canchas
        </h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="relative">
          <input
            type={verContrasena ? "text" : "password"}
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setVerContrasena(!verContrasena)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {verContrasena ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
        >
          Ingresar
        </button>
      </form>
    </section>
  );
};
