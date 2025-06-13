
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

type IbadahType = 'umrah' | 'haji' | 'manasik';

const IbadahPackagesWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<IbadahType>('umrah');

  const umrahInfo = {
    title: "Paket Umrah BBA Indonesia",
    description: "Untuk melihat semua informasi Paket Umrah yang paling baru dan lengkap—termasuk nama paket, bulan keberangkatan, rincian fasilitas, dan harga—silakan langsung periksa di situs web resmi BBA Tour.",
    url: "https://bbatour.co.id/transaksi/paket-umrah",
    buttonText: "Lihat Paket Umrah di BBA Tour",
    disclaimer: "Situs web resmi BBA Tour merupakan sumber yang paling akurat dan terjamin untuk semua detail paket Umrah."
  };

  const hajiInfo = {
    title: "Paket Haji BBA Indonesia",
    description: "Untuk informasi lengkap dan paling mutakhir mengenai Paket Haji BBA Indonesia (Reguler, Plus, Furoda, Dakhili), termasuk perkiraan jadwal keberangkatan, biaya awal, dan fasilitas, silakan langsung kunjungi halaman resmi Paket Haji di situs web BBA Tour.",
    url: "https://bbatour.co.id/transaksi/paket-haji",
    buttonText: "Lihat Paket Haji di BBA Tour",
    disclaimer: "Semua detail penting dan pilihan paket haji dapat dilihat langsung di sana."
  };

  const manasikInfo = {
    title: "Panduan Manasik Umrah Lengkap",
    description: "Pelajari tata cara pelaksanaan ibadah Umrah secara lengkap dan benar sesuai sunnah. Panduan ini mencakup persiapan, niat, thawaf, sa'i, hingga doa-doa penting.",
    url: "/manasik", 
    buttonText: "Buka Panduan Manasik",
    disclaimer: "Panduan ini disarikan dari buku panduan resmi BBA Indonesia."
  };
  
  let currentInfo;
  if (activeTab === 'umrah') {
    currentInfo = umrahInfo;
  } else if (activeTab === 'haji') {
    currentInfo = hajiInfo;
  } else {
    currentInfo = manasikInfo;
  }

  const tabButtonBaseClass = "flex-1 py-2.5 sm:py-3 px-1 text-xs sm:text-sm font-medium focus:outline-none transition-all duration-200";
  const activeTabClass = "border-b-2 border-theme-accent text-theme-accent bg-theme-interactive/60 shadow-inner";
  const inactiveTabClass = "text-theme-text-muted hover:text-theme-text hover:bg-theme-interactive/40 border-b-2 border-transparent hover:border-theme-accent/60";

  return (
    <div className="flex flex-col text-sm">
      <div className="flex border-b border-[var(--color-theme-widget-border-hologram)] flex-shrink-0 bg-theme-widget-bg rounded-t-lg">
        <button
          onClick={() => setActiveTab('umrah')}
          className={`${tabButtonBaseClass} ${activeTab === 'umrah' ? activeTabClass : inactiveTabClass} rounded-tl-lg`}
          aria-pressed={activeTab === 'umrah'}
        >
          Paket Umrah
        </button>
        <button
          onClick={() => setActiveTab('haji')}
          className={`${tabButtonBaseClass} ${activeTab === 'haji' ? activeTabClass : inactiveTabClass}`}
          aria-pressed={activeTab === 'haji'}
        >
          Paket Haji
        </button>
        <button 
          onClick={() => setActiveTab('manasik')}
          className={`${tabButtonBaseClass} ${activeTab === 'manasik' ? activeTabClass : inactiveTabClass} rounded-tr-lg`}
          aria-pressed={activeTab === 'manasik'}
        >
          Panduan Manasik
        </button>
      </div>

      <div className="p-3 space-y-3 bg-theme-widget-bg rounded-b-lg border-x border-b border-[var(--color-theme-widget-border-hologram)] shadow-hologram-intense">
        <h4 className="text-md font-semibold text-theme-accent text-center text-glow-accent-strong">{currentInfo.title}</h4>
        <p className="text-theme-text-muted">
          {currentInfo.description}
        </p>
        <p className="text-theme-text-muted text-xs opacity-80">
          {currentInfo.disclaimer}
        </p>
        <div className="text-center mt-4">
          {activeTab === 'manasik' ? (
            <Link
              to={currentInfo.url} 
              className="inline-block bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold py-2.5 px-5 rounded-lg transition-colors duration-300 shadow-md hover:shadow-glow-accent-strong text-sm transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-75"
              aria-label={currentInfo.buttonText}
            >
              {currentInfo.buttonText}
            </Link>
          ) : (
            <a
              href={currentInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold py-2.5 px-5 rounded-lg transition-colors duration-300 shadow-md hover:shadow-glow-accent-strong text-sm transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-75"
              aria-label={currentInfo.buttonText}
            >
              {currentInfo.buttonText}
            </a>
          )}
        </div>
        {(activeTab === 'umrah' || activeTab === 'haji') && (
             <p className="text-xs text-theme-text-muted opacity-80 mt-2 text-center">
              (Anda akan diarahkan ke situs web eksternal: bbatour.co.id)
            </p>
        )}
      </div>
    </div>
  );
};

export default IbadahPackagesWidget;
