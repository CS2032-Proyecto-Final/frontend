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
import { TenantProvider } from './context/TenantContex';

function App() {
  return (
    <TenantProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <div>
                <Sidebar />
                <main className="content">
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
    </TenantProvider>
  );
}

export default App;
