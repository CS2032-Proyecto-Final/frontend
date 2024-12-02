import React, { useState } from 'react';
import './../css/MisReservas.css';

function MisReservas() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'libros', label: 'Mis Reservas de Libros', icon: '📚' },
    { id: 'ambientes', label: 'Mis Reservas de Ambientes', icon: '🏢' },
  ];

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleBackClick = () => {
    setSelectedOption(null);
  };

  return (
    <div className="misreservas-container">
      {selectedOption ? (
        <div className="detalle-reservas">
          <button className="volver-btn" onClick={handleBackClick}>
            Volver
          </button>
          <h2>
            {options.find((option) => option.id === selectedOption)?.label}
          </h2>
          {/* Aquí se implementará la funcionalidad específica para libros o ambientes */}
          <p>Funcionalidad pendiente de implementar...</p>
        </div>
      ) : (
        <>
          <h2>Mis Reservas</h2>
          <p>Selecciona una categoría para ver tus reservas.</p>
          <div className="tarjetas-container">
            {options.map((option) => (
              <div
                key={option.id}
                className="tarjeta"
                onClick={() => handleOptionClick(option.id)}
              >
                <div className="icono">{option.icon}</div>
                <div className="label">{option.label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MisReservas;
