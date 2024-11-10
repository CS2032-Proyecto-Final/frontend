// src/app/login.js

export async function fetchLoginData(email, password) {
    try {
      const response = await fetch(
        'https://hapkf0ag12.execute-api.us-east-1.amazonaws.com/dev/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tenant_id: 'utec',
            email: email,
            password: password
          })
        }
      );
      const data = await response.json();
  
      if (data.statusCode === 200) {
        const parsedBody = JSON.parse(data.body);
        localStorage.setItem('tenantInfo', JSON.stringify(parsedBody));
        return { success: true, data: parsedBody };
      } else {
        console.log(data);
        return { success: false, message: 'Error en la respuesta de la API' };
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
      return { success: false, message: 'Error en la solicitud a la API' };
    }
  }
  