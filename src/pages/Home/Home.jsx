/* Import React dan hook yang diperlukan */
import React, { useState, useMemo } from 'react';
/* Context buku untuk akses state global */
import { useBookContext } from '../../context/BookContext';
/* Komponen-komponen yang digunakan di halaman Home */
import BookList from '../../components/BookList/BookList';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import SearchBar from '../../components/SearchBar/SearchBar';
import BentoGrid from '../../components/BentoGrid/BentoGrid';
/* Ikon yang dipakai pada statistik */
import { BookOpen, TrendingUp, Clock, ShoppingCart, CheckCircle, Timer } from 'lucide-react';
/* Style halaman Home */
import './Home.css';

/* Komponen halaman utama yang menampilkan daftar buku dan statistik singkat */
const Home = () => {
  /* Ambil state global books, filter, searchQuery dari context */
  const { books, filter, searchQuery } = useBookContext();
  /* Local state untuk kontrol tampil/tidaknya form */
  const [showForm, setShowForm] = useState(false);
  /* Local state untuk menyimpan buku yang sedang diedit (atau null) */
  const [editingBook, setEditingBook] = useState(null);

  /* Filter dan pencarian di-memoize agar performa lebih baik */
  const filteredBooks = useMemo(() => {
    let result = books;

    /* Terapkan filter status jika bukan 'all' */
    if (filter !== 'all') {
      result = result.filter((book) => book.status === filter);
    }

    /* Terapkan pencarian berdasarkan judul atau penulis */
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    return result;
  }, [books, filter, searchQuery]);

  /* Buka form untuk tambah buku */
  const handleAddBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  /* Buka form untuk edit buku tertentu */
  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  /* Ambil dispatcher dari context untuk aksi CRUD */
  const { dispatch } = useBookContext();
  
  /* Hapus buku dengan konfirmasi sederhana */
  const handleDeleteBook = (bookId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      dispatch({
        type: 'DELETE_BOOK',
        payload: bookId,
      });
    }
  };

  /* Tutup form dan reset editingBook */
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  /* Hitung statistik ringkas dari daftar buku */
  const stats = useMemo(() => {
    const owned = books.filter((book) => book.status === 'milik').length;
    const reading = books.filter((book) => book.status === 'baca').length;
    const wantToBuy = books.filter((book) => book.status === 'beli').length;
    const completed = books.filter((book) => book.status === 'completed').length;
    const readingTime = books.reduce((total, book) => total + (book.readingTime || 0), 0);
    const total = books.length;

    return {
      owned,
      reading,
      wantToBuy,
      completed,
      readingTime,
      total,
    };
  }, [books]);

  /* Render halaman Home */
  return (
    <div className="home-page">
      <div className="page-header">
        {/* Judul halaman */}
        <h1>My Book Collection</h1>
        {/* Tombol cepat untuk menambah buku */}
        <button className="add-book-button" onClick={handleAddBook}>
          +
        </button>
      </div>

      {/* Kotak pencarian */}
      <div className="search-container">
        <SearchBar />
      </div>

      {/* Grid statistik ringkas */}
      <BentoGrid>
        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Books</p>
            </div>
          </div>
        </div>
        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon owned">
              <BookOpen size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.owned}</h3>
              <p>Owned</p>
            </div>
          </div>
        </div>
        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon reading">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.reading}</h3>
              <p>Currently Reading</p>
            </div>
          </div>
        </div>
        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon want-to-buy">
              <ShoppingCart size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.wantToBuy}</h3>
              <p>Want to Buy</p>
            </div>
          </div>
        </div>
        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>
        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon reading-time">
              <Timer size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.readingTime}</h3>
              <p>Reading Time(M)</p>
            </div>
          </div>
        </div>
      </BentoGrid>

      {/* Filter dan daftar buku */}
      <BookFilter />

      <BookList
        books={filteredBooks}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />

      {/* Tampilkan BookForm saat showForm true */}
      {showForm && (
        <BookForm book={editingBook} onClose={handleCloseForm} />
      )}
    </div>
  );
};

/* Ekspor komponen Home */
export default Home;