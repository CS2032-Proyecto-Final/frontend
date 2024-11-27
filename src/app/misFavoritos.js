import { toggleFavorite as toggleFavoriteAPI } from './buscarLibros';

export async function fetchFavoritesData() {
  const tenant_id = localStorage.getItem('tenant_id');
  const email = localStorage.getItem('email');
  const favoritesApiUrl = `https://9vaeq95yoh.execute-api.us-east-1.amazonaws.com/dev/favorite/my/all?tenant_id=${tenant_id}&email=${email}`;
  
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

  // Llamar al nuevo endpoint para obtener los detalles de los libros
  const booksApiUrl = `https://fenlnd1g0c.execute-api.us-east-1.amazonaws.com/dev/books/details?tenant_id=${tenant_id}&isbns=${JSON.stringify([...currentIsbns, ...pastIsbns])}`;
  const booksResponse = await fetch(booksApiUrl);
  const booksData = await booksResponse.json();

  // Asegurarse de obtener el array de libros desde `booksData.body`
  const books = booksData.body || [];

  // Clasificar los libros en actuales y pasados según los ISBNs
  const currentFavorites = books
    .filter((book) => currentIsbns.includes(book.isbn))
    .map((book) => ({ ...book, isFavorite: true })); // Asegurar que `isFavorite` esté en true

  const pastFavorites = books
    .filter((book) => pastIsbns.includes(book.isbn))
    .map((book) => ({ ...book, isFavorite: false })); // Asegurar que `isFavorite` esté en false

  return { currentFavorites, pastFavorites };
}

export async function toggleFavorite(tenant_id, email, isbn) {
  return await toggleFavoriteAPI(tenant_id, email, isbn);
}
