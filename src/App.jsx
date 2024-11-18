// src/App.jsx
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Inicio from './components/Inicio';
import BuscarLibros from './components/BuscarLibros';
import Ambientes from './components/Ambientes';
import MisReservas from './components/MisReservas';
import Configuracion from './components/Configuracion';
import MisFavoritos from './components/MisFavoritos'; // Nueva importación
import Login from './components/Login';
import Register from './components/Register';
import AuthLayout from './components/AuthLayout';
import { TenantProvider } from './context/TenantContex';

function App() {
  return (
    <TenantProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            path="*"
            element={
              <div>
                <Sidebar />
                <main className="content">
                  <div className="page-content">
                    <Routes>
                      <Route path="/inicio" element={<Inicio />} />
                      <Route path="/buscar-libros" element={<BuscarLibros />} />
                      <Route path="/ambientes" element={<Ambientes />} />
                      <Route path="/mis-reservas" element={<MisReservas />} />
                      <Route path="/configuracion" element={<Configuracion />} />
                      <Route path="/mis-favoritos" element={<MisFavoritos />} /> {/* Nueva ruta */}
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
