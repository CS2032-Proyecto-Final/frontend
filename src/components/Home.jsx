// src/components/Home.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLibraries, fetchCustomization } from '../app/home';
import './css/Home.css';

function Home() {
  const [libraries, setLibraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear()

    // Llama a fetchLibraries para cargar las bibliotecas
    const loadLibraries = async () => {
      const data = await fetchLibraries();
      setLibraries(data);
    };
    loadLibraries();
  }, []);

  // Maneja el clic en una tarjeta y guarda la personalización en localStorage
  const handleLibraryClick = async (tenantId) => {
    localStorage.setItem('tenant_id', tenantId);

    // Llama a fetchCustomization para obtener los detalles de personalización
    const customizationData = await fetchCustomization(tenantId);
    if (customizationData) {
      localStorage.setItem('customization', JSON.stringify(customizationData));
    }

    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Bibliokuna</h1>
      <div className="libraries-grid">
        {libraries.map((library) => (
          <div
            key={library.tenant_id}
            className="library-card"
            onClick={() => handleLibraryClick(library.tenant_id)}
          >
            <img src={library.photo_url} alt={`${library.full_name} logo`} />
            <h2>{library.full_name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
