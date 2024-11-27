// src/app/ambientes.js
import { BASE_URLS } from './app';

export async function fetchAvailableEnvironments(tenant_id, type) {
  try {
    const response = await fetch(
      `${BASE_URLS.ENVIRONMENTS}/environment/list?tenant_id=${tenant_id}&type=${type}`
    );
    const data = await response.json();

    if (data.statusCode !== 200) throw new Error('Error fetching environments');
    return data.body.environments;
  } catch (error) {
    console.error('Error en fetchAvailableEnvironments:', error);
    return [];
  }
}
