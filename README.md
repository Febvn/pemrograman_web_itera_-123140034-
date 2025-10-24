# Personal Dashboard

Aplikasi Personal Dashboard sederhana yang menampilkan informasi pribadi seperti jadwal kuliah, daftar tugas, catatan, dan informasi cuaca/waktu. Aplikasi ini dibangun dengan teknologi web modern menggunakan HTML5, CSS3, dan JavaScript ES6+.

## 🚀 Fitur Aplikasi

### 📋 Manajemen Data
- **Jadwal Kuliah**: Tambah, edit, dan hapus jadwal kuliah dengan waktu, mata kuliah, dan lokasi
- **Daftar Tugas**: Kelola tugas dengan status selesai/belum, prioritas, dan deskripsi
- **Catatan**: Buat dan kelola catatan pribadi dengan judul dan konten
- **Statistik**: Dashboard statistik yang menampilkan jumlah total data


### ⚡ Fitur Interaktif
- **CRUD Operations**: Create, Read, Update, Delete untuk semua data
- **Real-time Updates**: Statistik dan tampilan yang update secara real-time
- **Modal Forms**: Form popup yang elegan untuk input data
- **Confirmation Dialogs**: Konfirmasi sebelum menghapus data

### 💾 Penyimpanan Lokal
- **localStorage**: Semua data disimpan secara lokal di browser
- **Data Persistence**: Data tetap tersimpan meskipun browser ditutup
- **Automatic Save**: Data tersimpan otomatis saat ada perubahan

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik dan modern
- **CSS3**: Glassmorphism, Grid Layout, Flexbox, Animations
- **JavaScript ES6+**: Classes, Arrow Functions, Template Literals, Async/Await
- **Font Awesome**: Icons untuk UI yang lebih menarik
- **Google Fonts**: Typography yang modern (Inter)

## 📱 Screenshot Aplikasi

## 🔧 Fitur ES6+ yang Diimplementasikan

### 1. **Classes (ES6 Classes)**
```javascript
class DataManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = this.loadData();
    }
}
```

### 2. **Arrow Functions (Minimal 3 implementasi)**
```javascript
// Arrow function untuk loading data
loadData = () => {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
}

// Arrow function untuk rendering
renderScheduleList = () => {
    // Implementation
}

// Arrow function untuk async operations
getWeatherData = async () => {
    // Implementation
}
```

### 3. **Template Literals**
```javascript
// Dynamic rendering dengan template literals
scheduleList.innerHTML = schedules.map(schedule => `
    <div class="schedule-item">
        <div class="schedule-time">${schedule.time}</div>
        <div class="schedule-subject">${schedule.subject}</div>
        <div class="schedule-location">${schedule.location}</div>
    </div>
`).join('');
```

### 4. **Async/Await**
```javascript
// Weather service dengan async/await
getWeatherData = async () => {
    try {
        const weatherData = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    temperature: Math.floor(Math.random() * 15) + 20,
                    condition: 'sunny'
                });
            }, 1000);
        });
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
```

### 5. **Const dan Let**
```javascript
// Penggunaan const untuk konstanta
const STORAGE_KEYS = {
    SCHEDULES: 'dashboard_schedules',
    TASKS: 'dashboard_tasks',
    NOTES: 'dashboard_notes'
};

// Penggunaan let untuk variabel yang bisa diubah
let currentEditId = null;
```

## 🚀 Cara Menjalankan Aplikasi

1. **Clone atau download** repository ini
2. **Buka file `index.html`** di browser modern
3. **Mulai menggunakan** aplikasi dengan menambah data melalui tombol "+" di setiap card

## 📁 Struktur File

```
Personal-Dashboard/
├── index.html          # Struktur HTML utama
├── styles.css          # Styling dengan glassmorphism
├── script.js           # JavaScript dengan ES6+ features
└── README.md           # Dokumentasi aplikasi
```

## 🎯 Fitur Unggulan

### 1. **Glassmorphism Design**
- Background transparan dengan efek blur
- Border subtle dengan opacity rendah
- Shadow yang dalam untuk efek floating

### 2. **Bento Grid Layout**
- Grid responsif yang menyesuaikan ukuran layar
- Card dengan ukuran yang berbeda untuk variasi visual
- Spacing yang konsisten dan proporsional

### 3. **Real-time Statistics**
- Update otomatis jumlah data
- Visualisasi statistik yang menarik
- Counter animasi untuk pengalaman yang smooth

### 4. **Interactive Elements**
- Hover effects pada semua elemen interaktif
- Smooth transitions dan animations
- Modal dengan backdrop blur

## 🔄 Data Flow

1. **User Input** → Form dalam modal
2. **Data Processing** → Class methods dengan arrow functions
3. **Storage** → localStorage dengan JSON serialization
4. **Display Update** → Template literals untuk rendering
5. **Statistics Update** → Real-time counter updates

## 🎨 Design System

### Colors
- **Primary Background**: Linear gradient dari #0c0c0c ke #1a1a1a
- **Card Background**: rgba(255, 255, 255, 0.05)
- **Text Color**: #ffffff
- **Accent Color**: #64b5f6 (Blue)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Sizes**: Responsive dari 0.8rem hingga 2.5rem

### Spacing
- **Grid Gap**: 25px
- **Card Padding**: 25px
- **Element Margin**: 10px-20px

## 📊 Performance

- **Local Storage**: Data tersimpan secara lokal, tidak memerlukan server
- **Lightweight**: File CSS dan JS yang ringan
- **Fast Loading**: Tidak ada dependency eksternal yang berat
- **Responsive**: Optimal di semua device



