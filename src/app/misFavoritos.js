import { BASE_URLS } from './app';
import { toggleFavorite as toggleFavoriteAPI } from './buscarLibros';

export async function fetchFavoritesData() {
  const token = localStorage.getItem('userToken');
  
  // URL para obtener los favoritos
  const favoritesApiUrl = `${BASE_URLS.FAVORITES}/favorite/my/all`;
  
  try {
    const favoritesResponse = await fetch(favoritesApiUrl, {
      headers: {
        'Authorization': token
      }
    });
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
    const booksApiUrl = `${BASE_URLS.BOOKS}/books/details?isbns=${JSON.stringify([...currentIsbns, ...pastIsbns])}`;
    const booksResponse = await fetch(booksApiUrl, {
      headers: {
        'Authorization': token
      }
    });
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

export async function toggleFavorite(isbn) {
  return await toggleFavoriteAPI(isbn);
}
