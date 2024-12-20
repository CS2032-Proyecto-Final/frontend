// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../css/Auth.css';
import { fetchLoginData } from '../app/login';
import { useTenant } from '../context/TenantContex';

function Login() {
  const [tenant_id, setTenant_id] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateTenantInfo } = useTenant();

  useEffect(() => {
    const savedTenantId = localStorage.getItem('tenant_id');
    if (savedTenantId) {
      setTenant_id(savedTenantId);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el recargado de página
    const result = await fetchLoginData(tenant_id, email, password);

    if (result.success) {
      updateTenantInfo(result.data.tenant_info.body);
      localStorage.setItem('email', email);
      navigate('/inicio');
    } else {
      setError(result.body.error || 'Email o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}

export default Login;
