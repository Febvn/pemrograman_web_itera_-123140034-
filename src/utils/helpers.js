/*
  helpers.js
  -----------------
  Penjelasan: Kumpulan helper umum yang dipakai di aplikasi.
  - Fungsi: formatDate, getReadingStatusColor, isValidISBN, getStorageItem, debounce
  - Catatan: Komentar ini berbahasa Indonesia dan tidak mengubah logika fungsi.
*/
// Date formatting helper
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Book status helper
export const getReadingStatusColor = (status) => {
  const statusColors = {
    unread: '#f8d7da',
    reading: '#fff3cd',
    completed: '#d4edda'
  };
  return statusColors[status] || statusColors.unread;
};

// ISBN validator
export const isValidISBN = (isbn) => {
  const cleanIsbn = isbn.replace(/[-\s]/g, '');
  return /^(\d{10}|\d{13})$/.test(cleanIsbn);
};

// Local storage helper
export const getStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return null;
  }
};

// Search helper
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};