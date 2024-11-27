// src/app/home.js
import { BASE_URLS } from './app';

// Obtener la lista de bibliotecas (tenants) con sus logos y nombres completos
export async function fetchLibraries() {
  try {
    const response = await fetch(`${BASE_URLS.LIBRARIES}/libraries/all`);
    const data = await response.json();
    
    if (data.statusCode !== 200) throw new Error('Error al obtener la lista de bibliotecas');
    return data.body;
    
  } catch (error) {
    console.error('Error en fetchLibraries:', error);
    return [];
  }
}

// Obtener los detalles de personalización para un tenant específico
export async function fetchCustomization(tenantId) {
  try {
    const response = await fetch(
      `${BASE_URLS.LIBRARIES}/libraries/customization?tenant_id=${tenantId}`
    );
    const data = await response.json();

    if (data.statusCode !== 200) throw new Error('Error al obtener personalización de la biblioteca');
    return data.body; // Retorna solo el contenido de "body" con la personalización
    
  } catch (error) {
    console.error('Error en fetchCustomization:', error);
    return null;
  }
}
