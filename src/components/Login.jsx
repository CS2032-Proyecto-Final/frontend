// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const savedTenantId = localStorage.getItem('tenant_id');
    if (savedTenantId) {
      setTenant_id(savedTenantId);
    }
  }, []);

  const handleLogin = async () => {
    const result = await fetchLoginData(tenant_id, email, password);

    if (result.success) {
      updateTenantInfo(result.data.tenant_info);
      navigate('/inicio');
    } else {
      setError(result.message || 'Email o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-text">{error}</p>}
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
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}

export default Login;
