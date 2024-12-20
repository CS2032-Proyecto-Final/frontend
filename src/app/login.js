// src/app/login.js
import { BASE_URLS } from './app';

export async function fetchLoginData(tenant_id, email, password) {
  try {
    const response = await fetch(
      `${BASE_URLS.USERS}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenant_id: tenant_id,
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (data.statusCode === 200) {
      console.log('user_data: ', data.body);
      localStorage.setItem('userToken', data.body.token);
      return { success: true, data: data.body };
    } else {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error('Error en la solicitud: ', error);
    return { success: false, message: 'Error en la solicitud a la API' };
  }
}
