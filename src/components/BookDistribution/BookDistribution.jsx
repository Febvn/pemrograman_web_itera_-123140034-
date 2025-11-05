/* Komponen untuk menampilkan distribusi buku sebagai daftar item dengan persen */
import React from 'react';
/* Style untuk distribusi */
import './BookDistribution.css';
/* Ikon yang dipakai pada tiap jenis distribusi */
import { BookOpen, Clock, ShoppingCart, CheckCircle, Timer } from 'lucide-react';

/* Sub-komponen: satu item distribusi (ikon, judul, value, persen) */
const DistributionItem = ({ icon, title, value, percent, className }) => (
  <div className={`dist-item ${className || ''}`}>
    <div className="dist-content">
      <div className="dist-header">
        {/* Ikon kecil */}
        <span className="dist-icon">{icon}</span>
        {/* Judul item */}
        <span className="dist-title">{title}</span>
      </div>
      <div className="dist-data">
        {/* Nilai (count) */}
        <span className="dist-value">{value}</span>
        {/* Jika percent diberikan, tampilkan bar dan teks persen */}
        {typeof percent === 'number' && (
          <div className="dist-percent-container">
            <div className="dist-percent-bar" style={{ width: `${percent}%` }}></div>
            <span className="dist-percent">{percent}%</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

/* Komponen utama BookDistribution menerima objek stats */
const BookDistribution = ({ stats = {} }) => {
  /* Ambil nilai statistik dengan default 0 */
  const { owned = 0, reading = 0, wantToBuy = 0, completed = 0, readingTime = 0, total = 0 } = stats;

  /* Fungsi helper: hitung persen dari sebuah count terhadap total */
  const pct = (count) => (total > 0 ? Math.round((count / total) * 100) : 0);

  return (
    <div className="book-distribution">
      <div className="distribution-container">
        <div className="distribution-stats">
          <div className="dist-total">
            {/* Tampilkan total buku */}
            <span className="dist-total-value">{total}</span>
            
            <h2 className="bd-title">Book Distribution</h2>
          </div>
          
          <div className="distribution-grid">
            {/* Masing-masing DistributionItem menampilkan satu kategori */}
            <DistributionItem
              icon={<BookOpen size={18} />}
              title="Owned"
              value={owned}
              percent={pct(owned)}
              className="owned"
            />

            <DistributionItem
              icon={<Clock size={18} />}
              title="Currently Reading"
              value={reading}
              percent={pct(reading)}
              className="reading"
            />

            <DistributionItem
              icon={<ShoppingCart size={18} />}
              title="Want to Buy"
              value={wantToBuy}
              percent={pct(wantToBuy)}
              className="want-to-buy"
            />

            <DistributionItem
              icon={<CheckCircle size={18} />}
              title="Completed"
              value={completed}
              percent={pct(completed)}
              className="completed"
            />

            <DistributionItem
              icon={<Timer size={18} />}
              title="Reading Time (mins)"
              value={readingTime}
              percent={null} /* reading time tidak memiliki persen terhadap total buku */
              className="reading-time"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Ekspor komponen BookDistribution */
export default BookDistribution;

