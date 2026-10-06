import { useForm } from "../hooks/useForm.js";
import { Link } from "react-router";

export const RegisterPage = () => {
  const { formState, handleInputChange, handleReset } = useForm({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <label>
          Nombre
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apellido
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nombre de usuario
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
          />
        </label>
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
        <button type="submit">Enviar</button>
      </form>

      <Link to="/login">¿Ya tenés cuenta?</Link>
    </div>
  );
};
