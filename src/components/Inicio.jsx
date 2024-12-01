import React from 'react';
import './../css/Inicio.css';

function Inicio() {
  // Obtener datos del localStorage
  const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');
  const { full_name, reserv_env_time, reserv_book_time, email_suffix } = tenantInfo;

  // Generar el mensaje de bienvenida de forma segura
  let bienvenida;
  if (full_name) {
    if (full_name.startsWith('Universidad')) {
      bienvenida = `Bienvenido a la biblioteca de la ${full_name}`;
    } else if (full_name.startsWith('Biblioteca')) {
      bienvenida = `Bienvenido a la ${full_name}`;
    } else {
      bienvenida = `Bienvenido a la biblioteca ${full_name}`;
    }
  } else {
    bienvenida = 'Bienvenido a tu sistema de biblioteca';
  }

  // Servicios disponibles (fijos)
  const serviciosDisponibles = [
    { icon: '📚', name: 'Búsqueda y Reserva de Libros' },
    { icon: '🏢', name: 'Reserva de Ambientes' },
  ];

  // Formatear singular/plural
  const formatTime = (time, singular, plural) => (time === 1 ? `${time} ${singular}` : `${time} ${plural}`);

  const contactEmail = email_suffix ? `contacto@${email_suffix}` : 'contacto@biblioteca.com';

  return (
    <div className="inicio-container">
      <h1>{bienvenida}</h1>
      <div className="inicio-box">
        <h3>Detalles de Reservas</h3>
        <ul>
          <li>
            <strong>Tiempo de reserva para ambientes:</strong>{' '}
            {reserv_env_time ? formatTime(reserv_env_time, 'hora', 'horas') : 'No disponible'}
          </li>
          <li>
            <strong>Tiempo de reserva para libros:</strong>{' '}
            {reserv_book_time ? formatTime(reserv_book_time, 'día', 'días') : 'No disponible'}
          </li>
        </ul>
      </div>
      <div className="inicio-box">
        <h3>Servicios Disponibles</h3>
        <div className="services-list">
          {serviciosDisponibles.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <span className="service-name">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="inicio-box">
        <h3>Información de Contacto</h3>
        <p><strong>Email:</strong> {contactEmail}</p>
        <p><strong>Dirección:</strong> Av. Universitaria 123, Ciudad Ejemplo</p>
        <p><strong>Horario:</strong> Lunes a Viernes, 8:00 AM - 6:00 PM</p>
      </div>
    </div>
  );
}

export default Inicio;
