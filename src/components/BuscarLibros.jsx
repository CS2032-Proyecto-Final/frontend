import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../app/buscarLibros';
import './css/BuscarLibros.css';

function BuscarLibros() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      const tenantInfo = JSON.parse(localStorage.getItem('tenantInfo') || '{}');
      const tenant_id = tenantInfo.tenant_id;
      const data = await fetchBooks(page, tenant_id);
      setBooks(data);
      setHasMoreBooks(data.length === 6); 
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

  return (
    <div className="content-wrapper">
      <div className="buscar-libros-container">
        <h2>Buscar Libros</h2>
        <p>Encuentra libros disponibles en la biblioteca y revisa sus detalles.</p>
        <ul className="books-list">
          {books.map((book) => (
            <li key={book.isbn} className="book-item">
              <h4 className="book-title">{book.title}</h4>
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
