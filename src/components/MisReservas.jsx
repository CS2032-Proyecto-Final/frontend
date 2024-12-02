import React, { useState, useEffect } from 'react';
import { fetchBookReservations, fetchEnvironmentReservations } from '../app/misReservas';
import './../css/MisReservas.css';

function MisReservas() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = [
    { id: 'libros', label: 'Mis Reservas de Libros', icon: '📚' },
    { id: 'ambientes', label: 'Mis Reservas de Ambientes', icon: '🏢' },
  ];

  const statusIcons = {
    pending: '🟡',
    expired: '🔴',
    returned: '✅',
    available: '🟢',
    completed: '✅',
  };

  useEffect(() => {
    if (selectedOption) {
      loadReservations(selectedOption);
    }
  }, [selectedOption]);

  const loadReservations = async (type) => {
    setLoading(true);
    try {
      let data = [];
      if (type === 'libros') {
        const expired = await fetchBookReservations('expired');
        const pending = await fetchBookReservations('pending');
        const returned = await fetchBookReservations('returned');
        data = [...expired, ...pending, ...returned];
      } else if (type === 'ambientes') {
        const pending = await fetchEnvironmentReservations('pending');
        const other = await fetchEnvironmentReservations('available'); // Maneja otros estados como completado.
        data = [...pending, ...other];
      }
      setReservations(data);
    } catch (error) {
      console.error(`Error fetching ${type} reservations:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleBackClick = () => {
    setSelectedOption(null);
    setReservations([]);
  };

  const renderReservationItem = (reservation) => {
    return (
      <div key={reservation.res_id} className="reservation-card">
        <div className="reservation-icon">
          {statusIcons[reservation.status] || '❓'}
        </div>
        <div className="reservation-details">
          {reservation.type === 'book' ? (
            <>
              <h4>{reservation.title}</h4>
              <p>
                <strong>Autor:</strong> {reservation.author_name}{' '}
                {reservation.author_lastname}
              </p>
              <p>
                <strong>Estado:</strong> {reservation.status}
              </p>
              <p>
                <strong>Fecha de entrega:</strong> {reservation.max_return_date}
              </p>
            </>
          ) : (
            <>
              <h4>Ambiente: {reservation.env_name}</h4>
              <p>
                <strong>Fecha:</strong> {reservation.date}
              </p>
              <p>
                <strong>Hora:</strong> {reservation.hour}:00
              </p>
              <p>
                <strong>Capacidad:</strong> {reservation.capacity}
              </p>
              <p>
                <strong>Estado:</strong> {reservation.status === 'pending' ? 'Pendiente' : 'Completado'}
              </p>
            </>
          )}
        </div>
      </div>
    );
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
          {loading ? (
            <p>Cargando reservas...</p>
          ) : reservations.length > 0 ? (
            <div className="reservations-list">
              {reservations.map(renderReservationItem)}
            </div>
          ) : (
            <p>No tienes reservas en esta categoría.</p>
          )}
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
