import React, { useEffect, useState } from 'react';
import { fetchFavoritesData, toggleFavorite } from '../app/misFavoritos';
import './../css/BuscarLibros.css';

function MisFavoritos() {
  const [currentFavorites, setCurrentFavorites] = useState([]);
  const [pastFavorites, setPastFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const { currentFavorites, pastFavorites } = await fetchFavoritesData();
    setCurrentFavorites(currentFavorites);
    setPastFavorites(pastFavorites);
  };

  const handleToggleFavorite = async (isbn) => {
    const tenant_id = localStorage.getItem('tenant_id');
    const email = localStorage.getItem('email');
    const success = await toggleFavorite(isbn);

    if (success) {
      const isCurrentlyFavorite = currentFavorites.some((book) => book.isbn === isbn);

      if (isCurrentlyFavorite) {
        setCurrentFavorites((prevFavorites) =>
          prevFavorites.filter((book) => book.isbn !== isbn)
        );
        setPastFavorites((prevPast) => {
          const updatedBook = currentFavorites.find((book) => book.isbn === isbn);
          if (updatedBook) {
            updatedBook.isFavorite = false;
            return [...prevPast, updatedBook];
          }
          return prevPast;
        });
      } else {
        setPastFavorites((prevPast) =>
          prevPast.filter((book) => book.isbn !== isbn)
        );
        setCurrentFavorites((prevFavorites) => {
          const updatedBook = pastFavorites.find((book) => book.isbn === isbn);
          if (updatedBook) {
            updatedBook.isFavorite = true;
            return [...prevFavorites, updatedBook];
          }
          return prevFavorites;
        });
      }
    }
  };

  return (
    <div className="content-wrapper">
      <div className="buscar-libros-container">
        <h2>Mis Favoritos</h2>
        <h3>Favoritos Actuales</h3>
        <ul className="books-list">
          {currentFavorites.map((book) => (
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
                  <p><strong>Cantidad:</strong> {book.quantity}</p>
                  <p><strong>Ubicación:</strong> {book.ubicacion || 'No disponible'}</p>
                  <p><strong>Disponible:</strong> {book.stock}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h3>Favoritos Pasados</h3>
        <ul className="books-list">
          {pastFavorites.map((book) => (
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
                  <p><strong>Cantidad:</strong> {book.quantity}</p>
                  <p><strong>Ubicación:</strong> {book.ubicacion || 'No disponible'}</p>
                  <p><strong>Disponible:</strong> {book.stock}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MisFavoritos;
