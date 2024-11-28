// src/app/buscarLibros.js
import { BASE_URLS } from './app';

export const fetchBooks = async (tenant_id, email, page, limit, title = '', author_name = '', author_lastname = '', isbn = '') => {
  let url = `${BASE_URLS.BOOKS}/books/search?tenant_id=${tenant_id}&email=${email}&page=${page}&limit=${limit}`;

  if (isbn) {
    url += `&isbn=${isbn}`;
  } else {
    if (title) url += `&title=${title}`;
    if (author_name) url += `&author_name=${author_name}`;
    if (author_lastname) url += `&author_lastname=${author_lastname}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.statusCode === 200 && data.body) {
      console.log(data.body);
      return data.body;
    }
    throw new Error('Error fetching books');
  } catch (error) {
    console.error('Error fetching books:', error);
    return { favorites: false, books: [] };
  }
};

export const toggleFavorite = async (tenant_id, email, isbn) => {
  try {
    await fetch(`${BASE_URLS.FAVORITES}/favorite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_id, email, isbn }),
    });
    return true;
  } catch (error) {
    console.error('Error updating favorite:', error);
    return false;
  }
};

export const reserveBook = async (tenant_id, email, isbn) => {
  const token = localStorage.getItem('userToken');
  try {
    const response = await fetch(`${BASE_URLS.RESERVATIONS}/reservation/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: { tenant_id, email, isbn },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(response)
      return { success: true, message: data.message || 'Libro reservado exitosamente' };
    } else {
      throw new Error(data.message || 'Error al reservar el libro');
    }
  } catch (error) {
    console.error('Error al reservar el libro:', error);
    return { success: false, message: error.message || 'Error en la solicitud' };
  }
};
