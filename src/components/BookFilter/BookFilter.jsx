/* Komponen BookFilter: select untuk memilih status filter */
import React from 'react';
/* Ikon filter */
import { Filter } from 'lucide-react';
/* Context untuk membaca dan mengubah filter global */
import { useBookContext } from '../../context/BookContext';
/* Style komponen */
import './BookFilter.css';

const BookFilter = () => {
  /* Ambil nilai filter saat ini dan dispatch dari context */
  const { filter, dispatch } = useBookContext();

  /* Ketika select berubah, kirim aksi SET_FILTER */
  const handleFilterChange = (e) => {
    dispatch({
      type: 'SET_FILTER',
      payload: e.target.value,
    });
  };

  return (
    <div className="book-filter">
      <div className="filter-container">
        {/* Ikon kecil di sebelah kiri select */}
        <Filter size={20} />
        <select 
          className="filter-select"
          value={filter}
          onChange={handleFilterChange}
        >
          {/* Opsi filter */}
          <option value="all">All</option>
          <option value="milik">Owned</option>
          <option value="baca">Currently Reading</option>
          <option value="beli">Want to Buy</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

/* Ekspor komponen BookFilter */
export default BookFilter;