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

export const reserveEnvironment = async (type, name, hour) => {
  const token = localStorage.getItem('userToken');
  try {
    const response = await fetch(`${BASE_URLS.RESERVATIONS}/reservation/environment`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, name, hour }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return { success: true, message: data.message || 'Ambiente reservado exitosamente' };
    } else {
      throw new Error(data.message || 'Error al reservar el ambiente');
    }
  } catch (error) {
    console.error('Error al reservar el ambiente:', error);
    return { success: false, message: error.message || 'Error en la solicitud' };
  }
};