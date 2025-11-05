/*
  BookFormPage.jsx
  -----------------
  Penjelasan: Halaman pembungkus yang menampilkan `BookForm` sebagai halaman tersendiri.
  - Fungsi: membaca param `id` untuk mode edit/tambah lalu menampilkan `BookForm`.
  - Catatan: onClose akan menavigasi kembali ke root (/).
*/
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../../components/BookForm/BookForm';

const BookFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <BookForm 
      book={id ? undefined : null} 
      onClose={handleClose}
    />
  );
};

export default BookFormPage;