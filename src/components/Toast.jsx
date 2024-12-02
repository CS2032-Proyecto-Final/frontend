import React, { useEffect } from 'react';
import './../css/Toast.css';

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Desaparece automáticamente después de 3 segundos
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast">
        <span className="toast-icon">ℹ️</span>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
