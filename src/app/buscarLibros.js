// src/app/buscarLibros.js

export const fetchBooks = async (tenant_id, email, page, limit, title = '', author_name = '', author_lastname = '', isbn = '') => {
  let url = `https://fenlnd1g0c.execute-api.us-east-1.amazonaws.com/dev/books/search?tenant_id=${tenant_id}&email=${email}&page=${page}&limit=${limit}`;

  if (isbn) {
    url += `&isbn=${isbn}`;
  } else {
    if (title) url += `&title=${title}`;
    if (author_name) url += `&author_name=${author_name}`;
    if (author_lastname) url += `&author_lastname=${author_lastname}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.statusCode === 200 && data.body) {
      console.log(data.body);
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
    await fetch('https://9vaeq95yoh.execute-api.us-east-1.amazonaws.com/dev/favorite', {
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
