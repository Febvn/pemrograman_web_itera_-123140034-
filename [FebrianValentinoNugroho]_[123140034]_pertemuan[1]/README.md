# Task Manager Mahasiswa

Aplikasi web sederhana untuk membantu mahasiswa mengelola tugas kuliah. Proyek ini adalah aplikasi statis (HTML/CSS/JS) yang menyimpan data di browser menggunakan localStorage.


![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Ui/UX     :
UIverse
## Ringkasan singkat

- Status: siap untuk digunakan secara lokal (fitur CRUD, pencarian, filter, validasi dasar).
- Penyimpanan: localStorage (kunci: `tasks`).

## Fitur utama

- Tambah tugas (nama tugas wajib, mata kuliah, deadline opsional)
- Edit tugas
- Tandai selesai / belum selesai
- Hapus tugas
- Pencarian teks dan filter berdasarkan mata kuliah
- Filter status: Semua / Belum Selesai / Selesai
- Menampilkan jumlah tugas yang belum selesai (real-time)
- Validasi form dasar (nama wajib, cek tanggal valid)

## Fitur terperinci

Berikut adalah daftar fitur yang benar-benar diimplementasikan beserta penjelasan perilaku dan rujukan ke bagian kode utama (`assets/js/app.js` / `index.html`):

- Create / Edit (Tambah & Sunting):
  - Form di `index.html` (`#task-form`) memungkinkan menambah tugas baru atau menyunting tugas yang ada.
  - Fungsi: `upsertTask()` — membuat tugas baru (dengan `uid()`) atau memperbarui item yang ada berdasarkan `#task-id`.

- Read (Tampilkan daftar tugas):
  - Daftar tugas dirender di elemen `#task-list` oleh fungsi `render()` yang mengambil data dari `tasks`.
  - Data diambil dari `localStorage` saat inisialisasi oleh `load()`.

- Update (Tandai selesai / Edit fields):
  - Tombol toggle (ikon `✔` / `⟲`) memanggil `toggleDone(id)` untuk membalik status `done`.
  - Tombol Edit memanggil `editTask(id)` yang mengisi form dengan data tugas untuk disunting.

- Delete: 
  - Tombol delete memanggil `deleteTask(id)` dan menampilkan konfirmasi `confirm()` sebelum menghapus.

- Penyimpanan lokal (Persistence):
  - Semua perubahan disimpan ke `localStorage` dengan kunci `tasks` melalui `save()`.
  - Format data: array objek tugas (lihat contoh JSON di bagian teknis).

- Pencarian dan Filter:
  - Search input `#search-input` melakukan pencarian teks pada nama tugas dan mata kuliah.
  - Filter mata kuliah (`#course-filter`) dibangun secara dinamis dari data tugas oleh `renderCourseFilter()`.
  - Filter status (`#status-filter`) mendukung: semua / belum selesai / selesai.
  - Fungsi yang menggabungkan filter dan search: `getFiltered()`.

- Urutan / Sorting:
  - Sorting default menempatkan tugas belum selesai di atas (incomplete first), lalu mengurutkan berdasarkan deadline (lebih awal terlebih dahulu). Jika tidak ada deadline, diurutkan berdasarkan `createdAt`.

- Validasi Form:
  - Nama tugas wajib (`validateForm()` menolak jika kosong dan menampilkan pesan di `#form-error`).
  - Jika deadline diisi, dicek validitasnya menggunakan `new Date(value + 'T23:59:59')` dan `isNaN`.

- Statistik singkat:
  - Elemen `#pending-count` menampilkan jumlah tugas yang belum selesai secara real-time.

- Tema (Light / Dark):
  - Toggle tema ada pada elemen checkbox `.theme-switch__checkbox` dan disimpan di `localStorage` dengan kunci `tm_theme`.
  - Default tema: dark (night). Fungsi pengaturan tema dijalankan saat inisialisasi.

- Aksesibilitas & keyboard:
  - Tombol-tombol aksi memiliki `aria-label` yang sesuai (edit/delete/toggle).
  - Ikon pencarian `search-icon` memiliki `tabindex="0"` dan mendukung `keydown` Enter/Space untuk fokus ke input pencarian.
  - Elemen error form menggunakan `aria-live="polite"` untuk pemberitahuan screen-reader.

- Utility & debugging:
  - Aplikasi mengekspos `window.__tm = { tasks, save, load }` untuk debugging dari console (opsional).

Catatan implementasi singkat (lokasi fungsi penting di `assets/js/app.js`):

- `load()` / `save()` — baca/tulis `localStorage`
- `uid()` — buat id unik
- `validateForm()` — logika validasi form
- `upsertTask()` — tangani submit form (tambah/sunting)
- `render()` / `getFiltered()` — keluarkan daftar yang difilter & diurutkan
- `toggleDone()`, `deleteTask()`, `editTask()` — aksi per-item

## Cara menguji fitur (cek cepat)

1. Tambah tugas baru tanpa nama → harus muncul pesan error.
2. Tambah tugas dengan deadline yang tidak valid → harus ditolak.
3. Tambah beberapa tugas dengan dan tanpa deadline → periksa urutan (belum selesai dulu, lalu deadline lebih awal).
4. Gunakan pencarian untuk mencari berdasarkan nama atau mata kuliah.
5. Pilih filter mata kuliah dan status untuk memastikan hasil sesuai.
6. Tandai tugas selesai lalu periksa jumlah di `#pending-count`.
7. Ubah tema menggunakan switch, refresh halaman, pastikan tema tersimpan.
8. Buka DevTools → Console → `localStorage.getItem('tasks')` untuk memeriksa data yang tersimpan.


## Struktur berkas

- `index.html` — tampilan aplikasi
- `assets/css/style.css` — gaya UI
- `assets/js/app.js` — logika aplikasi (CRUD, localStorage, validasi, filter)
- `assets/screenshots/*` — contoh screenshot

## Cara cepat menjalankan

Panduan ini membantu Anda menyesuaikan path bila folder proyek dipindah atau diganti nama.

1. Tempatkan folder proyek di direktori root server web lokal Anda (contoh XAMPP):

  - Contoh path XAMPP: `C:/xampp/htdocs/` atau `C:/xampp2/htdocs/`.
  - Misal Anda menaruh folder proyek dengan nama `TUGAS1`, maka letak file akan menjadi:

    `C:/xampp2/htdocs/TUGAS1/index.html`

2. Akses melalui browser dengan URL `http://localhost/<nama-folder>/`.

  - Contoh: jika folder bernama `TUGAS1` → `http://localhost/TUGAS1/`
  - Jika Anda meletakkan proyek di subfolder (mis. `projects/TUGAS1`), gunakan `http://localhost/projects/TUGAS1/`.

3. Alternatif: buka file `index.html` langsung tanpa server (metode cepat):

  `file:///C:/path/to/project/index.html`

Catatan penting:

- Jika Anda memindahkan atau mengganti nama folder proyek, sesuaikan `<nama-folder>` pada URL `http://localhost/<nama-folder>/`.
- localStorage bekerja ketika halaman dimuat di browser. Untuk menghindari masalah izin atau mode private, buka di jendela browser normal.
- Jika Anda menggunakan server dengan port selain 80 (mis. `localhost:8080`), tambahkan port di URL: `http://localhost:8080/<nama-folder>/`.

## Contoh untuk lokasi Anda saat ini

Jika proyek Anda berada di:

```
C:\xampp2\htdocs\[FebrianValentinoNugroho]_[123140034]_pertemuan[1]
```

maka cara mengaksesnya di browser:

- Dengan nama folder persis (mengandung karakter `[]` dan `_`):

  - URL: `http://localhost/[FebrianValentinoNugroho]_[123140034]_pertemuan[1]/`

  Catatan: beberapa server atau browser mungkin memiliki masalah dengan karakter khusus (`[ ]`) di path. Jika Anda mendapat error 404 atau masalah akses, pertimbangkan untuk mengganti nama folder.

- Rekomendasi (lebih aman/ramah URL): ganti nama folder menjadi nama sederhana tanpa spasi atau karakter khusus, mis. `TUGAS1` atau `task-manager`:

  - Ubah folder:

    `C:\xampp2\htdocs\[FebrianValentinoNugroho]_[123140034]_pertemuan[1]` → `C:\xampp2\htdocs\TUGAS1`

  - Akses: `http://localhost/TUGAS1/`

Jika Anda ingin, saya bisa mengubah contohnya langsung di README untuk menampilkan URL yang ramah berdasarkan nama folder pilihan Anda.

## Detil teknis — Penyimpanan (localStorage)

- Kunci penyimpanan: `tasks`.
- Setiap perubahan menyimpan ulang array tugas:

  localStorage.setItem('tasks', JSON.stringify(tasks))

- Saat halaman dimuat, aplikasi mengambil data:

  const tasks = JSON.parse(localStorage.getItem('tasks')) || []

- Contoh struktur satu objek tugas:

  {
    "id": "<unik>",
    "name": "Tugas Algoritma",
    "course": "Algoritma",
    "deadline": "2025-10-20" | null,
    "done": false,
    "createdAt": "2025-10-18T08:00:00.000Z"
  }

## Validasi form (ringkas)

- Nama tugas wajib: input tidak boleh kosong. Jika kosong, form menampilkan pesan error dan mencegah penyimpanan.
- Deadline opsional: jika diisi, aplikasi memeriksa apakah tanggal valid (contoh implementasi: `new Date(value + 'T23:59:59')` dan cek `isNaN`).
- Terdapat atribut `maxlength` untuk mencegah input berlebih.

## Debug & tips

- Jika data tidak tersimpan, periksa apakah browser dalam mode private/incognito atau ada pengaturan yang memblokir localStorage.
- Untuk melihat data saat ini: buka DevTools → Console → ketik `localStorage.getItem('tasks')`.

## Screenshot (contoh)

- `assets/screenshots/1-dashboard.svg` — dashboard (daftar tugas + form)
- `assets/screenshots/2-filter.svg` — contoh hasil filter/pencarian
- `assets/screenshots/3-stats.svg` — ringkasan statistik (tugas belum selesai)

live Demo: https://manager.page.gd/



