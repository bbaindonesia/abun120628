
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Layout from './components/Layout';
import { ChatWindow } from './components/ChatWindow';
import { BBA_PROFILE, BBA_LEGALITY, BBA_TERMS_AND_CONDITIONS_SUMMARY, BBA_EMERGENCY_CONTACTS, WHATSAPP_NOTIFICATION_NUMBER } from './constants'; // Ensured relative path
import InfoCard, { InfoIcon, QuranIcon, TasbihIcon, PackageIcon, PrayingHandsIcon, ExclamationCircleIcon, SuitcaseIcon, ZakatIcon, QiblaIcon, HijriCalendarIcon, GlossaryIcon, ClipboardListIcon } from './components/InfoCard'; // Added ClipboardListIcon
import RegistrationPage from './components/RegistrationPage';
import TimeAndFlagsBanner from './components/TimeAndFlagsBanner';
import useAbunLogic from './hooks/useAbunLogic';
import AbunAvatar from './components/AbunAvatar'; // Ensured relative path
import Modal from './components/Modal';
import LoadingSpinner from './components/LoadingSpinner';


// Import Widget Components
import QuranWidget from './components/QuranWidget';
import TasbihWidget from './components/TasbihWidget';
import DoaDzikirWidget from './components/DoaDzikirWidget';
import IbadahPackagesWidget from './components/IbadahPackagesWidget';
import PackingListWidget from './components/PackingListWidget';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import { ManasikPage } from './components/ManasikPage';
import ZakatCalculatorWidget from './components/ZakatCalculatorWidget';
import QiblaFinderWidget from './components/QiblaFinderWidget';
import IslamicCalendarWidget from './components/IslamicCalendarWidget';
import GlossaryWidget from './components/GlossaryWidget';
import TestimonialPage from './components/TestimonialPage'; // Import TestimonialPage


type WidgetKey = 'quran' | 'tasbih' | 'ibadahInfo' | 'doa' | 'packingList' | 'zakatCalculator' | 'qiblaFinder' | 'islamicCalendar' | 'glossary' | 'testimonial';

interface WidgetAccessButtonConfig {
  key: WidgetKey;
  label: string;
  icon: JSX.Element;
  description: string;
  actionType: 'modal' | 'navigate'; 
  navigateTo?: string;
}

const HomePage: React.FC = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const { messages, isLoading, handleSendMessage, resetChat } = useAbunLogic();
  const [activeWidgetKey, setActiveWidgetKey] = useState<WidgetKey | null>(null); // For regular widgets
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false); // Dedicated state for SOS modal
  const navigate = useNavigate();

  const [isSOSLoading, setIsSOSLoading] = useState<boolean>(false);
  const [sosStatusMessage, setSosStatusMessage] = useState<string | null>(null);


  const handleAbunAvatarClick = () => {
    setIsChatModalOpen(true);
  };
  
  const closeChatModal = () => setIsChatModalOpen(false);
  
  const openWidgetModal = (widgetKey: WidgetKey) => {
    setActiveWidgetKey(widgetKey);
    setIsSOSModalOpen(false); // Ensure SOS modal is closed if another widget is opened
  };
  const closeWidgetModal = () => {
    setActiveWidgetKey(null);
  };

  const closeSOSModal = () => {
    setIsSOSModalOpen(false);
    setSosStatusMessage(null);
    setIsSOSLoading(false);
  };

  const handleSOSActivation = async () => {
    setIsSOSLoading(true);
    setSosStatusMessage("Mengaktifkan SOS...\n\nSedang mencoba mendapatkan lokasi akurat Anda.\n\nUntuk hasil terbaik:\n1. Pastikan layanan lokasi (GPS) di perangkat Anda AKTIF.\n2. Atur mode lokasi ke 'Akurasi Tinggi' (jika tersedia di perangkat Anda).\n3. Berada di area terbuka dengan pandangan langit yang jelas jika memungkinkan.\n\nProses ini bisa memakan waktu hingga 20 detik. Mohon tunggu...");
    setIsSOSModalOpen(true); 

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { 
          timeout: 20000, 
          enableHighAccuracy: true,
          maximumAge: 0 
        });
      });
      
      const { latitude, longitude, accuracy } = position.coords;
      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const accuracyInMeters = accuracy ? accuracy.toFixed(0) : 'Tidak tersedia';
      const accuracyInfo = accuracy ? `Akurasi dari perangkat Anda: ±${accuracyInMeters} meter` : "Akurasi dari perangkat Anda: Tidak tersedia";
      
      let sosMessageText = `🚨 BANTUAN DARURAT (SOS) 🚨\nSaya membutuhkan bantuan darurat!\nLokasi saya (perkiraan dari perangkat):\nLatitude: ${latitude}\nLongitude: ${longitude}\n${accuracyInfo}\nLink Peta: ${mapsLink}\nMohon segera hubungi saya atau kirim bantuan.\n---\nPesan ini dikirim melalui fitur SOS Aplikasi BBA Indonesia.`;
      
      const encodedMessage = encodeURIComponent(sosMessageText);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NOTIFICATION_NUMBER}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      let userDisplayMessage = `Pesan darurat DENGAN LOKASI (dari perangkat Anda) telah disiapkan untuk dikirim via WhatsApp ke ${WHATSAPP_NOTIFICATION_NUMBER}.\nKoordinat: Lat ${latitude.toFixed(6)}, Long ${longitude.toFixed(6)} (${accuracyInfo}).\n\nHARAP KIRIM PESAN TERSEBUT SEKARANG DI WHATSAPP.\n\nJika WhatsApp tidak terbuka atau pesan gagal terkirim, segera hubungi nomor darurat BBA secara manual.\nPastikan layanan lokasi di perangkat Anda diatur ke mode 'Akurasi Tinggi' dan Anda berada di area dengan sinyal baik.`;

      if (accuracy) {
        if (accuracy > 10000) { 
          userDisplayMessage += `\n\n⚠️ PERINGATAN SANGAT PENTING:\nLokasi yang dilaporkan perangkat Anda saat ini memiliki tingkat akurasi yang SANGAT RENDAH (±${accuracyInMeters} meter). Lokasi ini kemungkinan besar SALAH dan TIDAK DAPAT DIANDALKAN untuk bantuan darurat.\n\nIni bisa terjadi jika GPS tidak berfungsi dan perangkat Anda menggunakan perkiraan lokasi dari jaringan seluler atau Wi-Fi, yang bisa sangat jauh dari posisi Anda sebenarnya.\n\nLANGKAH SEGERA:\n1. SEGERA HUBUNGI NOMOR KONTAK DARURAT BBA SECARA MANUAL.\n2. JANGAN mengandalkan lokasi otomatis ini.\n\nUntuk mencoba memperbaiki akurasi di perangkat Anda (JANGAN TUNDA MENGHUBUNGI DARURAT MANUAL):\n- Pastikan GPS dan layanan lokasi di perangkat Anda AKTIF.\n- Atur mode lokasi ke 'Akurasi Tinggi' (High Accuracy).\n- Pastikan aplikasi/browser ini memiliki izin untuk mengakses lokasi.\n- Pindah ke area terbuka dengan pandangan langit yang jelas.`;
        } else if (accuracy > 100) { 
          userDisplayMessage += `\n\nPERHATIAN: Akurasi lokasi yang dilaporkan perangkat Anda saat ini ±${accuracyInMeters} meter. Ini mungkin kurang presisi.\nUntuk akurasi lebih baik, coba pindah ke area yang lebih terbuka dengan pandangan langit yang jelas, pastikan GPS aktif dan di mode Akurasi Tinggi, lalu tunggu beberapa saat. Jika tetap kurang akurat, pertimbangkan menghubungi kontak darurat secara manual.`;
        } else if (accuracy > 30) { 
           userDisplayMessage += `\n\nINFO AKURASI: Lokasi Anda terdeteksi dengan akurasi ±${accuracyInMeters} meter. Untuk hasil terbaik, pastikan Anda berada di area dengan sinyal GPS yang baik.`;
        }
      }
      setSosStatusMessage(userDisplayMessage);

    } catch (error: any) {
      console.error("Error getting location or preparing SOS:", error);
      let sosMessageWithoutLocation = `🚨 BANTUAN DARURAT (SOS) 🚨\nSaya membutuhkan bantuan darurat!\n(Lokasi tidak dapat diakses secara otomatis oleh perangkat saya saat ini.)\nMohon segera hubungi saya atau kirim bantuan.\n---\nPesan ini dikirim melalui fitur SOS Aplikasi BBA Indonesia.`;
      
      const encodedMessage = encodeURIComponent(sosMessageWithoutLocation);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NOTIFICATION_NUMBER}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      let userMessage = `Pesan darurat TANPA LOKASI telah disiapkan untuk dikirim via WhatsApp ke ${WHATSAPP_NOTIFICATION_NUMBER}. HARAP KIRIM PESAN TERSEBUT SEKARANG DI WHATSAPP.\n\nSegera hubungi nomor darurat BBA secara manual.`;
      
      let errorDetail = "";
      if (error.code === error.PERMISSION_DENIED) {
        errorDetail = "Akses lokasi ditolak oleh Anda atau pengaturan browser/perangkat Anda.";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorDetail = "Informasi lokasi tidak tersedia dari perangkat Anda saat ini (mungkin GPS mati atau tidak ada sinyal).";
      } else if (error.code === error.TIMEOUT) {
        errorDetail = "Waktu habis saat mencoba mendapatkan lokasi. Sinyal GPS mungkin sangat lemah atau layanan lokasi tidak merespons dengan cepat.";
      } else {
        errorDetail = `Terjadi kesalahan teknis: ${error.message}`;
      }
      
      userMessage = `Gagal mendapatkan lokasi dari perangkat Anda: ${errorDetail}\n\nPesan darurat TANPA LOKASI telah disiapkan untuk WhatsApp. Harap kirim pesan tersebut dan segera hubungi nomor darurat BBA secara manual.\n\nTips Penting untuk Lokasi Akurat:\n1. Pastikan GPS dan layanan lokasi di perangkat Anda AKTIF.\n2. Atur mode lokasi ke 'Akurasi Tinggi' (High Accuracy) di pengaturan perangkat Anda.\n3. Pastikan aplikasi/browser ini memiliki izin untuk mengakses lokasi.\n4. Coba pindah ke area yang lebih terbuka dengan pandangan langit jelas.\n5. Restart layanan lokasi di perangkat Anda jika masalah berlanjut, lalu coba lagi. Jika akurasi terus menerus buruk (error besar), perangkat Anda mungkin mengalami masalah dengan GPS atau hanya bisa memberikan perkiraan lokasi jaringan yang tidak akurat.`;
      setSosStatusMessage(userMessage);
    } finally {
      setIsSOSLoading(false);
    }
  };


  const widgetAccessButtons: WidgetAccessButtonConfig[] = [
    { key: 'quran', label: "Al-Qur'an Digital", icon: <QuranIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Baca Al-Qur'an lengkap dengan terjemahan dan tafsir.", actionType: 'modal' },
    { key: 'ibadahInfo', label: 'Info Paket Ibadah', icon: <PackageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Informasi Paket Umrah, Haji & Manasik.", actionType: 'modal' },
    { key: 'glossary', label: "Kamus Istilah", icon: <GlossaryIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Kamus istilah penting Umrah dan Haji.", actionType: 'modal' },
    { key: 'doa', label: "Kumpulan Do'a", icon: <PrayingHandsIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Akses koleksi do'a dan dzikir harian.", actionType: 'modal' },
    { key: 'packingList', label: "Perlengkapan Umrah", icon: <SuitcaseIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Atur daftar barang bawaan Anda untuk perjalanan.", actionType: 'modal' },
    { key: 'tasbih', label: 'Tasbih Digital', icon: <TasbihIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Alat bantu dzikir praktis dengan mode hitung.", actionType: 'modal' },
    { key: 'qiblaFinder', label: "Arah Kiblat", icon: <QiblaIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Tentukan arah Kiblat dari lokasi Anda.", actionType: 'modal' },
    { key: 'zakatCalculator', label: "Kalkulator Zakat", icon: <ZakatIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Hitung kewajiban zakat Anda dengan mudah.", actionType: 'modal' },
    { key: 'islamicCalendar', label: "Kalender Islami", icon: <HijriCalendarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Lihat tanggal Hijriyah dan hari besar Islam.", actionType: 'modal' },
    { key: 'testimonial', label: "Testimoni Jamaah", icon: <ClipboardListIcon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-accent filter drop-shadow-glow-accent-icon" />, description: "Isi kuesioner kepuasan layanan BBA Indonesia.", actionType: 'navigate', navigateTo: '/testimonial' },
  ];
  
  const handleWidgetButtonClick = (widget: WidgetAccessButtonConfig) => {
    if (widget.actionType === 'navigate' && widget.navigateTo) {
      navigate(widget.navigateTo);
    } else if (widget.actionType === 'modal') {
      openWidgetModal(widget.key);
    }
  };

  const getWidgetModalTitle = (key: WidgetKey | null): string => {
    if (!key) return "Widget Islami";
    const config = widgetAccessButtons.find(btn => btn.key === key);
    return config ? config.label : "Widget Islami";
  };

  const renderActiveWidget = () => {
    if (!activeWidgetKey) return null;
    switch (activeWidgetKey) {
      case 'quran': return <QuranWidget />;
      case 'tasbih': return <TasbihWidget />;
      case 'ibadahInfo': return <IbadahPackagesWidget />;
      case 'doa': return <DoaDzikirWidget />;
      case 'packingList': return <PackingListWidget />;
      case 'zakatCalculator': return <ZakatCalculatorWidget />;
      case 'qiblaFinder': return <QiblaFinderWidget />;
      case 'islamicCalendar': return <IslamicCalendarWidget />;
      case 'glossary': return <GlossaryWidget />;
      // 'testimonial' is handled by navigation, not modal rendering here
      default: return null;
    }
  };
  
  const renderSOSModalContent = () => {
     return (
          <div className="p-3 text-sm space-y-3">
            {isSOSLoading && (
              <div className="flex flex-col items-center justify-center p-4">
                <LoadingSpinner text="Memproses permintaan SOS..." />
                {sosStatusMessage && <p className="text-theme-text-muted mt-2 text-center whitespace-pre-line">{sosStatusMessage}</p>}
              </div>
            )}
            {!isSOSLoading && sosStatusMessage && (
              <div className="p-3 bg-theme-interactive/30 rounded-md border border-[var(--color-theme-widget-border-hologram)]/70">
                <p className="text-theme-text font-semibold mb-2 text-glow-accent-strong">Status Aktivasi SOS:</p>
                <p className="text-theme-text whitespace-pre-line">{sosStatusMessage}</p>
              </div>
            )}
             <h4 className="text-md font-semibold text-red-500 text-center text-glow-accent-strong mt-3">Kontak Darurat BBA Indonesia</h4>
              <p className="text-theme-text-muted text-xs text-center">
                Jika Anda dalam keadaan darurat, segera hubungi juga layanan darurat lokal Arab Saudi jika diperlukan.
              </p>
              <div className="my-2 bg-red-700/30 p-3 rounded-md border border-red-500/70">
                {BBA_EMERGENCY_CONTACTS.map((contact, index) => (
                  <p key={index} className="text-red-300 font-semibold text-glow-accent text-center my-1">{contact}</p>
                ))}
              </div>
               <p className="text-xs text-theme-text-muted opacity-80 mt-3 pt-3 border-t border-[var(--color-theme-widget-border-hologram)]/70">
                <strong>Penting:</strong> Fitur SOS ini akan mencoba mengirimkan pesan melalui WhatsApp. Pastikan Anda memiliki koneksi internet dan aplikasi WhatsApp terinstal. Anda harus menekan tombol "kirim" di WhatsApp secara manual. Akurasi lokasi sangat bergantung pada perangkat Anda dan kondisi sinyal GPS.
              </p>
          </div>
        );
  };


  return (
    <div className="flex flex-col flex-grow items-center w-full p-2 sm:p-4 relative"> {/* Added relative for floating button positioning context */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-x-8 lg:gap-x-12 w-full max-w-6xl mx-auto">
        
        <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-center text-center p-2 sm:p-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-theme-accent mb-3 sm:mb-4 animate-fade-in text-glow-accent-strong">
            Assalamu'alaikum! Abun Siap Membantu!
          </h2>
          <p className="text-theme-text-muted mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base animate-fade-in" style={{animationDelay: '0.2s'}}>
            Kenalan dengan Abun, asisten AI canggih dari BBA Indonesia yang dapat menjawab pertanyaan Anda seputar Umrah, BBA, bahkan bisa diajak bercanda! Klik Abun di bawah untuk memulai.
          </p>
          
          <div className="my-4 sm:my-5 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <AbunAvatar
              size="xl"
              isInteractive={true}
              onClick={handleAbunAvatarClick} 
              isTyping={isLoading && isChatModalOpen}
            />
          </div>
          
          <p className="text-xs text-theme-text-muted animate-fade-in" style={{animationDelay: '0.6s'}}>
            (Klik Abun untuk membuka obrolan)
          </p>
        </div>

        <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col items-center md:items-start mt-8 md:mt-0 p-2 sm:p-4 animate-slide-in-bottom" style={{animationDelay: '0.8s'}}>
          <h3 className="text-xl sm:text-2xl font-semibold text-theme-text mb-4 sm:mb-6 text-center md:text-left w-full page-title-glow">
            Menu Widget & Fitur
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl"> {/* Adjusted for potentially more items */}
            {widgetAccessButtons.map((widget) => {
              const buttonBaseClasses = "p-3 sm:p-4 rounded-xl shadow-hologram-soft border border-[var(--color-theme-widget-border-hologram)] text-center hover:shadow-hologram-intense transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75 flex flex-col items-center justify-start space-y-2 min-h-[120px] sm:min-h-[140px]";
              const normalButtonClasses = "bg-theme-widget-bg hover:bg-theme-interactive focus:ring-theme-accent";
              
              return (
                <button
                  key={widget.key}
                  onClick={() => handleWidgetButtonClick(widget)}
                  className={`${buttonBaseClasses} ${normalButtonClasses}`}
                  aria-label={`Buka ${widget.label}`}
                >
                  {React.cloneElement(widget.icon, { 
                    className: `w-8 h-8 sm:w-10 sm:h-10 filter text-theme-accent drop-shadow-glow-accent-icon`
                  })}
                  <div className="flex flex-col items-center">
                    <h4 className={`text-sm sm:text-base font-semibold text-theme-text`}>{widget.label}</h4>
                    <p className={`text-xs mt-0.5 text-theme-text-muted`}>{widget.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating SOS Button */}
      <button
        onClick={handleSOSActivation}
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-45 w-16 h-16 sm:w-20 sm:h-20 bg-red-600 hover:bg-red-700 text-white font-bold text-lg sm:text-xl rounded-full flex items-center justify-center animate-pulse-emergency shadow-glow-emergency-strong focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105 active:scale-95"
        aria-label="Aktifkan Bantuan Darurat (SOS)"
        title="Bantuan Darurat (SOS)"
      >
        SOS
      </button>

      {/* Chat Modal */}
      <Modal
        isOpen={isChatModalOpen}
        onClose={closeChatModal}
        title="Ngobrol dengan Abun"
        headerIcon={<AbunAvatar size="sm" isTyping={isLoading} isInteractive={false} />}
      >
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
          resetChat={resetChat}
          onCloseModal={closeChatModal}
        />
      </Modal>

      {/* Widget Modal (for non-SOS widgets) */}
      <Modal
        isOpen={activeWidgetKey !== null && widgetAccessButtons.find(w => w.key === activeWidgetKey)?.actionType !== 'navigate'}
        onClose={closeWidgetModal}
        title={getWidgetModalTitle(activeWidgetKey)}
      >
        <div className="p-1 sm:p-2">
          {renderActiveWidget()}
        </div>
      </Modal>

      {/* SOS Modal */}
      <Modal
        isOpen={isSOSModalOpen}
        onClose={closeSOSModal}
        title="Informasi & Aktivasi Bantuan Darurat"
        headerIcon={<ExclamationCircleIcon className="w-6 h-6 text-red-400" />}
      >
         <div className="p-1 sm:p-2">
          {renderSOSModalContent()}
        </div>
      </Modal>

    </div>
  );
};

const PackagesPage: React.FC = () => (
  <div className="space-y-8 text-center animate-fade-in">
    <h2 className="text-3xl font-bold text-theme-accent page-title-glow">Paket Ibadah BBA Indonesia</h2>
    
    <div className="bg-theme-widget-bg p-6 sm:p-8 rounded-xl shadow-hologram-intense border border-[var(--color-theme-widget-border-hologram)] mb-6">
      <h3 className="text-2xl font-semibold text-theme-accent mb-4 text-glow-accent">Paket Umrah</h3>
      <p className="text-theme-text-muted mb-4 text-base sm:text-lg leading-relaxed">
        Untuk melihat semua informasi Paket Umrah yang paling baru dan lengkap—termasuk nama paket, bulan keberangkatan, rincian fasilitas, dan harga—silakan langsung periksa di situs web resmi BBA Tour.
      </p>
      <a
        href="https://bbatour.co.id/transaksi/paket-umrah"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-theme-accent hover:bg-theme-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-glow-accent-strong text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-75"
        aria-label="Buka Situs Web Paket Umrah Resmi BBA Tour di tab baru"
      >
        Lihat Paket Umrah
      </a>
    </div>

    <div className="bg-theme-widget-bg p-6 sm:p-8 rounded-xl shadow-hologram-intense border border-[var(--color-theme-widget-border-hologram)]">
      <h3 className="text-2xl font-semibold text-theme-accent mb-4 text-glow-accent">Paket Haji</h3>
      <p className="text-theme-text-muted mb-4 text-base sm:text-lg leading-relaxed">
        Untuk informasi lengkap dan paling mutakhir mengenai Paket Haji BBA Indonesia (Reguler, Plus, Furoda, Dakhili), silakan langsung kunjungi halaman resmi Paket Haji di situs web BBA Tour.
      </p>
      <a
        href="https://bbatour.co.id/transaksi/paket-haji"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-theme-accent hover:bg-theme-accent-hover text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-glow-accent-strong text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-75"
        aria-label="Buka Situs Web Paket Haji Resmi BBA Tour di tab baru"
      >
        Lihat Paket Haji
      </a>
    </div>
     <p className="text-xs text-theme-text-muted mt-6">
        Anda akan diarahkan ke situs web eksternal (bbatour.co.id) untuk detail paket.
      </p>
  </div>
);

const AboutPage: React.FC = () => (
 <div className="space-y-6 animate-fade-in">
    <h2 className="text-3xl font-bold text-theme-accent text-center page-title-glow">Tentang BBA Indonesia</h2>
    <InfoCard title="Profil Perusahaan" icon={<InfoIcon />} titleColorClass="text-theme-accent">
      <p><strong>Nama:</strong> {BBA_PROFILE.name}</p>
      <p><strong>SK Menteri:</strong> {BBA_PROFILE.skMenteri}</p>
      <p><strong>Prinsip:</strong> "{BBA_PROFILE.principle}"</p>
      <p><strong>Motto:</strong> "{BBA_PROFILE.motto}"</p>
      <p><strong>Visi:</strong> {BBA_PROFILE.vision}</p>
      <p><strong>Misi:</strong></p>
      <ul className="list-disc list-inside ml-4">
        {BBA_PROFILE.mission.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <p className="mt-2"><strong>Alamat Kantor:</strong> {BBA_PROFILE.address}</p>
      <p><strong>Kontak:</strong> {BBA_PROFILE.contact}</p>
    </InfoCard>

    <InfoCard title="Legalitas" icon={<InfoIcon />} titleColorClass="text-theme-accent">
      <p><strong>Izin Resmi PPIU:</strong> {BBA_LEGALITY.ppiuPermit}</p>
      <p><strong>Akreditasi:</strong> {BBA_LEGALITY.accreditation}</p>
      <p><strong>Nomor Rekening PT. Bani Bunyamin Attarbiyyah:</strong> {BBA_LEGALITY.bankAccount}</p>
    </InfoCard>

    <InfoCard title="Mengapa Memilih BBA Indonesia?" icon={<InfoIcon />} titleColorClass="text-theme-accent">
      <ul className="list-disc list-inside ml-4">
        {BBA_PROFILE.reasonsToChoose.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </InfoCard>
  </div>
);

const TermsPage: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-3xl font-bold text-theme-accent text-center page-title-glow">Syarat & Ketentuan Umum</h2>
    <InfoCard title="Pendaftaran & Administrasi" icon={<InfoIcon />} titleColorClass="text-theme-text">
      <p>{BBA_TERMS_AND_CONDITIONS_SUMMARY.registrationAdmin}</p>
    </InfoCard>
    <InfoCard title="Kebijakan Pembatalan" icon={<InfoIcon />} titleColorClass="text-theme-text">
      <p>{BBA_TERMS_AND_CONDITIONS_SUMMARY.cancellationPolicy}</p>
    </InfoCard>
    <InfoCard title="Penggantian Peserta" icon={<InfoIcon />} titleColorClass="text-theme-text">
      <p>{BBA_TERMS_AND_CONDITIONS_SUMMARY.participantReplacement}</p>
    </InfoCard>
     <InfoCard title="Larangan & Sanksi" icon={<InfoIcon />} titleColorClass="text-theme-text">
      <p>{BBA_TERMS_AND_CONDITIONS_SUMMARY.prohibitionsAndSanctions}</p>
    </InfoCard>
  </div>
);

export default function App(): React.ReactElement {
  return (
    <HashRouter>
      <Layout>
        <TimeAndFlagsBanner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/manasik" element={<ManasikPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} /> {/* Add Testimonial Route */}
        </Routes>
      </Layout>
    </HashRouter>
  );
}
