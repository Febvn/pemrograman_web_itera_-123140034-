/* Import React untuk JSX */
import React from 'react';
/* Import Link dari react-router untuk navigasi internal */
import { Link } from 'react-router-dom';
/* Import ikon yang dipakai di header */
import { BookOpen, Plus } from 'lucide-react';
/* Import style spesifik layout */
import './Layout.css';

/* Komponen Layout: membungkus halaman dengan header, main, footer */
const Layout = ({ children }) => {
  return (
    /* Container aplikasi utama */
    <div className="app-container">
      {/* Header aplikasi: logo + navigasi */}
      <header className="app-header">
        {/* Bagian logo / judul aplikasi */}
        <div className="logo">
          <h1>Personal Book Manager</h1>
        </div>
        {/* Desktop nav (tampil di layar besar) */}
        <nav className="app-nav">
          {/* Link ke halaman utama (daftar buku) */}
          <Link to="/" className="nav-link">
            {/* Ikon buku */}
            <BookOpen size={20} />
            {/* Label link */}
            <span>My Books</span>
          </Link>
          {/* Tombol tambah buku yang menavigasi ke /add */}
          <Link to="/add" className="nav-link add-button">
            <Plus size={20} />
            <span>Add Book</span>
          </Link>
        </nav>

        {/* Mobile nav: menggunakan elemen details untuk buka/tutup menu */}
        <details className="mobile-nav" role="navigation">
          <summary className="mobile-summary" aria-label="Open navigation menu">
            {/* Icon hamburger sederhana */}
            <span className="hamburger">☰</span>
            <span className="mobile-label">Menu</span>
          </summary>
          <div className="mobile-nav-list">
            {/* Link mobile ke halaman utama */}
            <Link to="/" className="nav-link">
              <BookOpen size={18} />
              <span>My Books</span>
            </Link>
            {/* Link mobile ke halaman tambah buku */}
            <Link to="/add" className="nav-link add-button">
              <Plus size={18} />
              <span>Add Book</span>
            </Link>
          </div>
        </details>
      </header>
      {/* Main content: tempat children (halaman) akan dirender */}
      <main className="app-main">{children}</main>
      {/* Footer sederhana dengan kredit/penulis */}
      <footer className="app-footer">
        <p>&copy; FebrianValentinoNugroho</p>
      </footer>
    </div>
  );
};

/* Ekspor komponen layout */
export default Layout;