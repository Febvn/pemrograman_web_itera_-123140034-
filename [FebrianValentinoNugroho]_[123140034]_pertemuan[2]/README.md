

# Personal Dashboard

Aplikasi web sederhana untuk mengelola informasi pribadi seperti jadwal kuliah, daftar tugas, catatan, dan informasi cuaca/waktu. Proyek ini adalah aplikasi statis (HTML/CSS/JS) yang menyimpan data di browser menggunakan localStorage.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Ringkasan singkat

- Status: siap untuk digunakan secara lokal (fitur CRUD, statistik real-time, glassmorphism design).
- Penyimpanan: localStorage (kunci: `dashboard_schedules`, `dashboard_tasks`, `dashboard_notes`).

## Fitur utama

- Kelola jadwal kuliah (waktu, mata kuliah, lokasi)
- Kelola daftar tugas (status, prioritas, deskripsi)
- Buat dan kelola catatan pribadi
- Tampilkan statistik real-time
- Informasi cuaca dan waktu
- Glassmorphism design dengan bento grid layout

## Fitur terperinci

Berikut adalah daftar fitur yang benar-benar diimplementasikan beserta penjelasan perilaku dan rujukan ke bagian kode utama (`script.js` / `index.html`):

- Create / Edit (Tambah & Sunting):
  - Form di modal memungkinkan menambah data baru atau menyunting data yang ada.
  - Fungsi: `DataManager` class dengan metode `addItem()` dan `updateItem()` — membuat item baru atau memperbarui item yang ada berdasarkan ID.

- Read (Tampilkan daftar data):
  - Daftar data dirender di elemen-elemen terkait oleh fungsi `renderScheduleList()`, `renderTaskList()`, dan `renderNotesList()` yang mengambil data dari masing-masing manager.
  - Data diambil dari `localStorage` saat inisialisasi oleh `DataManager.loadData()`.

- Update (Ubah status / Edit fields):
  - Tombol toggle untuk tugas memanggil fungsi untuk membalik status selesai/belum.
  - Tombol Edit memanggil fungsi yang mengisi form modal dengan data untuk disunting.

- Delete: 
  - Tombol delete memanggil fungsi `deleteItem()` dan menampilkan konfirmasi sebelum menghapus.

- Penyimpanan lokal (Persistence):
  - Semua perubahan disimpan ke `localStorage` dengan kunci berbeda untuk setiap jenis data melalui `DataManager.saveData()`.
  - Format data: array objek (lihat contoh JSON di bagian teknis).

- Statistik Real-time:
  - Elemen statistik menampilkan jumlah total data secara real-time.
  - Fungsi `updateStatistics()` memperbarui tampilan statistik setiap ada perubahan data.

- Informasi Cuaca:
  - Fungsi `getWeatherData()` menggunakan async/await untuk mengambil data cuaca (simulasi).
  - Data cuaca ditampilkan di dashboard dengan update berkala.

- Tema (Glassmorphism):
  - Desain menggunakan glassmorphism dengan background transparan dan efek blur.
  - Bento grid layout yang responsif untuk menyesuaikan ukuran layar.

- ES6+ Features:
  - Classes untuk struktur data (`DataManager`)
  - Arrow functions untuk berbagai operasi
  - Template literals untuk rendering dinamis
  - Async/await untuk operasi asinkron
  - Const dan let untuk manajemen variabel

Catatan implementasi singkat (lokasi fungsi penting di `script.js`):

- `DataManager` class — mengelola operasi CRUD untuk setiap jenis data
- `loadData()` / `saveData()` — baca/tulis `localStorage`
- `renderScheduleList()`, `renderTaskList()`, `renderNotesList()` — render daftar data
- `updateStatistics()` — perbarui tampilan statistik
- `getWeatherData()` — ambil data cuaca
- Fungsi event handler untuk interaksi pengguna

## Cara menguji fitur (cek cepat)

1. Tambah jadwal kuliah baru → harus muncul di daftar jadwal.
2. Tambah tugas dengan prioritas berbeda → periksa urutan dan tampilan.
3. Buat catatan baru → pastikan tersimpan dan dapat diedit.
4. Hapus salah satu data → konfirmasi dialog harus muncul.
5. Periksa statistik setelah menambah/menghapus data → harus update secara real-time.
6. Periksa informasi cuaca → harus menampilkan data cuaca.
7. Buka DevTools → Console → `localStorage.getItem('dashboard_tasks')` untuk memeriksa data yang tersimpan.

## Struktur berkas

- `index.html` — tampilan aplikasi
- `styles.css` — gaya UI dengan glassmorphism
- `script.js` — logika aplikasi (CRUD, localStorage, ES6+ features)
- `README.md` — dokumentasi aplikasi

## Cara cepat menjalankan

1. Clone atau download repository ini
2. Buka file `index.html` di browser modern
3. Mulai menggunakan aplikasi dengan menambah data melalui tombol "+" di setiap card

Alternatif: buka file `index.html` langsung tanpa server:

`file:///C:/path/to/project/index.html`

## Detil teknis — Penyimpanan (localStorage)

- Kunci penyimpanan: `dashboard_schedules`, `dashboard_tasks`, `dashboard_notes`.
- Setiap perubahan menyimpan ulang array data:

  localStorage.setItem(storageKey, JSON.stringify(data))

- Saat halaman dimuat, aplikasi mengambil data:

  const data = JSON.parse(localStorage.getItem(storageKey)) || []

- Contoh struktur satu objek jadwal:

  {
    "id": "<unik>",
    "time": "08:00",
    "subject": "Algoritma",
    "location": "Ruang 301"
  }

- Contoh struktur satu objek tugas:

  {
    "id": "<unik>",
    "title": "Tugas Algoritma",
    "description": "Mengerjakan soal nomor 1-5",
    "priority": "high",
    "completed": false
  }

- Contoh struktur satu objek catatan:

  {
    "id": "<unik>",
    "title": "Catatan Kuliah",
    "content": "Materi hari ini tentang sorting algorithms"
  }

## ES6+ Features (ringkas)

- Classes: `DataManager` untuk mengelola operasi data
- Arrow Functions: Minimal 3 implementasi untuk berbagai operasi
- Template Literals: Untuk rendering dinamis dengan data
- Async/Await: Untuk operasi asinkron seperti pengambilan data cuaca
- Const dan Let: Untuk manajemen variabel yang tepat

## Debug & tips

- Jika data tidak tersimpan, periksa apakah browser dalam mode private/incognito atau ada pengaturan yang memblokir localStorage.
- Untuk melihat data saat ini: buka DevTools → Console → ketik `localStorage.getItem('dashboard_schedules')`, `localStorage.getItem('dashboard_tasks')`, atau `localStorage.getItem('dashboard_notes')`.
- Aplikasi menggunakan ES6+ features, pastikan browser yang digunakan mendukung fitur-fitur tersebut.

## Screenshot (contoh)

- `screenshots/dashboard.png` — tampilan dashboard lengkap
- `screenshots/schedule-form.png` — form tambah jadwal
- `screenshots/task-list.png` — daftar tugas dengan status
- `screenshots/statistics.png` — tampilan statistik real-time
