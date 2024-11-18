// src/components/AuthLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './../css/Auth.css';

const AuthLayout = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const customizationData = JSON.parse(localStorage.getItem('customization') || '{}');
    setBackgroundImage(customizationData.background_url || '/images/auth_background.png');
  }, []);

  return (
    <div
      className="auth-wrapper"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
