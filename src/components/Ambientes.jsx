import React, { useState, useEffect } from 'react';
import { fetchAvailableEnvironments, reserveEnvironment } from '../app/ambientes';
import Toast from './Toast';
import './../css/Ambientes.css';

function Ambientes() {
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);
  const [availableAmbientes, setAvailableAmbientes] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [toastMessage, setToastMessage] = useState(''); // Para mostrar el mensaje del Toast

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
    const data = await fetchAvailableEnvironments(id);

    const grouped = data.reduce((acc, env) => {
      const existing = acc.find((item) => item.name === env.name);
      if (existing) {
        existing.hours.push({ hour: env.hour, status: env.status });
      } else {
        acc.push({ ...env, hours: [{ hour: env.hour, status: env.status }] });
      }
      return acc;
    }, []);

    setEnvironments(grouped.map((item) => ({ ...item, icon: allAmbientes.find((amb) => amb.id === id)?.icon })));
    setSelectedAmbiente(id);
  };

  const handleReserveClick = async (type, name, hour) => {
    const result = await reserveEnvironment(type, name, hour);
    if (result.success) {
      setToastMessage(result.message);

      // Actualizar dinámicamente el estado de "environments"
      setEnvironments((prevEnvironments) =>
        prevEnvironments.map((env) =>
          env.name === name
            ? {
                ...env,
                hours: env.hours.map((slot) =>
                  slot.hour === hour ? { ...slot, status: 'unavailable' } : slot
                ),
              }
            : env
        )
      );
    } else {
      setToastMessage('Error al reservar el ambiente.');
    }
  };

  const handleCloseToast = () => {
    setToastMessage('');
  };

  const handleBackClick = () => {
    setSelectedAmbiente(null);
    setEnvironments([]);
  };

  return (
    <div className="ambientes-container">
      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
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
                  <h3>
                    {env.icon} {env.name}
                  </h3>
                  <p><strong>Horarios disponibles:</strong></p>
                  <div className="time-slot-container">
                    {env.hours.map((slot, i) => (
                      <button
                        key={i}
                        className={`time-slot ${slot.status === 'available' ? 'available' : 'unavailable'}`}
                        disabled={slot.status === 'unavailable'}
                        onClick={() => handleReserveClick(selectedAmbiente, env.name, slot.hour)}
                      >
                        {slot.hour < 10 ? `0${slot.hour}:00` : `${slot.hour}:00`}
                      </button>
                    ))}
                  </div>
                  <p><strong>Capacidad:</strong> {env.capacity} personas</p>
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
