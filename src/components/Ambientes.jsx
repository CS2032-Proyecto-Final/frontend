import React, { useState, useEffect } from 'react';
import { fetchAvailableEnvironments } from '../app/ambientes';
import './../css/Ambientes.css';

function Ambientes() {
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);
  const [availableAmbientes, setAvailableAmbientes] = useState([]);
  const [environments, setEnvironments] = useState([]);

  const allAmbientes = [
    { id: 'computadoras', label: 'Computadoras', icon: '💻' },
    { id: 'salas_de_estudio', label: 'Salas de Estudio', icon: '📖' },
    { id: 'salas_de_talleres', label: 'Salas de Talleres', icon: '🛠️' },
  ];

  useEffect(() => {
    const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');
    const envTypes = tenantInfo.env_types || [];
    const filteredAmbientes = allAmbientes.filter((ambiente) =>
      envTypes.includes(ambiente.id)
    );
    setAvailableAmbientes(filteredAmbientes);
  }, []);

  const handleAmbienteClick = async (id) => {
    const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');

    // Cargar los ambientes desde el backend
    const data = await fetchAvailableEnvironments(id);

    // Agrupar los ambientes por nombre
    const grouped = data.reduce((acc, env) => {
      const existing = acc.find((item) => item.name === env.name);
      if (existing) {
        existing.hours.push(env.hour);
      } else {
        acc.push({ ...env, hours: [env.hour] });
      }
      return acc;
    }, []);

    setEnvironments(grouped);
    setSelectedAmbiente(id);
  };

  const handleBackClick = () => {
    setSelectedAmbiente(null);
    setEnvironments([]);
  };

  const getIconForType = (type) => {
    const ambiente = allAmbientes.find((amb) => amb.id === type);
    return ambiente ? ambiente.icon : '❓'; // Icono por defecto si no coincide
  };

  return (
    <div className="ambientes-container">
      {selectedAmbiente ? (
        <div className="detalle-ambiente">
          <button className="volver-btn" onClick={handleBackClick}>
            Volver
          </button>
          <h2>
            {availableAmbientes.find((amb) => amb.id === selectedAmbiente)?.label}
          </h2>
          <div className="ambiente-detail">
            {environments.length > 0 ? (
              environments.map((env, index) => (
                <div key={index} className="ambiente-card">
                  <h3>{env.name}</h3>
                  <div className="icono">{getIconForType(selectedAmbiente)}</div>
                  <p>Horarios disponibles:</p>
                  <div className="time-slot-container">
                    {env.hours.map((hour, i) => (
                      <button key={i} className="time-slot">
                        {hour < 10 ? `0${hour}:00` : `${hour}:00`}
                      </button>
                    ))}
                  </div>
                  <p>
                    <strong>Capacidad:</strong> {env.capacity} personas
                  </p>
                </div>
              ))
            ) : (
              <p>No hay ambientes disponibles en esta categoría.</p>
            )}
          </div>
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
