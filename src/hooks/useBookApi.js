/* Hook custom: panggil Google Books API melalui service bookApi */
import { useState, useEffect } from 'react';
import { searchBooks } from '../services/bookApi';

/*
  useBookApi menerima parameter query (string).
  Mengembalikan { data, loading, error } untuk komponen yang memanggil.
*/
export const useBookApi = (query) => {
  /* State untuk menyimpan data hasil pencarian */
  const [data, setData] = useState([]);
  /* Flag loading selama request berlangsung */
  const [loading, setLoading] = useState(false);
  /* Pesan error jika terjadi kegagalan */
  const [error, setError] = useState(null);

  useEffect(() => {
    /* Jika query kosong, jangan lakukan apa-apa */
    if (!query) return;

    const fetchData = async () => {
      /* Set loading true sebelum request */
      setLoading(true);
      setError(null);
      try {
        /* Panggil service yang meng-handle axios */
        const result = await searchBooks(query);
        /* Simpan hasil ke state */
        setData(result);
      } catch (err) {
        /* Simpan pesan error agar komponen bisa menampilkannya */
        setError(err.message);
      } finally {
        /* Matikan loading pada akhirnya */
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  /* Kembalikan objek untuk dipakai komponen (data, loading, error) */
  return { data, loading, error };
};