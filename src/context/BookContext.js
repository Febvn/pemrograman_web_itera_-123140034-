/*
  BookContext.js
  -----------------
  Penjelasan: Context dan provider untuk menyimpan state global aplikasi terkait buku.
  - Menyediakan: books, loading, error, filter, searchQuery dan dispatch untuk mengubah state.
  - Persistensi: menggunakan useLocalStorage untuk menyimpan daftar buku ke localStorage.
*/
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

const initialState = {
  books: [],
  loading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [savedBooks, saveBooks] = useLocalStorage('books', []);
  const [state, dispatch] = useReducer(bookReducer, {
    ...initialState,
    books: savedBooks,
  });

  useEffect(() => {
    saveBooks(state.books);
  }, [state.books, saveBooks]);

  const value = {
    ...state,
    dispatch,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};