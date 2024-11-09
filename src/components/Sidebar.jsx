import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
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
    </nav>
  );
}

export default Sidebar;
