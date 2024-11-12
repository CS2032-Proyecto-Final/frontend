// src/components/BuscarLibros.jsx

import React, { useEffect, useState } from 'react';
import { fetchBooks, toggleFavorite } from '../app/buscarLibros';
import './css/BuscarLibros.css';

function BuscarLibros() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [favoritesLoaded, setFavoritesLoaded] = useState(true); 
  const limit = 6;

  useEffect(() => {
    const loadBooks = async () => {
      const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');
      const tenant_id = tenantInfo.tenant_id;
      const email = localStorage.getItem('email');
      const data = await fetchBooks(tenant_id, email, page, limit);
      
      setFavoritesLoaded(data.favorites); // Verificar si los favoritos están disponibles
      setBooks(data.books);
      setHasMoreBooks(data.books.length === limit);
    };
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
    const tenant_id = localStorage.getItem('tenant_id');
    const email = localStorage.getItem('email');
    const success = await toggleFavorite(tenant_id, email, isbn);

    if (success) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.isbn === isbn ? { ...book, isFavorite: !book.isFavorite } : book
        )
      );
    }
  };

  return (
    <div className="content-wrapper">
      <div className="buscar-libros-container">
        <h2>Buscar Libros</h2>
        {!favoritesLoaded && (
          <p className="error-text">No se pudieron cargar los favoritos.</p>
        )}
        <p>Encuentra libros disponibles en la biblioteca y revisa sus detalles.</p>
        <ul className="books-list">
          {books.map((book) => (
            <li key={book.isbn} className="book-item">
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
              <p><strong>Cantidad:</strong> {book.quantity}</p>
              <p><strong>Stock:</strong> {book.stock}</p>
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
