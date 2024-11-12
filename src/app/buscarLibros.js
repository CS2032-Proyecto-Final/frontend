// src/app/buscarLibros.js

// src/app/buscarLibros.js

export const fetchBooks = async (tenant_id, email, page, limit) => {
  
  const url = `https://ubt02t8j1k.execute-api.us-east-1.amazonaws.com/dev/books?tenant_id=${tenant_id}&email=${email}&page=${page}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.statusCode === 200 && data.body) {
      console.log(data);
      
      return data.body;
    }
    throw new Error('Error fetching books');
  } catch (error) {
    console.error('Error fetching books:', error);
    return { favorites: false, books: [] };
  }
};


export const toggleFavorite = async (tenant_id, email, isbn) => {
  try {
    await fetch('https://wb5hznomeh.execute-api.us-east-1.amazonaws.com/dev/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_id, email, isbn }),
    });
    return true;
  } catch (error) {
    console.error('Error updating favorite:', error);
    return false;
  }
};
