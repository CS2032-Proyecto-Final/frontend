// src/components/MainAppLayout.jsx
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useTenant } from '../context/TenantContex';
import '../App.css';

const MainAppLayout = () => {
  const { tenantInfo } = useTenant();

  useEffect(() => {
    if (tenantInfo) {
      document.documentElement.style.setProperty('--sidebar-color', tenantInfo.color.sidebar || '#333');
      document.documentElement.style.setProperty('--background-color', tenantInfo.color.background || '#f2f2f2');
      document.documentElement.style.setProperty('--content-color', tenantInfo.color.content || '#ffffff');
    }
  }, [tenantInfo]);

  return (
    <div>
      <Sidebar />
      <main className="content">
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
