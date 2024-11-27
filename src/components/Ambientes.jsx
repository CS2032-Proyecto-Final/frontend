import React, { useState, useEffect } from 'react';
import './../css/Ambientes.css'; // Archivo CSS que se menciona abajo

function Ambientes() {
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);
  const [availableAmbientes, setAvailableAmbientes] = useState([]);

  // Lista completa de ambientes con sus detalles
  const allAmbientes = [
    { id: 'computadoras', label: 'Computadoras', icon: '💻' },
    { id: 'salas_de_estudio', label: 'Salas de Estudio', icon: '📖' },
    { id: 'salas_de_talleres', label: 'Salas de Talleres', icon: '🛠️' },
  ];

  useEffect(() => {
    // Leer `env_types` del `localStorage` para filtrar los ambientes disponibles
    const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');
    const envTypes = tenantInfo.env_types || [];

    // Filtrar los ambientes basados en `env_types`
    const filteredAmbientes = allAmbientes.filter((ambiente) =>
      envTypes.includes(ambiente.id)
    );
    setAvailableAmbientes(filteredAmbientes);
  }, []);

  const handleAmbienteClick = (id) => {
    setSelectedAmbiente(id);
  };

  const handleBackClick = () => {
    setSelectedAmbiente(null);
  };

  return (
    <div className="ambientes-container">
      {selectedAmbiente ? (
        <div className="detalle-ambiente">
          <button className="volver-btn" onClick={handleBackClick}>Volver</button>
          <h2>
            {availableAmbientes.find((ambiente) => ambiente.id === selectedAmbiente)?.label}
          </h2>
          <p>
            Aquí puedes cargar datos específicos para {selectedAmbiente.replace('_', ' ')}.
          </p>
        </div>
      ) : (
        <>
          <h2>Ambientes</h2>
          <p>Reserva un ambiente de estudio, una sala de lectura o una computadora.</p>
          <div className="tarjetas-container">
            {availableAmbientes.map((ambiente) => (
              <div
                key={ambiente.id}
                className="tarjeta"
                onClick={() => handleAmbienteClick(ambiente.id)}
              >
                <div className="icono">{ambiente.icon}</div>
                <div className="label">{ambiente.label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Ambientes;
