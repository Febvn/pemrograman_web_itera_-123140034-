/*
  services/bookApi.js
  -----------------
  Penjelasan: Abstraksi pemanggilan Google Books API.
  - Fungsi: searchBooks(query) -> mengembalikan array buku dengan bentuk {id,title,author,cover,...}
  - Catatan: Menangani error dengan melempar Error sehingga pemanggil bisa menampilkan pesan.
*/
import axios from 'axios';

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${query}&maxResults=10`);
    return response.data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      author: item.volumeInfo.authors
        ? item.volumeInfo.authors.join(', ')
        : 'Unknown Author',
      cover: item.volumeInfo.imageLinks?.thumbnail || '',
      description: item.volumeInfo.description || '',
      publishedDate: item.volumeInfo.publishedDate || '',
      publisher: item.volumeInfo.publisher || '',
    }));
  } catch (error) {
    throw new Error('Failed to fetch books from API');
  }
};