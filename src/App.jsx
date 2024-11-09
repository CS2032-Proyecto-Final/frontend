// src/App.js
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import BuscarLibros from './components/BuscarLibros';
import Ambientes from './components/Ambientes';
import MisReservas from './components/MisReservas';
import Configuracion from './components/Configuracion';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  
  const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo')) || {};
  const sidebarColor = tenantInfo.color?.sidebar || '#333'; // Color predeterminado si no está definido
  const backgroundColor = tenantInfo.color?.background || '#f2f2f2';
  const contentColor = tenantInfo.color?.content || '#ffffff';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <div style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
              <Sidebar style={{ backgroundColor: sidebarColor }} />
              <main className="content" style={{ backgroundColor: contentColor }}>
                <div className="page-content">
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/buscar-libros" element={<BuscarLibros />} />
                    <Route path="/ambientes" element={<Ambientes />} />
                    <Route path="/mis-reservas" element={<MisReservas />} />
                    <Route path="/configuracion" element={<Configuracion />} />
                  </Routes>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
