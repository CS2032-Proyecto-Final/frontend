import React, { useState } from 'react';
import './../css/Ambientes.css'; // Archivo CSS que se menciona abajo

function Ambientes() {
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);

  const ambientes = [
    { id: 'computadoras', label: 'Computadoras', icon: '💻' },
    { id: 'salas_de_estudio', label: 'Salas de Estudio', icon: '📖' },
    { id: 'salas_de_talleres', label: 'Salas de Talleres', icon: '🛠️' },
  ];

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
          <h2>{ambientes.find((ambiente) => ambiente.id === selectedAmbiente).label}</h2>
          <p>
            Aquí puedes cargar datos específicos para {selectedAmbiente.replace('_', ' ')}.
          </p>
        </div>
      ) : (
        <>
          <h2>Ambientes</h2>
          <p>Reserva un ambiente de estudio, una sala de lectura o una computadora.</p>
          <div className="tarjetas-container">
            {ambientes.map((ambiente) => (
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
