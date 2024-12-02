import React, { useEffect, useState } from 'react';
import { fetchBooks, toggleFavorite, reserveBook } from '../app/buscarLibros';
import Toast from './Toast'; // Importar el Toast
import './../css/BuscarLibros.css';

function BuscarLibros() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [favoritesLoaded, setFavoritesLoaded] = useState(true);
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [showDescriptions, setShowDescriptions] = useState({});
  const [toastMessage, setToastMessage] = useState(''); 
  const limit = 6;

  const loadBooks = async () => {
    const data = await fetchBooks(page, limit, title, authorName, authorLastName);
    setFavoritesLoaded(data.favorites);
    setBooks(data.books);
    setHasMoreBooks(data.books.length === limit);
  };

  const loadBooksByIsbn = async () => {
    const data = await fetchBooks(page, limit, '', '', '', isbn);
    setFavoritesLoaded(data.favorites);
    setBooks(data.books);
    setHasMoreBooks(false);
  };

  useEffect(() => {
    loadBooks();
  }, [page]);

  const handleNextPage = () => {
    if (hasMoreBooks) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleToggleFavorite = async (isbn) => {
    const success = await toggleFavorite(isbn);

    if (success) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.isbn === isbn ? { ...book, isFavorite: !book.isFavorite } : book
        )
      );
    }
  };

  const handleReserveBook = async (isbn, availableQuantity) => {
    if (availableQuantity <= 0) {
      setToastMessage('Error: Este libro no está disponible para reservar.');
      return;
    }

    const result = await reserveBook(isbn);

    if (result.success) {
      setToastMessage(result.message); // Mostrar el Toast con el mensaje
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.isbn === isbn ? { ...book, quantity: book.quantity - 1 } : book
        )
      );
    } else {
      setToastMessage(`Error: ${result.message}`);
    }
  };

  const handleCloseToast = () => {
    setToastMessage('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadBooks();
  };

  const handleIsbnSearch = (e) => {
    e.preventDefault();
    loadBooksByIsbn();
  };

  const toggleDescription = (isbn) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [isbn]: !prev[isbn],
    }));
  };

  return (
    <div className="content-wrapper">
      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
      <div className="buscar-libros-container">
        <h2>Buscar Libros</h2>
        {!favoritesLoaded && <p className="error-text">No se pudieron cargar los favoritos.</p>}

        {/* Búsqueda por ISBN */}
        <form onSubmit={handleIsbnSearch} className="isbn-search">
          <input
            type="text"
            placeholder="ISBN: (ex: 9780073523323)"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Buscar por ISBN</button>
        </form>

        {/* Formulario de búsqueda por título y autor */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="search-input small-input"
          />
          <input
            type="text"
            placeholder="Nombre del Autor"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="search-input small-input"
          />
          <input
            type="text"
            placeholder="Apellido del Autor"
            value={authorLastName}
            onChange={(e) => setAuthorLastName(e.target.value)}
            className="search-input small-input"
          />
          <button type="submit" className="search-button small-button">Buscar</button>
        </form>

        <ul className="books-list">
          {books.map((book) => (
            <li key={book.isbn} className="book-item">
              <div className="book-content">
                <img src={book.cover_url} alt={`${book.title} cover`} className="book-cover" />
                <div className="book-details">
                  <div className="book-header">
                    <h4 className="book-title">{book.title}</h4>
                    <button
                      className={`favorite-button ${book.isFavorite ? 'favorite' : ''}`}
                      onClick={() => handleToggleFavorite(book.isbn)}
                    >
                      {book.isFavorite ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <p><strong>Autor:</strong> {book.author_name} {book.author_lastname}</p>
                  <p><strong>Páginas:</strong> {book.pages}</p>
                  <p><strong>Cantidad:</strong> {book.stock}</p>
                  <p><strong>Ubicación:</strong> {book.ubicacion || 'No disponible'}</p>
                  <p><strong>Disponible:</strong> {book.quantity}</p>
                  <div className="actions">
                    <button
                      onClick={() => toggleDescription(book.isbn)}
                      className="description-toggle"
                    >
                      {showDescriptions[book.isbn] ? 'Ocultar descripción' : 'Mostrar descripción'}
                    </button>
                    <button
                      className={`reserve-button ${book.quantity <= 0 ? 'disabled' : ''}`}
                      onClick={() => handleReserveBook(book.isbn, book.quantity)}
                      disabled={book.quantity <= 0}
                    >
                      Reservar
                    </button>
                  </div>
                  {showDescriptions[book.isbn] && (
                    <p className="book-description">{book.description}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="pagination-buttons">
          <button onClick={handlePreviousPage} disabled={page === 1}>Anterior</button>
          <button onClick={handleNextPage} disabled={!hasMoreBooks}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}

export default BuscarLibros;
