// src/components/Home.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLibraries, fetchCustomization } from '../app/home';
import './css/Home.css';

function Home() {
  const [libraries, setLibraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    const loadLibraries = async () => {
      const data = await fetchLibraries();
      setLibraries(data);
    };
    loadLibraries();
  }, []);

  const handleLibraryClick = async (tenantId) => {
    localStorage.setItem('tenant_id', tenantId);

    const customizationData = await fetchCustomization(tenantId);
    if (customizationData) {
      localStorage.setItem('customization', JSON.stringify(customizationData));
    }

    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Bienvenido a<br />Bibliokuna</h1>
      </div>
      <div className="libraries-section">
        <h2 className="libraries-title">Bibliotecas disponibles</h2>
        <div className="libraries-grid">
          {libraries.map((library) => (
            <div
              key={library.tenant_id}
              className="library-card"
              onClick={() => handleLibraryClick(library.tenant_id)}
            >
              <img src={library.logo_url} alt={`${library.full_name} logo`} />
              <h2>{library.full_name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
