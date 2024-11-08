import './App.css'

function App() {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Bibliokuna</h2>
        <ul>
          <li>Inicio</li>
          <li>Buscar Libros</li>
          <li>Ambientes</li>
          <li>Mis reservas</li>
          <li>Configuración</li>
        </ul>
      </nav>
      <main className="content">
        <header>
          <h1>Dashboard</h1>
        </header>
        <section>
          <h2>Bienvenido a Bibliokuna</h2>
          <p>Aquí podrás reservar libros y ambientes de la biblioteca.</p>
        </section>
      </main>
    </div>
  )
}

export default App
