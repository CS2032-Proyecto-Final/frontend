import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import BuscarLibros from './components/BuscarLibros';
import Ambientes from './components/Ambientes';
import MisReservas from './components/MisReservas';
import Configuracion from './components/Configuracion';

function App() {
  return (
    <Router>
      <div className="dashboard">
        <Sidebar />
        <main className="content">
          <header>
            <h1>Dashboard</h1>
          </header>
          <section>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/buscar-libros" element={<BuscarLibros />} />
              <Route path="/ambientes" element={<Ambientes />} />
              <Route path="/mis-reservas" element={<MisReservas />} />
              <Route path="/configuracion" element={<Configuracion />} />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
