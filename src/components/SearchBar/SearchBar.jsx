/* Import React */
import React from 'react';
/* Ikon search */
import { Search } from 'lucide-react';
/* Context untuk membaca/mengubah query pencarian */
import { useBookContext } from '../../context/BookContext';
/* Style untuk komponen search */
import './SearchBar.css';

/* Komponen SearchBar: input untuk memfilter buku berdasarkan judul/penulis */
const SearchBar = () => {
  /* Ambil nilai query dan dispatch dari context */
  const { searchQuery, dispatch } = useBookContext();

  /* Saat input berubah, kirim aksi ke context agar state global diperbarui */
  const handleSearchChange = (e) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: e.target.value,
    });
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        {/* Ikon di kiri input */}
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
    </div>
  );
};

/* Ekspor komponen SearchBar */
export default SearchBar;