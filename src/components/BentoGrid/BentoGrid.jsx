/* Komponen kecil untuk menata child components dalam grid responsif */
import React from 'react';
/* Style grid */
import './BentoGrid.css';

/* BentoGrid membungkus children dengan class bento-grid; menerima className opsional */
const BentoGrid = ({ children, className = '' }) => {
  return (
    /* Gunakan kombinasi class default + class tambahan yang diteruskan */
    <div className={`bento-grid ${className}`}>
      {children}
    </div>
  );
};

/* Ekspor komponen BentoGrid */
export default BentoGrid;