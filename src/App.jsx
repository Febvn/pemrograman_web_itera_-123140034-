/* Import React agar JSX dapat dipakai */
import React from 'react';
/* Import router untuk mendefinisikan route SPA */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* Provider context untuk state global buku */
import { BookProvider } from './context/BookContext';
/* Layout berisi header/footer dan container utama */
import Layout from './components/Layout/Layout';
/* Halaman utama (daftar buku) */
import Home from './pages/Home/Home';
/* Halaman statistik (sebelumnya ada, tombol dihapus dari nav tapi rute masih ada) */
import Stats from './pages/Stats/Stats';
/* Halaman detail buku */
import BookDetail from './pages/BookDetail/BookDetail';
/* Halaman form tambah/edit buku */
import BookFormPage from './pages/BookFormPage/BookFormPage';
/* Komponen form catatan yang muncul sebagai route */
import NoteForm from './components/NoteForm/NoteForm';
/* Import style global untuk App */
import './App.css';

/* Komponen root aplikasi yang membungkus router dan state global */
function App() {
  return (
    /* BookProvider menyediakan state buku ke seluruh komponen anak */
    <BookProvider>
      {/* Router mengatur route SPA */}
      <Router>
        {/* Layout membungkus konten halaman (header, footer, main) */}
        <Layout>
          {/* Routes berisi daftar route aplikasi */}
          <Routes>
            {/* Route: daftar buku (halaman utama) */}
            <Route path="/" element={<Home />} />
            {/* Route: statistik (tetap ada di routing meski tombol nav dihapus) */}
            <Route path="/stats" element={<Stats />} />
            {/* Route: detail buku berdasarkan id */}
            <Route path="/book/:id" element={<BookDetail />} />
            {/* Route: tambah buku */}
            <Route path="/add" element={<BookFormPage />} />
            {/* Route: edit buku berdasarkan id */}
            <Route path="/edit/:id" element={<BookFormPage />} />
            {/* Route: membuka NoteForm untuk catatan buku */}
            <Route path="/book/:id/notes" element={<NoteForm />} />
          </Routes>
        </Layout>
      </Router>
    </BookProvider>
  );
}

/* Ekspor komponen App sebagai default export */
export default App;