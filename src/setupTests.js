/*
	setupTests.js
	-----------------
	Penjelasan: File konfigurasi untuk testing environment (Jest + React Testing Library).
	- Tujuan: memasang matcher tambahan dari @testing-library/jest-dom agar
		assertion DOM menjadi lebih nyaman (mis. toBeInTheDocument, toHaveTextContent).
	- Catatan: Ini hanya mempengaruhi runtime test, bukan build produksi.
*/
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
