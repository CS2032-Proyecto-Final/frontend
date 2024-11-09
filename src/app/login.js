// src/app/login.js

export async function fetchLoginData(email) {
    try {
      const response = await fetch(
        `https://e0e7mj9gh2.execute-api.us-east-1.amazonaws.com/dev/libraries/info?email=${email}`
      );
      const data = await response.json();
  
      if (data.statusCode === 200) {
        const parsedBody = JSON.parse(data.body);
        localStorage.setItem('tenantInfo', JSON.stringify(parsedBody));
        return { success: true, data: parsedBody };
      } else {
        return { success: false, message: 'Error en la respuesta de la API' };
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
      return { success: false, message: 'Error en la solicitud a la API' };
    }
  }
  