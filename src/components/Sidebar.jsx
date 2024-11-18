// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../context/TenantContex';
import {
  FaHome,
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaHeart,
  FaCog
} from 'react-icons/fa';
import './../css/Sidebar.css';

function Sidebar() {
  const { tenantInfo } = useTenant();
  const logoUrl = tenantInfo?.logo_url || '/default-logo.png'; // Ruta predeterminada si no hay logo

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <img src={logoUrl} alt="Tenant Logo" className="tenant-logo" />
      </div>
      <h2>Bibliokuna</h2>
      <ul>
        <li><Link to="/inicio"><FaHome /> Inicio</Link></li>
        <li><Link to="/buscar-libros"><FaSearch /> Buscar Libros</Link></li>
        <li><Link to="/ambientes"><FaMapMarkerAlt /> Ambientes</Link></li>
        <li><Link to="/mis-reservas"><FaCalendarCheck /> Mis reservas</Link></li>
        <li><Link to="/mis-favoritos"><FaHeart /> Mis Favoritos</Link></li>
        <li><Link to="/configuracion"><FaCog /> Configuración</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
