// src/components/Configuracion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../context/TenantContex';

function Configuracion() {
  const navigate = useNavigate();
  const { clearTenantInfo } = useTenant();

  const handleLogout = () => {
    clearTenantInfo();
    navigate('/');
  };

  return (
    <div>
      <h2>Configuración</h2>
      <p>Ajusta tus preferencias y configura tu cuenta.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Configuracion;
