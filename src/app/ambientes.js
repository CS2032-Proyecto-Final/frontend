// src/app/ambientes.js
import { BASE_URLS } from './app';

export async function fetchAvailableEnvironments(type) {
  try {
    const token = localStorage.getItem('userToken');
    const response = await fetch(
      `${BASE_URLS.ENVIRONMENTS}/environment/list?type=${type}`, {
        headers: {
          'Authorization': token
        }
      }
    );
    const data = await response.json();

    if (data.statusCode !== 200) throw new Error('Error fetching environments');
    return data.body.environments;
  } catch (error) {
    console.error('Error en fetchAvailableEnvironments:', error);
    return [];
  }
}
