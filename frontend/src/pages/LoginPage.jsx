import { useForm } from "../hooks/useForm.js";
import { Link } from "react-router";

export const LoginPage = () => {
  const { formState, handleInputChange, handleReset } = useForm({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Acceder</h2>
        <label>
          Correo Electrónico
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>

      <Link to="/register">¿No tenés cuenta?</Link>
    </div>
  );
};
