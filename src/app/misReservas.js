import { BASE_URLS } from './app';

export const fetchBookReservations = async (status) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(
        `${BASE_URLS.RESERVATIONS}/reservation/book?status=${status}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
  
      if (data.statusCode !== 200) {
        throw new Error('Error fetching book reservations');
      }
  
      return data.body.reservations.map((res) => ({ ...res, type: 'book' }));
    } catch (error) {
      console.error('Error en fetchBookReservations:', error);
      return [];
    }
  };
  
  export const fetchEnvironmentReservations = async (status) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(
        `${BASE_URLS.RESERVATIONS}/reservation/environment?status=${status}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
  
      if (data.statusCode !== 200) {
        throw new Error('Error fetching environment reservations');
      }
  
      return data.body.reservations.map((res) => ({ ...res, type: 'env' }));
    } catch (error) {
      console.error('Error en fetchEnvironmentReservations:', error);
      return [];
    }
  };
  