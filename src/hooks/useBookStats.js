/*
  useBookStats.js
  -----------------
  Penjelasan: Hook custom untuk menghitung statistik ringkas dari daftar buku.
  - Mengembalikan objek: { owned, reading, wantToBuy, completed, readingTime, total }
  - Menggunakan useMemo untuk menghindari perhitungan berulang bila books tidak berubah.
*/
import { useMemo } from 'react';
import { useBookContext } from '../context/BookContext';

export const useBookStats = () => {
  const { books } = useBookContext();

  const stats = useMemo(() => {
    const owned = books.filter((b) => b.status === 'milik').length;
    const reading = books.filter((b) => b.status === 'baca').length;
    const wantToBuy = books.filter((b) => b.status === 'beli').length;
    const completed = books.filter((b) => b.status === 'completed').length;
    const readingTime = books.reduce((total, book) => total + (book.readingTime || 0), 0);
    const total = books.length;

    return {
      owned,
      reading,
      wantToBuy,
      completed,
      readingTime,
      total,
    };
  }, [books]);

  return stats;
};

export default useBookStats;