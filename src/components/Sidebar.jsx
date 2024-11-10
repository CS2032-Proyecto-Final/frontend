// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Sidebar.css';
import { useTenant } from '../context/TenantContex';

function Sidebar() {
  const navigate = useNavigate();
  const { clearTenantInfo } = useTenant();

  const handleLogout = () => {
    clearTenantInfo();
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <h2>Bibliokuna</h2>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/buscar-libros">Buscar Libros</Link></li>
        <li><Link to="/ambientes">Ambientes</Link></li>
        <li><Link to="/mis-reservas">Mis reservas</Link></li>
        <li><Link to="/configuracion">Configuración</Link></li>
      </ul>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  );
}

export default Sidebar;
