import { BASE_URLS } from './app';
import { toggleFavorite as toggleFavoriteAPI } from './buscarLibros';

export async function fetchFavoritesData() {
  const tenant_id = localStorage.getItem('tenant_id');
  const email = localStorage.getItem('email');
  
  // URL para obtener los favoritos
  const favoritesApiUrl = `${BASE_URLS.FAVORITES}/favorite/my/all?tenant_id=${tenant_id}&email=${email}`;
  
  try {
    const favoritesResponse = await fetch(favoritesApiUrl);
    const favoritesData = await favoritesResponse.json();

    const currentIsbns = [];
    const pastIsbns = [];

    // Separar los favoritos actuales de los pasados
    for (const favorite of favoritesData.body) {
      if (favorite.isFavorite) {
        currentIsbns.push(favorite.isbn);
      } else {
        pastIsbns.push(favorite.isbn);
      }
    }

    // URL para obtener los detalles de los libros
    const booksApiUrl = `${BASE_URLS.BOOKS}/books/details?tenant_id=${tenant_id}&isbns=${JSON.stringify([...currentIsbns, ...pastIsbns])}`;
    const booksResponse = await fetch(booksApiUrl);
    const booksData = await booksResponse.json();

    // Asegurarse de obtener el array de libros desde `booksData.body`
    const books = booksData.body || [];

    // Clasificar los libros en actuales y pasados según los ISBNs
    const currentFavorites = books
      .filter((book) => currentIsbns.includes(book.isbn))
      .map((book) => ({ ...book, isFavorite: true }));

    const pastFavorites = books
      .filter((book) => pastIsbns.includes(book.isbn))
      .map((book) => ({ ...book, isFavorite: false }));

    return { currentFavorites, pastFavorites };
  } catch (error) {
    console.error('Error fetching favorites data:', error);
    return { currentFavorites: [], pastFavorites: [] };
  }
}

export async function toggleFavorite(tenant_id, email, isbn) {
  return await toggleFavoriteAPI(tenant_id, email, isbn);
}
