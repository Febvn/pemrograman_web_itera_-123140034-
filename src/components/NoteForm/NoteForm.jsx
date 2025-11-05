/* Import React serta hook yang diperlukan */
import React, { useState, useEffect } from 'react';
/* Hook routing untuk navigasi dan membaca parameter URL */
import { useNavigate, useParams } from 'react-router-dom';
/* Context buku untuk mengakses daftar buku dan dispatch */
import { useBookContext } from '../../context/BookContext';
/* Ikon yang digunakan di form */
import { X, Check } from 'lucide-react';
/* Import style spesifik komponen NoteForm */
import './NoteForm.css';

/* Komponen NoteForm: menambah atau mengedit catatan untuk sebuah buku */
const NoteForm = () => {
  /* Navigasi programatik */
  const navigate = useNavigate();
  /* Ambil id buku dari URL */
  const { id } = useParams();
  /* Ambil daftar buku dan dispatcher dari context */
  const { books, dispatch } = useBookContext();
  /* State lokal untuk judul dan isi catatan */
  const [noteTitle, setNoteTitle] = useState('');
  const [note, setNote] = useState('');
  /* Temukan objek buku berdasarkan id */
  const book = books.find(b => b.id === id);

  /* Jika buku memiliki notes sebelumnya, isi state lokal saat mount atau saat book berubah */
  useEffect(() => {
    if (book?.notes) {
      /* notes bisa berupa string atau object { title, content } */
      const { title = '', content = '' } = typeof book.notes === 'object' ? book.notes : { content: book.notes };
      setNoteTitle(title);
      setNote(content);
    }
  }, [book]);

  /* Submit handler: update buku dengan field notes baru */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (book) {
      dispatch({
        type: 'UPDATE_BOOK',
        payload: {
          ...book,
          notes: {
            title: noteTitle,
            content: note
          }
        }
      });
      /* Kembali ke halaman detail buku setelah simpan */
      navigate(`/book/${id}`);
    }
  };

  /* Tutup form dan kembali ke halaman detail */
  const handleClose = () => {
    navigate(`/book/${id}`);
  };

  /* Jika buku tidak ditemukan (mis. id salah), arahkan ke root untuk menghindari error */
  if (!book) {
    navigate('/');
    return null;
  }

  /* Render form catatan */
  return (
    <div className="note-form-container">
      <div className="note-form">
        <div className="form-header">
          <div className="header-info">
            {/* Judul form */}
            <h2>Add Note</h2>
            {/* Nama buku sebagai konteks */}
            <p className="book-title">{book.title}</p>
          </div>
          {/* Tombol tutup form */}
          <button className="close-button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            {/* Input judul catatan */}
            <input
              type="text"
              id="noteTitle"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title..."
              className="note-title-input"
            />
          </div>
          <div className="form-group">
            {/* Textarea untuk isi catatan */}
            <textarea
              id="notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="8"
              placeholder="Add your notes about this book..."
            />
          </div>

          <div className="form-actions">
            {/* Tombol cancel kembali tanpa menyimpan */}
            <button type="button" className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
            {/* Tombol simpan */}
            <button type="submit" className="submit-button">
              <Check size={18} />
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Ekspor komponen NoteForm */
export default NoteForm;
