/*
  reportWebVitals.js
  -----------------
  Penjelasan: Utility untuk mengukur metrik performa web (web-vitals).
  - Tujuan: memberikan hook untuk mengirim metrik (CLS, FID, LCP, dll.) ke service
    atau console agar developer dapat memantau performa.
  - Cara pakai: import reportWebVitals dan panggil dengan callback (mis. console.log)
*/
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
