import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensured relative path import

// Import functions and data to expose
import { askAbun, resetAbunChat as resetAbunChatService } from './services/geminiService';
import { getBBADataContext } from './services/bbaDataService';
import * as constants from './constants';


if (typeof App === 'undefined') {
  console.error(
    "FATAL: The 'App' component failed to load. This usually means a critical JavaScript file (like React, React DOM, React Router, or App.tsx itself due to an internal error or failed dependency) could not be loaded or parsed. \n" +
    "Please check the following: \n" +
    "1. Your internet connection. \n" +
    "2. The browser's Network tab (in Developer Tools) for any failed script loads (especially from esm.sh). \n" +
    "3. Ensure you have performed a clean build (delete the 'dist' folder and rebuild the project). \n" +
    "4. Clear your browser cache thoroughly."
  );
  // Optionally, display a user-friendly message on the page
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = '<div style="font-family: sans-serif; padding: 20px; text-align: center; color: #ffcccc; background-color: #330000; border: 1px solid #660000; border-radius: 8px;"><h1>Application Error</h1><p>Gagal memuat komponen utama aplikasi. Silakan periksa koneksi internet Anda dan coba muat ulang halaman. Jika masalah berlanjut, periksa konsol browser untuk detail teknis atau hubungi dukungan.</p></div>';
  }
} else {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Expose debugging utilities to the console
  // In a real production build, you might gate this with process.env.NODE_ENV !== 'production'
  // For MakerSuite, it's generally fine to always have it.
  if (typeof window !== 'undefined') {
    (window as any).bbaAppDebug = {
      askAbun,
      resetAbunChatService,
      getBBADataContext,
      getAllConstants: () => constants,
      // You can add more functions or state references here if needed
    };
    // console.log(
    //   "%cDebugging BBA App:",
    //   "color: #FF4D6A; font-weight: bold; font-size: 1.1em;"
    // );
    // console.log(
    //   "Beberapa fungsi dan data aplikasi kini tersedia di konsol melalui objek `window.bbaAppDebug` atau cukup ketik `bbaAppDebug`."
    // );
    // console.log("Contoh penggunaan:");
    // console.log("  `bbaAppDebug.askAbun('Halo Abun!').then(res => console.log(res))`");
    // console.log("  `bbaAppDebug.resetAbunChatService()`");
    // console.log("  `console.log(bbaAppDebug.getBBADataContext())`");
    // console.log("  `console.log(bbaAppDebug.getAllConstants())`");
  }
}

// Removing speculative fix for "no default export"
// export default {};