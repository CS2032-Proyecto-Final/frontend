// src/app/home.js

// Obtener la lista de bibliotecas (tenants) con sus logos y nombres completos
export async function fetchLibraries() {
    try {
      const response = await fetch('https://nbdn1lp357.execute-api.us-east-1.amazonaws.com/dev/libraries/all');
      if (!response.ok) throw new Error('Error al obtener la lista de bibliotecas');
      return await response.json();
    } catch (error) {
      console.error('Error en fetchLibraries:', error);
      return [];
    }
  }
  
  // Obtener los detalles de personalización para un tenant específico
  export async function fetchCustomization(tenantId) {
    try {
      const response = await fetch(
        `https://nbdn1lp357.execute-api.us-east-1.amazonaws.com/dev/libraries/customization?tenant_id=${tenantId}`
      );
      if (!response.ok) throw new Error('Error al obtener personalización de la biblioteca');
      return await response.json();
    } catch (error) {
      console.error('Error en fetchCustomization:', error);
      return null;
    }
  }
  