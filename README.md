# 📚 Personal Book Manager

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)
![Create React App](https://img.shields.io/badge/Create%20React%20App-5.0.1-09D3AC?logo=create-react-app&logoColor=white)
![Node.js](https://img.shields.io/badge/Node-%3E%3D%2014-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

# Manajemen Buku Pribadi

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)
![Create React App](https://img.shields.io/badge/Create%20React%20App-react--scripts-4DA1FF)
![Node.js](https://img.shields.io/badge/Node-%3E%3D%2014-339933?logo=node.js&logoColor=white)

## 📖 Tentang Aplikasi

Aplikasi manajemen buku pribadi yang memungkinkan pengguna untuk:
- Mengelola koleksi buku (tambah, edit, hapus)
- Mencatat progress membaca
- Menambahkan catatan untuk setiap buku
- Mencari buku menggunakan Google Books API
- Melihat statistik membaca

## 🚀 Fitur Utama

- ✨ Interface modern dengan desain responsif
- 📱 Layout mobile-friendly
- 🔍 Integrasi dengan Google Books API
- 💾 Penyimpanan lokal menggunakan localStorage
- 📊 Visualisasi statistik membaca
- 🎨 Kustomisasi warna catatan

## 🛠 Teknologi

- **Frontend:** React 19.x
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Testing:** React Testing Library + Jest
- **Build Tool:** Create React App

## Persyaratan

- Node.js (disarankan >= 14)
- npm (bundled dengan Node) atau yarn

## ⚙️ Prerequisites

- Node.js (>= 14.x)
- npm atau yarn

## 📥 Instalasi & Penggunaan

1. Clone repository:
```bash
git clone https://github.com/username/manajemen-buku-pribadi.git
cd manajemen-buku-pribadi
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi:
```bash
npm start
```

4. Build untuk production:
```bash
npm run build
```

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen React reusable
│   ├── AddNoteForm/    # Form untuk menambah catatan
│   ├── BookForm/       # Form tambah/edit buku
│   ├── BookList/       # Daftar buku dan item
│   ├── Layout/         # Layout aplikasi (header/footer)
│   └── SearchBar/      # Komponen pencarian
├── context/            # Context API untuk state management
├── hooks/              # Custom React hooks
├── pages/              # Komponen halaman utama
├── services/           # Service layer (API calls)
└── utils/              # Helper functions & utilities
```

## 📦 Dependencies Utama

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.5",
    "axios": "^1.13.1",
    "lucide-react": "^0.552.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.9.1"
  }
}
```

## 🧪 Testing

Menjalankan test:
```bash
npm test
```

## 📝 License

MIT License - Lihat [LICENSE](LICENSE) untuk detail lebih lanjut.

## 👨‍💻 Author

Febrian Valentino Nugroho

## Dependency (dari `package.json`)

Dependencies utama yang digunakan di proyek ini:

/* dependencies */
- @testing-library/dom: ^10.4.1
- axios: ^1.13.1
- lucide-react: ^0.552.0
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^7.9.5
- react-scripts: 5.0.1
- web-vitals: ^2.1.4

DevDependencies untuk testing:

- @testing-library/jest-dom: ^6.9.1
- @testing-library/react: ^16.3.0
- @testing-library/user-event: ^14.6.1

Jika Anda menggunakan `npm install` tanpa argumen, semua dependency (dep + devDep) akan terpasang.

## Struktur file (ringkasan)

Berikut struktur utama proyek (folder `src/` fokus pada kode sumber):

```
manajemen-buku-pribadi/
	package.json
	README.md
	public/
		index.html
		manifest.json
		robots.txt
		logo.PNG
		logo192.png
		logo512.png
		favicon.ico
	src/
		App.css
		App.jsx
		App.test.js
		index.css
		index.js
		reportWebVitals.js
		setupTests.js
		components/
			AddNoteForm/
				AddNoteForm.css
				AddNoteForm.jsx
			BentoGrid/
				BentoGrid.css
				BentoGrid.jsx
			BookDistribution/
				BookDistribution.jsx
			BookFilter/
				BookFilter.css
				BookFilter.jsx
			BookForm/
				BookForm.css
				BookForm.jsx
			BookList/
				BookItem.css
				BookItem.jsx
				BookList.css
				BookList.jsx
			Layout/
				Layout.css
				Layout.jsx
			NoteForm/
				NoteForm.css
				NoteForm.jsx
			SearchBar/
				SearchBar.css
				SearchBar.jsx
		context/
			BookContext.js
		hooks/
			useBookApi.js
			useBookStats.js
			useLocalStorage.js
		pages/
			BookDetail/
				BookDetail.css
				BookDetail.jsx
			BookFormPage/
				BookFormPage.jsx
			Home/
				Home.css
				Home.jsx
			Stats/
				Stats.css
				Stats.jsx
		services/
			bookApi.js
		utils/
			helpers.js
```

## Petunjuk singkat pengembangan

- Struktur komponen dibuat modular — masing-masing komponen berada di foldernya sendiri (CSS + JSX).
- State global menggunakan `BookContext` (Context API).
- Hooks custom berada pada folder `src/hooks/`.

## Dependencies yang harus di-install jika manual

Jika Anda ingin meng-install dependency utama satu per satu (misalnya saat men-debug), daftar perintah singkat:

```powershell
npm install react react-dom react-router-dom react-scripts axios lucide-react web-vitals
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Catatan

- Saya telah menghubungkan `public/index.html` untuk menggunakan `logo.PNG` sebagai favicon.
- Jika Anda ingin menambahkan badge lisensi, sebutkan lisensi (mis. MIT) dan saya akan tambahkan.

---

Jika ingin, saya akan melanjutkan ke penambahan komentar per baris pada file `src/` (sesuai permintaan). Saya akan mengerjakan dalam batch kecil dan memeriksa sintaks setiap batch.
