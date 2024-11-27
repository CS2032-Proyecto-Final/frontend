import React, { useState, useEffect } from 'react';
import { fetchAvailableEnvironments } from '../app/ambientes';
import './../css/Ambientes.css';

function Ambientes() {
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);
  const [availableAmbientes, setAvailableAmbientes] = useState([]);
  const [environments, setEnvironments] = useState([]);

  // Lista completa de ambientes con sus detalles
  const allAmbientes = [
    { id: 'computadoras', label: 'Computadoras', icon: '💻' },
    { id: 'salas_de_estudio', label: 'Salas de Estudio', icon: '📖' },
    { id: 'salas_de_talleres', label: 'Salas de Talleres', icon: '🛠️' },
  ];

  useEffect(() => {
    const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');
    const envTypes = tenantInfo.env_types || [];

    // Filtrar los ambientes basados en `env_types`
    const filteredAmbientes = allAmbientes.filter((ambiente) =>
      envTypes.includes(ambiente.id)
    );
    setAvailableAmbientes(filteredAmbientes);
  }, []);

  const handleAmbienteClick = async (id) => {
    const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');
    const tenant_id = tenantInfo.tenant_id;

    // Cargar los ambientes desde el backend
    const data = await fetchAvailableEnvironments(tenant_id, id);
    setEnvironments(data);
    setSelectedAmbiente(id);
  };

  const handleBackClick = () => {
    setSelectedAmbiente(null);
    setEnvironments([]); // Limpiar los ambientes seleccionados
  };

  const getIconForType = (type) => {
    const ambiente = allAmbientes.find((amb) => amb.id === type);
    return ambiente ? ambiente.icon : '❓'; // Default icon if type is unknown
  };

  return (
    <div className="ambientes-container">
      {selectedAmbiente ? (
        <div className="detalle-ambiente">
          <button className="volver-btn" onClick={handleBackClick}>Volver</button>
          <h2>
            {availableAmbientes.find((ambiente) => ambiente.id === selectedAmbiente)?.label}
          </h2>
          <div className="environments-container">
            {environments.length > 0 ? (
              environments.map((env, index) => (
                <div key={index} className={`environment-card ${env.status}`}>
                  <h3>{env.name}</h3>
                  <div className="icono">{getIconForType(selectedAmbiente)}</div>
                  <p><strong>Hora:</strong> {env.hour}:00</p>
                  <p>
                    <strong>Estado:</strong> {env.status === 'available' ? 'Disponible' : 'No disponible'}
                  </p>
                  <p><strong>Capacidad:</strong> {env.capacity}</p>
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
