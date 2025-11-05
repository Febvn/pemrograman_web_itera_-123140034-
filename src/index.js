/* Import inti React agar JSX bisa dipakai dalam file ini */
import React from 'react';
/* Import API rendering baru dari React 18 */
import ReactDOM from 'react-dom/client';
/* Import global stylesheet aplikasi */
import './index.css';
/* Import komponen root aplikasi */
import App from './App';
/* Import util untuk pengukuran performa (opsional) */
import reportWebVitals from './reportWebVitals';

/* Buat root rendering React pada elemen dengan id 'root' di index.html */
const root = ReactDOM.createRoot(document.getElementById('root'));
/* Render aplikasi ke DOM dengan StrictMode (pembantu debugging) */
root.render(
  /* Komentar JSX: pembungkus StrictMode tidak mengubah UI, hanya membantu dev */
  <React.StrictMode>
    {/* Render komponen App sebagai isi utama aplikasi */}
    <App />
  </React.StrictMode>
);

/*
  reportWebVitals dipanggil agar developer bisa mengumpulkan metrik performa.
  Secara default tidak mengirim apa-apa — Anda bisa meneruskan console.log atau endpoint.
*/
reportWebVitals();
