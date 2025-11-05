/* Import React untuk JSX */
import React from 'react';
/* Link untuk navigasi ke halaman detail */
import { Link } from 'react-router-dom';
/* Import ikon yang digunakan di item buku */
import { Edit, Trash2, Book, BookOpen, ShoppingBag, Timer, CheckCircle, Eye, FileEdit } from 'lucide-react';
/* Import style untuk tiap item buku */
import './BookItem.css';

/* Komponen BookItem: menampilkan informasi singkat tiap buku */
const BookItem = ({ book, onEdit, onDelete }) => {
  /* Fungsi helper: pilih ikon sesuai status buku */
  const getStatusIcon = () => {
    switch (book.status) {
      case 'milik':
        return <Book size={16} />;
      case 'baca':
        return <BookOpen size={16} />;
      case 'beli':
        return <ShoppingBag size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      default:
        return <Book size={16} />;
    }
  };

  /* Fungsi helper: teks yang menunjukkan status buku */
  const getStatusText = () => {
    switch (book.status) {
      case 'milik':
        return 'Owned';
      case 'baca':
        return 'Currently Reading';
      case 'beli':
        return 'Want to Buy';
      case 'completed':
        return 'Completed';
      default:
        return book.status;
    }
  };

  /* Render UI item buku */
  return (
    <div className="book-item">
      {/* Cover buku: jika ada URL tampilkan gambar, jika tidak tampil placeholder */}
      <div className="book-cover">
        {book.cover ? (
          <img src={book.cover} alt={book.title} />
        ) : (
          <div className="book-cover-placeholder">
            <Book size={40} />
          </div>
        )}
      </div>
      {/* Informasi teks buku: judul, penulis, status, tanggal, waktu baca */}
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-status">
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
        {/* Tampilkan publishedDate jika tersedia */}
        {book.publishedDate && (
          <p className="book-date">Published: {book.publishedDate}</p>
        )}
        {/* Tampilkan readingTime jika lebih dari 0 */}
        {book.readingTime > 0 && (
          <p className="book-reading-time">
            <Timer size={14} />
            <span>{book.readingTime} minutes</span>
          </p>
        )}
      </div>
      {/* Aksi: lihat, catat, edit, hapus */}
      <div className="book-actions">
        {/* Link ke halaman detail buku */}
        <Link to={`/book/${book.id}`} className="view-button icon-button">
          <Eye size={16} />
        </Link>
        {/* Link untuk membuka form catatan buku */}
        <Link to={`/book/${book.id}/notes`} className="add-note-button">
          <FileEdit size={16} />
        </Link>
        {/* Tombol edit memanggil callback onEdit dengan objek buku */}
        <button className="edit-button" onClick={() => onEdit(book)}>
          <Edit size={16} />
        </button>
        {/* Tombol delete memanggil onDelete dengan id buku */}
        <button className="delete-button" onClick={() => onDelete(book.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

/* Ekspor default komponen BookItem */
export default BookItem;