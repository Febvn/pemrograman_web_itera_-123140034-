/* Import React dan hook statistik */
import React from 'react';
import { useBookStats } from '../../hooks/useBookStats';
/* Layout grid kecil untuk menata stat cards */
import BentoGrid from '../../components/BentoGrid/BentoGrid';
/* Ikon yang dipakai di halaman statistik */
import { BookOpen, Clock, ShoppingCart, CheckCircle, Timer } from 'lucide-react';
/* Import style untuk halaman statistik */
import './Stats.css';

/* Komponen Stats: menampilkan ringkasan statistik koleksi buku */
const Stats = () => {
  /* Ambil statistik dari hook custom */
  const { owned, reading, wantToBuy, completed, readingTime, total } = useBookStats();
  /*
    Untuk progress bar reading time kita normalisasikan terhadap baseline
    60 menit per buku, sehingga bar menunjukkan proporsi dari total*60
    (dibatasi maksimum 100%).
  */
  const readingCap = total * 60;
  const readingWidth = readingCap > 0 ? Math.min((readingTime / readingCap) * 100, 100) : 0;

  return (
    <div className="stats-page">
      <h1>Book Statistics</h1>
      <p className="stats-intro">
        Here's a summary of your book collection
      </p>

      <BentoGrid>
        {/* Stat cards: mengikuti layout Home agar konsisten */}
        <div className="bento-item">
          <div className="stat-card main">
            <div className="stat-icon">
              <BookOpen size={40} />
            </div>
            <div className="stat-info">
              <h3>{total}</h3>
              <p>Total Books</p>
            </div>
          </div>
        </div>

        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon owned">
              <BookOpen size={30} />
            </div>
            <div className="stat-info">
              <h3>{owned}</h3>
              <p>Owned</p>
            </div>
          </div>
        </div>

        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon reading">
              <Clock size={30} />
            </div>
            <div className="stat-info">
              <h3>{reading}</h3>
              <p>Currently Reading</p>
            </div>
          </div>
        </div>

        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon want-to-buy">
              <ShoppingCart size={30} />
            </div>
            <div className="stat-info">
              <h3>{wantToBuy}</h3>
              <p>Want to Buy</p>
            </div>
          </div>
        </div>

        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={30} />
            </div>
            <div className="stat-info">
              <h3>{completed}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        <div className="bento-item">
          <div className="stat-card">
            <div className="stat-icon reading-time">
              <Timer size={30} />
            </div>
            <div className="stat-info">
              <h3>{readingTime}</h3>
              <p>Reading Time(M)</p>
            </div>
          </div>
        </div>

        {/* Bagian distribusi buku berupa progress bars */}
        <div className="bento-item wide">
          <div className="progress-card">
            <h3>Book Distribution</h3>
            <div className="progress-container">
              <div className="progress-item">
                <span>Owned</span>
                <div className="progress-bar">
                  <div
                    className="progress owned"
                    style={{ width: `${total > 0 ? (owned / total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span>{total > 0 ? Math.round((owned / total) * 100) : 0}%</span>
              </div>
              <div className="progress-item">
                <span>Currently Reading</span>
                <div className="progress-bar">
                  <div
                    className="progress reading"
                    style={{ width: `${total > 0 ? (reading / total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span>{total > 0 ? Math.round((reading / total) * 100) : 0}%</span>
              </div>
              <div className="progress-item">
                <span>Want to Buy</span>
                <div className="progress-bar">
                  <div
                    className="progress want-to-buy"
                    style={{ width: `${total > 0 ? (wantToBuy / total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span>{total > 0 ? Math.round((wantToBuy / total) * 100) : 0}%</span>
              </div>
              <div className="progress-item">
                <span>Completed</span>
                <div className="progress-bar">
                  <div
                    className="progress completed"
                    style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span>{total > 0 ? Math.round((completed / total) * 100) : 0}%</span>
              </div>
              <div className="progress-item">
                <span>Reading Time(M)</span>
                <div className="progress-bar">
                  <div
                    className="progress reading-time"
                    style={{ width: `${readingWidth}%` }}
                  ></div>
                </div>
                <span>{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </BentoGrid>
    </div>
  );
};

/* Ekspor komponen Stats */
export default Stats;