/* Hook custom untuk menyimpan dan memuat data dari localStorage dengan API mirip useState */
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  /* Inisialisasi state dari localStorage jika tersedia, fallback ke initialValue */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      /* Jika parsing gagal, log error dan kembalikan initialValue */
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  /* Fungsi untuk memperbarui nilai baik di state maupun di localStorage */
  const setValue = (value) => {
    try {
      /* Jika value adalah fungsi (mirip useState), jalankan fungsi itu */
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      /* Tangani error (mis. kuota penuh atau JSON.stringify gagal) */
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  /* Kembalikan array seperti useState: [value, setValue] */
  return [storedValue, setValue];
};