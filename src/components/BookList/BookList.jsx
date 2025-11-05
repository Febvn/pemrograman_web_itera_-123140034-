/* Import React untuk JSX */
import React from 'react';
/* Komponen BookItem yang me-render tiap item buku */
import BookItem from './BookItem';
/* Import style untuk daftar buku */
import './BookList.css';

/* Komponen BookList menerima daftar buku dan callback edit/delete */
const BookList = ({ books, onEdit, onDelete }) => {
  /* Jika tidak ada buku, tampilkan empty state dengan statistik nol */
  if (books.length === 0) {
    return (
      <div className="empty-state">
        {/* Teks ketika belum ada buku */}
        <p>No books have been added yet</p>
        {/* Ringkasan statistik kosong untuk memberi konteks */}
        <div className="empty-stats" role="region" aria-label="book statistics">
          <div className="stat">
            <div className="stat-label">Owned</div>
            <div className="stat-value">0%</div>
          </div>
          <div className="stat">
            <div className="stat-label">Currently Reading</div>
            <div className="stat-value">0%</div>
          </div>
          <div className="stat">
            <div className="stat-label">Want to Buy</div>
            <div className="stat-value">0%</div>
          </div>
          <div className="stat">
            <div className="stat-label">Completed</div>
            <div className="stat-value">0%</div>
          </div>
          <div className="stat reading-time">
            <div className="stat-label">Reading Time(M)</div>
            <div className="stat-value">0</div>
          </div>
        </div>
      </div>
    );
  }

  /* Jika ada buku, lakukan mapping dan render BookItem untuk tiap buku */
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

/* Ekspor komponen BookList */
export default BookList;