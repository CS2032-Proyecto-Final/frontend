// src/app/buscarLibros.js
export const fetchBooks = async (page, tenant_id = "utec") => {
    const url = `https://ubt02t8j1k.execute-api.us-east-1.amazonaws.com/dev/books?tenant_id=${tenant_id}&page=${page}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };
  