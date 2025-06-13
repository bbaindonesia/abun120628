
import React, { useState, useEffect, useCallback } from 'react';

const PRAYER_NAMES: Record<string, string> = {
  Fajr: "Subuh",
  Dhuhr: "Dzuhur",
  Asr: "Ashar",
  Maghrib: "Maghrib",
  Isha: "Isya",
};

const PRAYER_TIMES_JAKARTA: Record<keyof typeof PRAYER_NAMES, string> = {
  Fajr: "04:40",
  Dhuhr: "11:58",
  Asr: "15:20",
  Maghrib: "17:55", 
  Isha: "19:08",
};

const PRAYER_TIMES_MAKKAH: Record<keyof typeof PRAYER_NAMES, string> = {
  Fajr: "04:55", 
  Dhuhr: "12:20",
  Asr: "15:45",
  Maghrib: "18:35", 
  Isha: "19:55",
};

interface PrayerInfo {
  currentPrayerText: string;
  nextPrayerText: string;
}

const getPrayerInfo = (
  dateObj: Date,
  prayerSchedule: Record<string, string>,
  prayerNamesMap: Record<string, string>
): PrayerInfo => {
  const currentHours = dateObj.getHours();
  const currentMinutes = dateObj.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  const sortedPrayers = Object.keys(prayerSchedule)
    .map(key => ({
      nameKey: key,
      displayName: prayerNamesMap[key],
      time: prayerSchedule[key],
      timeInMinutes: parseInt(prayerSchedule[key].split(':')[0], 10) * 60 + parseInt(prayerSchedule[key].split(':')[1], 10)
    }))
    .sort((a, b) => a.timeInMinutes - b.timeInMinutes);

  let currentPrayerText = "Memuat...";
  let nextPrayerText = "Memuat...";

  if (sortedPrayers.length === 0) { 
    return { currentPrayerText: "Jadwal tidak tersedia", nextPrayerText: "Jadwal tidak tersedia" };
  }
  
  if (currentTimeInMinutes < sortedPrayers[0].timeInMinutes) { 
    currentPrayerText = `Menunggu ${sortedPrayers[0].displayName}`;
    nextPrayerText = `${sortedPrayers[0].displayName} ${sortedPrayers[0].time}`;
  } else {
    for (let i = 0; i < sortedPrayers.length; i++) {
      const currentScheduledPrayer = sortedPrayers[i];
      const nextScheduledPrayer = (i + 1 < sortedPrayers.length) ? sortedPrayers[i + 1] : sortedPrayers[0];

      if (currentTimeInMinutes >= currentScheduledPrayer.timeInMinutes) {
        if (i === sortedPrayers.length - 1 || currentTimeInMinutes < nextScheduledPrayer.timeInMinutes) {
          currentPrayerText = `Waktu ${currentScheduledPrayer.displayName}`;
          nextPrayerText = `${nextScheduledPrayer.displayName} ${nextScheduledPrayer.time}`;
          break;
        }
      }
    }
  }
  return { currentPrayerText, nextPrayerText };
};


const TimeAndFlagsBanner: React.FC = () => {
  const [currentTimeWIB, setCurrentTimeWIB] = useState<string>('');
  const [currentGregorianDateWIB, setCurrentGregorianDateWIB] = useState<string>('');
  const [currentHijriDateWIB, setCurrentHijriDateWIB] = useState<string>('');
  const [currentPrayerWIB, setCurrentPrayerWIB] = useState<string>('');
  const [nextPrayerWIB, setNextPrayerWIB] = useState<string>('');

  const [currentTimeKSA, setCurrentTimeKSA] = useState<string>('');
  const [currentGregorianDateKSA, setCurrentGregorianDateKSA] = useState<string>('');
  const [currentHijriDateKSA, setCurrentHijriDateKSA] = useState<string>('');
  const [currentPrayerKSA, setCurrentPrayerKSA] = useState<string>('');
  const [nextPrayerKSA, setNextPrayerKSA] = useState<string>('');

  const updateDateTimeInfo = useCallback(() => {
    const now = new Date();
    const utcEpoch = now.getTime() + (now.getTimezoneOffset() * 60000);

    const wibDate = new Date(utcEpoch + (3600000 * 7));
    setCurrentTimeWIB(`${wibDate.getHours().toString().padStart(2, '0')}:${wibDate.getMinutes().toString().padStart(2, '0')}:${wibDate.getSeconds().toString().padStart(2, '0')}`);
    setCurrentGregorianDateWIB(wibDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    setCurrentHijriDateWIB(wibDate.toLocaleDateString('id-ID-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'}));
    const wibPrayerInfo = getPrayerInfo(wibDate, PRAYER_TIMES_JAKARTA, PRAYER_NAMES);
    setCurrentPrayerWIB(wibPrayerInfo.currentPrayerText);
    setNextPrayerWIB(wibPrayerInfo.nextPrayerText);

    const ksaDate = new Date(utcEpoch + (3600000 * 3));
    setCurrentTimeKSA(`${ksaDate.getHours().toString().padStart(2, '0')}:${ksaDate.getMinutes().toString().padStart(2, '0')}:${ksaDate.getSeconds().toString().padStart(2, '0')}`);
    setCurrentGregorianDateKSA(ksaDate.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Riyadh' }));
    setCurrentHijriDateKSA(ksaDate.toLocaleDateString('ar-SA-u-ca-islamic-nu-latn', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Asia/Riyadh'}));
    const ksaPrayerInfo = getPrayerInfo(ksaDate, PRAYER_TIMES_MAKKAH, PRAYER_NAMES);
    setCurrentPrayerKSA(ksaPrayerInfo.currentPrayerText);
    setNextPrayerKSA(ksaPrayerInfo.nextPrayerText);

  }, []);

  useEffect(() => {
    updateDateTimeInfo(); 
    const timerId = setInterval(updateDateTimeInfo, 1000); 
    return () => clearInterval(timerId);
  }, [updateDateTimeInfo]);

  const InfoBlock: React.FC<{
    flagSrc: string;
    countryName: string;
    currentTime: string;
    timeZoneSuffix: string;
    gregorianDate: string;
    hijriDate: string;
    currentPrayer: string;
    nextPrayer: string;
  }> = ({ flagSrc, countryName, currentTime, timeZoneSuffix, gregorianDate, hijriDate, currentPrayer, nextPrayer }) => (
    <div className="flex-1 bg-theme-widget-bg p-3 sm:p-4 rounded-lg space-y-1.5 text-left min-w-0 border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-soft hover:shadow-hologram-intense transition-shadow duration-300">
      <div className="flex items-center justify-start space-x-2.5 mb-2">
        <img 
          src={flagSrc} 
          alt={`Bendera ${countryName}`}
          className="w-8 h-auto sm:w-10 rounded-sm shadow-md" // Standard shadow for flag
          width="40" 
        />
        <div>
          <p className="text-xs sm:text-sm font-medium text-theme-text">{countryName}</p>
          <p className="font-digital text-base sm:text-lg font-bold text-theme-accent text-glow-accent">
            {currentTime || "00:00:00"} <span className="text-xs text-theme-text-muted">{timeZoneSuffix}</span>
          </p>
        </div>
      </div>
      <div className="text-xs text-theme-text-muted space-y-1">
        <p><strong className="font-medium text-theme-text">Masehi:</strong> {gregorianDate || "Memuat..."}</p>
        <p><strong className="font-medium text-theme-text">Hijriyah:</strong> {hijriDate || "Memuat..."}</p>
      </div>
      <div className="text-xs text-theme-text-muted pt-1.5 mt-1.5 border-t border-[var(--color-theme-widget-border-hologram)]/70 space-y-1"> 
        <p><strong className="font-medium text-sky-300 filter drop-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-sky-400/70">Saat Ini:</strong> {currentPrayer || "Memuat..."}</p>
        <p><strong className="font-medium text-amber-300 filter drop-shadow-[0_0_4px_var(--tw-shadow-color)] shadow-amber-400/70">Berikutnya:</strong> {nextPrayer || "Memuat..."}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-theme-bg shadow-xl rounded-xl p-2.5 mb-4 sm:mb-6 flex flex-row items-stretch gap-2.5 animate-fade-in border border-theme-border/70 transition-shadow duration-300">
      <InfoBlock
        flagSrc="https://flagcdn.com/w40/id.png"
        countryName="Indonesia"
        currentTime={currentTimeWIB}
        timeZoneSuffix="WIB"
        gregorianDate={currentGregorianDateWIB}
        hijriDate={currentHijriDateWIB}
        currentPrayer={currentPrayerWIB}
        nextPrayer={nextPrayerWIB}
      />
      
      <div className="w-px bg-[var(--color-theme-widget-border-hologram)]/50 self-stretch mx-1"></div>

      <InfoBlock
        flagSrc="https://flagcdn.com/w40/sa.png"
        countryName="Arab Saudi"
        currentTime={currentTimeKSA}
        timeZoneSuffix="KSA"
        gregorianDate={currentGregorianDateKSA}
        hijriDate={currentHijriDateKSA}
        currentPrayer={currentPrayerKSA}
        nextPrayer={nextPrayerKSA}
      />
    </div>
  );
};

export default TimeAndFlagsBanner;
