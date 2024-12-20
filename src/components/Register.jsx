// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../css/Auth.css';
import { registerUser } from '../app/register';

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita el recargado de página
    setError('');
    setSuccessMessage('');

    const result = await registerUser(name, lastname, email, password);

    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => navigate('/login'), 1000);
    } else {
      setError(result.body.error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
