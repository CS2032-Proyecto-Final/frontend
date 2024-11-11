// src/components/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Auth.css';
import { fetchLoginData } from '../app/login';
import { useTenant } from '../context/TenantContex';

function Login() {
  const [tenant_id, setTenant_id] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateTenantInfo } = useTenant();

  const handleLogin = async () => {
    const result = await fetchLoginData(tenant_id, email, password);

    if (result.success) {
      //updateTenantInfo(result.data.tenant_info);
      navigate('/');
    } else {
      setError(result.message || 'Email o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-text">{error}</p>}
      <input
        type="tenant_id"
        placeholder="Nombre de Biblioteca (en minúscula, ej: 'utec')"
        value={tenant_id}
        onChange={(e) => setTenant_id(e.target.value)}
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
      <button onClick={handleLogin}>Ingresar</button>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
