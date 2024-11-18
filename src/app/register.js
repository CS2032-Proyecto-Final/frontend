// src/app/register.js

export const registerUser = async (name, lastname, email, password) => {
    const tenant_id = localStorage.getItem('tenant_id'); // Obtener el tenant_id desde localStorage
  
    const requestBody = {
      tenant_id,
      email,
      password,
      firstname: name,
      lastname,
    };

    console.log(requestBody);
  
    try {
      const response = await fetch('https://n2tqx1stl1.execute-api.us-east-1.amazonaws.com/dev/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
  
      if (response.status === 200) {
        return { success: true, message: data.body.message };
      } else if (response.status === 409) {
        return { success: false, message: data.body.error };
      } else {
        return { success: false, message: 'Error en la respuesta de la API' };
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      return { success: false, message: 'Error en la solicitud a la API' };
    }
  };
  