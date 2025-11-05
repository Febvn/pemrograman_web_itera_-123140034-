/* Import React dan hook yang dibutuhkan */
import React, { useState, useEffect } from 'react';
/* Context buku untuk dispatch aksi CRUD */
import { useBookContext } from '../../context/BookContext';
/* Hook custom untuk mencari buku via API */
import { useBookApi } from '../../hooks/useBookApi';
/* Ikon yang dipakai dalam form */
import { Search, X, Check, AlertCircle } from 'lucide-react';
/* Import style form */
import './BookForm.css';

/* Komponen form untuk menambah atau mengedit buku */
const BookForm = ({ book, onClose }) => {
  /* Ambil dispatcher dari context untuk menambah/update buku */
  const { dispatch } = useBookContext();
  /* State form berisi fields buku */
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik',
    genre: '',
    cover: '',
    description: '',
    publishedDate: '',
    publisher: '',
    readingTime: 0,
  });
  /* State untuk menyimpan pesan error validasi per field */
  const [errors, setErrors] = useState({});
  /* State untuk query pencarian API */
  const [searchQuery, setSearchQuery] = useState('');
  /* Toggle tampilkan hasil pencarian API */
  const [showApiResults, setShowApiResults] = useState(false);
  /* Hook custom untuk memanggil Google Books API */
  const { data: apiBooks, loading, error } = useBookApi(searchQuery);

  /* Jika prop book diberikan (edit), isi form dengan data buku tersebut */
  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  /* Handler perubahan input form; perbarui formData dan clear error field */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    /* Jika ada error pada field ini, hapus saat user mulai mengetik */
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  /* Validasi sederhana sebelum submit */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku harus diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Penulis harus diisi';
    }
    if (!formData.status) {
      newErrors.status = 'Status harus dipilih';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Handle submit form: dispatch ADD_BOOK atau UPDATE_BOOK */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (book) {
        dispatch({
          type: 'UPDATE_BOOK',
          payload: { ...formData, id: book.id },
        });
      } else {
        dispatch({
          type: 'ADD_BOOK',
          payload: { ...formData, id: Date.now().toString() },
        });
      }
      /* Tutup form setelah berhasil submit */
      onClose();
    }
  };

  /* Handle submit pencarian: aktifkan area hasil API */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowApiResults(true);
    }
  };

  /* Pilih buku dari hasil API dan isi form dengan datanya */
  const selectBookFromApi = (apiBook) => {
    setFormData({
      ...formData,
      title: apiBook.title,
      author: apiBook.author,
      cover: apiBook.cover,
      description: apiBook.description,
      publishedDate: apiBook.publishedDate,
      publisher: apiBook.publisher,
    });
    setShowApiResults(false);
    setSearchQuery('');
  };

  /* Render form */
  return (
    <div className="book-form-container">
      <div className="book-form">
        <div className="form-header">
          <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Bagian pencarian API */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search books from Google Books API..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>

          {showApiResults && (
            <div className="api-results">
              <h3>Search Results</h3>
              {loading && <p>Loading...</p>}
              {error && <p className="error-message">{error}</p>}
              {apiBooks.length > 0 ? (
                <div className="api-books-list">
                  {apiBooks.map((apiBook) => (
                    <div
                      key={apiBook.id}
                      className="api-book-item"
                      onClick={() => selectBookFromApi(apiBook)}
                    >
                      {apiBook.cover && (
                        <img
                          src={apiBook.cover}
                          alt={apiBook.title}
                          className="api-book-cover"
                        />
                      )}
                      <div className="api-book-info">
                        <h4>{apiBook.title}</h4>
                        <p>{apiBook.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && <p>No results found</p>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? 'error' : ''}
            />
            {errors.author && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.author}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={errors.status ? 'error' : ''}
            >
              <option value="milik">Owned</option>
              <option value="baca">Currently Reading</option>
              <option value="beli">Want to Buy</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.status}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="cover">Book Cover URL</label>
            <input
              type="text"
              id="cover"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="publishedDate">Publication Date</label>
              <input
                type="text"
                id="publishedDate"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="readingTime">Reading Time(M)</label>
              <input
                type="number"
                id="readingTime"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                min="0"
                placeholder="Enter reading time"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              <Check size={18} />
              {book ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Ekspor komponen BookForm sebagai default */
export default BookForm;