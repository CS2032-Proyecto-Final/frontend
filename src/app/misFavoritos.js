// src/app/misFavoritos.js
import { toggleFavorite as toggleFavoriteAPI } from './buscarLibros';

export async function fetchFavoritesData() {
  const tenant_id = 'utec';
  const email = 'gino.daza@utec.edu.pe';
  const favoritesApiUrl = `https://9vaeq95yoh.execute-api.us-east-1.amazonaws.com/dev/favorite/my/all?tenant_id=${tenant_id}&email=${email}`;
  
  const favoritesResponse = await fetch(favoritesApiUrl);
  const favoritesData = await favoritesResponse.json();

  const currentFavorites = [];
  const pastFavorites = [];

  // Separar los favoritos actuales de los pasados y buscar detalles para cada uno
  for (const favorite of favoritesData.body) {
    const bookDetails = await fetchBookDetails(favorite.isbn, tenant_id, email);

    if (favorite.isFavorite) {
      currentFavorites.push(bookDetails);
    } else {
      pastFavorites.push(bookDetails);
    }
  }

  return { currentFavorites, pastFavorites };
}

async function fetchBookDetails(isbn, tenant_id, email) {
  const bookApiUrl = `https://fenlnd1g0c.execute-api.us-east-1.amazonaws.com/dev/books/search?tenant_id=${tenant_id}&email=${email}&page=1&limit=6&isbn=${isbn}`;
  const bookResponse = await fetch(bookApiUrl);
  const bookData = await bookResponse.json();

  return bookData.body.books[0];
}

export async function toggleFavorite(tenant_id, email, isbn) {
  return await toggleFavoriteAPI(tenant_id, email, isbn);
}
