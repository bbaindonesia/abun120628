
import React, { useState, useEffect } from 'react';
import { IslamicHoliday } from '../types';

// Data Hari Besar Islam (Contoh untuk ~1445-1446 H / 2024 M)
// Tanggal Masehi adalah perkiraan dan dapat bervariasi.
const predefinedIslamicHolidays: IslamicHoliday[] = [
  { name: "Tahun Baru Islam", hijriDate: "1 Muharram", gregorianEstimate: "7 Juli 2024*", description: "Awal tahun kalender Hijriyah." },
  { name: "Puasa Asyura", hijriDate: "10 Muharram", gregorianEstimate: "16 Juli 2024*", description: "Hari kesepuluh bulan Muharram, disunnahkan berpuasa." },
  { name: "Maulid Nabi Muhammad SAW", hijriDate: "12 Rabiul Awal", gregorianEstimate: "15 September 2024*", description: "Peringatan hari kelahiran Nabi Muhammad SAW." },
  { name: "Isra Mi'raj Nabi Muhammad SAW", hijriDate: "27 Rajab", gregorianEstimate: "7 Februari 2025*", description: "Peringatan perjalanan malam Nabi Muhammad SAW." },
  { name: "Nisfu Sya'ban", hijriDate: "15 Sya'ban", gregorianEstimate: "15 Februari 2025*", description: "Malam pertengahan bulan Sya'ban." },
  { name: "Awal Ramadan", hijriDate: "1 Ramadan", gregorianEstimate: "1 Maret 2025*", description: "Permulaan bulan puasa Ramadan." },
  { name: "Nuzulul Qur'an", hijriDate: "17 Ramadan", gregorianEstimate: "17 Maret 2025*", description: "Peringatan turunnya Al-Qur'an pertama kali." },
  { name: "Lailatul Qadar", hijriDate: "10 Malam Terakhir Ramadan", gregorianEstimate: "Akhir Maret 2025*", description: "Malam kemuliaan di bulan Ramadan." },
  { name: "Idul Fitri", hijriDate: "1 Syawal", gregorianEstimate: "30 Maret 2025*", description: "Hari Raya setelah sebulan penuh berpuasa Ramadan." },
  { name: "Puasa Arafah", hijriDate: "9 Dzulhijjah", gregorianEstimate: "5 Juni 2025*", description: "Puasa sunnah pada hari Arafah bagi yang tidak berhaji." },
  { name: "Idul Adha", hijriDate: "10 Dzulhijjah", gregorianEstimate: "6 Juni 2025*", description: "Hari Raya Kurban." },
  { name: "Hari Tasyrik", hijriDate: "11, 12, 13 Dzulhijjah", gregorianEstimate: "7-9 Juni 2025*", description: "Hari-hari setelah Idul Adha, diharamkan berpuasa." },
];


const IslamicCalendarWidget: React.FC = () => {
  const [currentHijriDate, setCurrentHijriDate] = useState<string>('');
  const [currentGregorianDate, setCurrentGregorianDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    try {
      const hijriFormatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
      });
      setCurrentHijriDate(hijriFormatter.format(today));
    } catch (e) {
      console.error("Error formatting Hijri date with id-ID-u-ca-islamic:", e);
      // Fallback for browsers that might not fully support id-ID with islamic calendar
      try {
        const hijriFormatterEn = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        setCurrentHijriDate(hijriFormatterEn.format(today) + " (Format Internasional)");
      } catch (e2) {
          console.error("Error formatting Hijri date with en-US-u-ca-islamic:", e2);
          setCurrentHijriDate('Tidak dapat memuat tanggal Hijriyah.');
      }
    }

    const gregorianFormatter = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
    setCurrentGregorianDate(gregorianFormatter.format(today));
  }, []);

  return (
    <div className="p-2 space-y-3 text-sm">
      <div className="p-3 bg-theme-interactive/30 rounded-lg border border-[var(--color-theme-widget-border-hologram)]/70 shadow-hologram-soft text-center">
        <h4 className="text-md font-semibold text-theme-accent mb-1 text-glow-accent">Tanggal Hari Ini</h4>
        <p className="text-theme-text">{currentGregorianDate || "Memuat tanggal Masehi..."}</p>
        <p className="text-theme-text font-medium">{currentHijriDate || "Memuat tanggal Hijriyah..."}</p>
      </div>

      <div className="p-3 bg-theme-widget-bg rounded-lg border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-intense">
        <h4 className="text-md font-semibold text-theme-accent mb-2 text-glow-accent-strong text-center">Hari Besar Islam (Perkiraan)</h4>
        <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-widget scrollbar-track-widget">
          {predefinedIslamicHolidays.map(holiday => (
            <div key={holiday.name} className="p-2 bg-theme-interactive/40 rounded-md border border-[var(--color-theme-widget-border-hologram)]/50">
              <p className="font-semibold text-theme-text">{holiday.name}</p>
              <p className="text-xs text-theme-text-muted">
                {holiday.hijriDate} (Perkiraan: {holiday.gregorianEstimate})
              </p>
              {holiday.description && <p className="text-xs text-theme-text-muted opacity-80 mt-0.5">{holiday.description}</p>}
            </div>
          ))}
        </div>
        <p className="text-xs text-theme-text-muted opacity-70 mt-3 pt-2 border-t border-dashed border-[var(--color-theme-widget-border-hologram)]/50">
          (*) Tanggal Masehi adalah perkiraan dan dapat berbeda tergantung pada hasil rukyatul hilal (pengamatan bulan sabit) di wilayah Anda atau pengumuman resmi dari otoritas keagamaan.
        </p>
      </div>
    </div>
  );
};

export default IslamicCalendarWidget;
