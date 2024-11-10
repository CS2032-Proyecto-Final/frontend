// src/components/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './css/Auth.css';

const AuthLayout = () => {
  return (
    <div className="auth-wrapper">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
