/* Import React dan helper routing */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
/* Context buku untuk akses daftar buku dan dispatch */
import { useBookContext } from '../../context/BookContext';
/* Ikon untuk UI */
import { ArrowLeft, Edit, Trash2, Book, Calendar, User } from 'lucide-react';
/* Style halaman detail buku */
import './BookDetail.css';

/* Komponen detail buku: menampilkan informasi lengkap satu buku */
const BookDetail = () => {
  /* Ambil id dari URL */
  const { id } = useParams();
  const navigate = useNavigate();
  /* Ambil daftar buku dan dispatch dari context */
  const { books, dispatch } = useBookContext();

  /* Cari buku berdasarkan id */
  const book = books.find((b) => b.id === id);

  /* Jika buku tidak ditemukan, tampilkan pesan dan tombol kembali */
  if (!book) {
    return (
      <div className="book-detail-container">
        <div className="book-not-found">
          <h2>Book not found</h2>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /* Navigasi ke halaman edit */
  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  /* Hapus buku dengan konfirmasi, lalu kembali ke daftar */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch({
        type: 'DELETE_BOOK',
        payload: book.id,
      });
      navigate('/');
    }
  };

  /* Helper untuk menampilkan teks status yang ramah pengguna */
  const getStatusText = () => {
    switch (book.status) {
      case 'milik':
        return 'Owned';
      case 'baca':
        return 'Currently Reading';
      case 'beli':
        return 'Want to Buy';
      default:
        return book.status;
    }
  };

  /* Render detail buku */
  return (
    <div className="book-detail-container">
      {/* Tombol kembali */}
      <button onClick={() => navigate('/')} className="back-button">
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="book-detail">
        {/* Cover buku atau placeholder jika tidak ada */}
        <div className="book-cover-section">
          {book.cover ? (
            <img src={book.cover} alt={book.title} className="book-cover" />
          ) : (
            <div className="book-cover-placeholder">
              <Book size={60} />
            </div>
          )}
        </div>

        {/* Bagian informasi teks buku */}
        <div className="book-info-section">
          <h1 className="book-title">{book.title}</h1>
          <div className="book-meta">
            <div className="meta-item">
              <User size={18} />
              <span>{book.author}</span>
            </div>
            {book.publishedDate && (
              <div className="meta-item">
                <Calendar size={18} />
                <span>{book.publishedDate}</span>
              </div>
            )}
            {book.publisher && (
              <div className="meta-item">
                <span>Publisher: {book.publisher}</span>
              </div>
            )}
          </div>

          {/* Status buku */}
          <div className="book-status-badge">
            {getStatusText()}
          </div>

          {/* Deskripsi jika ada */}
          {book.description && (
            <div className="book-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          )}

          {/* Catatan jika ada */}
          {book.notes && (
            <div className="book-notes">
              <h3>Notes</h3>
              <p>{book.notes}</p>
            </div>
          )}

          {/* Aksi: edit, add note, delete */}
          <div className="book-actions">
            <button onClick={handleEdit} className="edit-button">
              <Edit size={18} />
              Edit Book
            </button>
            <button onClick={() => navigate(`/edit/${book.id}?focus=notes`)} className="add-note-button">
              <Edit size={18} />
              Add Note
            </button>
            <button onClick={handleDelete} className="delete-button">
              <Trash2 size={18} />
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Ekspor komponen BookDetail */
export default BookDetail;