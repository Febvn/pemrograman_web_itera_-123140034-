/*
  App.test.js
  -----------------
  Penjelasan: Test sederhana untuk memastikan App dirender tanpa error.
  - Catatan: Test ini menggunakan React Testing Library; Anda dapat menambah test lebih lengkap.
*/
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
