// src/context/TenantContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const TenantContext = createContext();

// Hook para acceder al contexto más fácilmente
export const useTenant = () => useContext(TenantContext);

export const TenantProvider = ({ children }) => {
  const [tenantInfo, setTenantInfo] = useState(() => {
    // Intentar cargar el tenantInfo desde localStorage si existe
    const savedTenant = localStorage.getItem('tenantInfo');
    return savedTenant ? JSON.parse(savedTenant) : {};
  });

  useEffect(() => {
    // Aplicar colores desde tenantInfo cuando cambia
    if (tenantInfo.color) {
      document.documentElement.style.setProperty('--sidebar-color', tenantInfo.color.sidebar || '#333');
      document.documentElement.style.setProperty('--background-color', tenantInfo.color.background || '#f2f2f2');
      document.documentElement.style.setProperty('--content-color', tenantInfo.color.content || '#ffffff');
    }
  }, [tenantInfo]);

  // Función para actualizar el tenantInfo y guardarlo en localStorage
  const updateTenantInfo = (newTenantInfo) => {
    setTenantInfo(newTenantInfo);
    localStorage.setItem('tenantInfo', JSON.stringify(newTenantInfo));
  };

  // Función para limpiar tenantInfo al cerrar sesión
  const clearTenantInfo = () => {
    setTenantInfo({});
    localStorage.removeItem('tenantInfo');
  };

  return (
    <TenantContext.Provider value={{ tenantInfo, updateTenantInfo, clearTenantInfo }}>
      {children}
    </TenantContext.Provider>
  );
};
