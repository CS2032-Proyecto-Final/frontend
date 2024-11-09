import React, { useEffect, useState } from 'react';

function BuscarLibros() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const fetchBooks = async (page) => {
    const tenant_id = "tenant1";
    const url = `https://p3q0o151ag.execute-api.us-east-1.amazonaws.com/dev/books?tenant_id=${tenant_id}&page=${page}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // Accede al contenido del JSON y actualiza el estado
      setBooks(data.body.books);
      setLastEvaluatedKey(data.body.lastEvaluatedKey || null);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleNextPage = () => {
    if (lastEvaluatedKey) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h2>Buscar Libros</h2>
      <p>Encuentra libros disponibles en la biblioteca y revisa sus detalles.</p>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            <strong>{book.title}</strong> by {book.author_name} {book.author_lastname} - {book.pages} pages
            <br />
            Stock: {book.stock}, Quantity: {book.quantity}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Anterior</button>
        <button onClick={handleNextPage} disabled={!lastEvaluatedKey}>Siguiente</button>
      </div>
    </div>
  );
}

export default BuscarLibros;
