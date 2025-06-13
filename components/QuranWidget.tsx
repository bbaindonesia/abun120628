
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { QURAN_API_BASE_URL } from '../constants';
import { ApiSurah, CombinedAyah, QuranEditionResponse, AyahTextPart, TajwidSpan, TajwidRule, TafsirResponse, ApiTafsirAyah } from '../types';
import LoadingSpinner from './LoadingSpinner';

// Basic illustrative Tajwid coloring function for LIGHT BACKGROUND
const applyBasicTajwidColorsLight = (arabicText: string): AyahTextPart[] => {
  const parts: AyahTextPart[] = [];
  let remainingText = arabicText;

  // Patterns for Tajwid rules (order might matter for overlapping patterns)
  const tajwidPatterns: { rule: TajwidRule, pattern: RegExp }[] = [
    { rule: 'ghunnah', pattern: /([نْمّ](?![ْ]))/g }, 
    { rule: 'qalqalah', pattern: /([قطبجدْ])/g }, 
    { rule: 'ikhfa', pattern: /(نْ(?![رلmWيأهعحغخ]))/g }, 
    { rule: 'mad_normal', pattern: /([\u064E\u064F\u0650][\u0627\u0648\u064Aآ](?![ْ]))/g }, 
  ];
  
  const combinedPatternSource = tajwidPatterns.map(p => `(${p.pattern.source})`).join('|');
  const allPatternsRegex = new RegExp(combinedPatternSource, 'g');
  
  let lastIndex = 0;
  let match;

  while ((match = allPatternsRegex.exec(remainingText)) !== null) {
    const matchedText = match[0]; 

    if (match.index > lastIndex) {
      parts.push(remainingText.substring(lastIndex, match.index));
    }
    
    let appliedRule: TajwidRule | undefined = undefined;
    for (let i = 0; i < tajwidPatterns.length; i++) {
      if (match[i + 1] !== undefined) { 
        appliedRule = tajwidPatterns[i].rule;
        break;
      }
    }

    if (appliedRule) {
      parts.push({ text: matchedText, rule: appliedRule } as TajwidSpan);
    } else {
      parts.push(matchedText); 
    }
    
    lastIndex = match.index + matchedText.length;
  }

  if (lastIndex < remainingText.length) {
    parts.push(remainingText.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : [arabicText];
};


const renderAyahTextWithTajwidLight = (textParts: AyahTextPart[]): JSX.Element[] => {
  return textParts.map((part, index) => {
    if (typeof part === 'string') {
      return <span key={index} className="tajwid-default-light">{part}</span>;
    }
    const tajwidPart = part as TajwidSpan;
    let className = 'tajwid-default-light'; 
    switch (tajwidPart.rule) {
      case 'ghunnah': className = 'tajwid-ghunnah-light'; break;
      case 'ikhfa': className = 'tajwid-ikhfa-light'; break;
      case 'qalqalah': className = 'tajwid-qalqalah-light'; break;
      case 'mad_normal': className = 'tajwid-mad-normal-light'; break;
      default: break;
    }
    return <span key={index} className={className}>{tajwidPart.text}</span>;
  });
};


const QuranWidget: React.FC = () => {
  const [surahs, setSurahs] = useState<ApiSurah[]>([]);
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [displayedAyahs, setDisplayedAyahs] = useState<CombinedAyah[]>([]);
  const [isLoadingSurahs, setIsLoadingSurahs] = useState<boolean>(true);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [visibleTafsirForAyah, setVisibleTafsirForAyah] = useState<number | null>(null);
  const [isLoadingTafsir, setIsLoadingTafsir] = useState<boolean>(false);
  const [currentTafsirText, setCurrentTafsirText] = useState<string | null>(null);
  const [tafsirError, setTafsirError] = useState<string | null>(null);


  useEffect(() => {
    const fetchSurahs = async () => {
      setIsLoadingSurahs(true);
      setError(null);
      try {
        const response = await fetch(`${QURAN_API_BASE_URL}/surah`);
        if (!response.ok) throw new Error(`Gagal memuat daftar surat: ${response.status}`);
        const data = await response.json();
        if (data.code === 200 && Array.isArray(data.data)) {
          setSurahs(data.data);
        } else {
          throw new Error('Format data surat tidak sesuai.');
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui.');
      } finally {
        setIsLoadingSurahs(false);
      }
    };
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (!selectedSurahNumber) return;
    setVisibleTafsirForAyah(null); 
    setCurrentTafsirText(null);
    setTafsirError(null);

    const fetchAyahs = async () => {
      setIsLoadingAyahs(true);
      setError(null);
      setDisplayedAyahs([]);
      try {
        const arabicResponse = await fetch(`${QURAN_API_BASE_URL}/surah/${selectedSurahNumber}/quran-uthmani`);
        if (!arabicResponse.ok) throw new Error(`Gagal memuat teks Arab: ${arabicResponse.status}`);
        const arabicData: {code: number; data: QuranEditionResponse } = await arabicResponse.json();
        if (arabicData.code !== 200 || !arabicData.data.ayahs) throw new Error('Format data teks Arab tidak sesuai.');

        const translationResponse = await fetch(`${QURAN_API_BASE_URL}/surah/${selectedSurahNumber}/id.indonesian`);
        if (!translationResponse.ok) throw new Error(`Gagal memuat terjemahan: ${translationResponse.status}`);
        const translationData: {code: number; data: QuranEditionResponse } = await translationResponse.json();
        if (translationData.code !== 200 || !translationData.data.ayahs) throw new Error('Format data terjemahan tidak sesuai.');
        
        const combined: CombinedAyah[] = arabicData.data.ayahs.map((ayahAr, index) => ({
          id: ayahAr.number, 
          numberInSurah: ayahAr.numberInSurah,
          arabicText: ayahAr.text,
          translation: translationData.data.ayahs[index]?.text || 'Terjemahan tidak tersedia',
        }));
        setDisplayedAyahs(combined);

      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat ayat.');
      } finally {
        setIsLoadingAyahs(false);
      }
    };

    fetchAyahs();
  }, [selectedSurahNumber]);

  const handleToggleTafsir = useCallback(async (ayahGlobalNumber: number) => {
    if (visibleTafsirForAyah === ayahGlobalNumber) {
      setVisibleTafsirForAyah(null);
      setCurrentTafsirText(null);
      setTafsirError(null);
      return;
    }

    setVisibleTafsirForAyah(ayahGlobalNumber);
    setIsLoadingTafsir(true);
    setCurrentTafsirText(null);
    setTafsirError(null);
    try {
      const response = await fetch(`${QURAN_API_BASE_URL}/ayah/${ayahGlobalNumber}/id.kemenag`);
      if (!response.ok) {
         const errorData = await response.json().catch(() => null);
         const statusText = errorData?.data?.message || response.statusText || `Status ${response.status}`;
         throw new Error(`Gagal memuat tafsir: ${statusText}`);
      }
      const tafsirData: TafsirResponse = await response.json();

      if (tafsirData.code === 200 && tafsirData.data && tafsirData.data.text) {
        setCurrentTafsirText(tafsirData.data.text);
      } else if (tafsirData.data && typeof tafsirData.data === 'string') { // Handle cases where API returns message in data for non-200
         throw new Error(tafsirData.data as string);
      }
       else {
        throw new Error('Format data tafsir tidak sesuai atau tafsir tidak ditemukan.');
      }
    } catch (err) {
      console.error(err);
      setTafsirError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui saat memuat tafsir.');
      setCurrentTafsirText(null);
    } finally {
      setIsLoadingTafsir(false);
    }
  }, [visibleTafsirForAyah]);

  const selectedSurahInfo = useMemo(() => {
    return surahs.find(s => s.number === selectedSurahNumber);
  }, [selectedSurahNumber, surahs]);

  if (isLoadingSurahs) {
    return <div className="p-4 text-center bg-white"><LoadingSpinner text="Memuat daftar surat..." color="text-gray-700" /></div>;
  }
  
  if (error && displayedAyahs.length === 0) { 
    return <p className="text-red-600 text-sm p-4 text-center bg-white">Error: {error}</p>;
  }

  return (
    <div className="bg-white text-gray-800 space-y-4 text-sm p-3 rounded-b-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
        <div>
          <label htmlFor="surah-select-quran" className="block text-xs font-medium text-gray-600 mb-1">
            Pilih Surat:
          </label>
          <select
            id="surah-select-quran"
            value={selectedSurahNumber || ''}
            onChange={(e) => setSelectedSurahNumber(Number(e.target.value))}
            disabled={isLoadingAyahs || isLoadingSurahs}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            aria-label="Pilih Surat Al-Qur'an"
          >
            {surahs.map(surah => (
              <option key={surah.number} value={surah.number} className="bg-white text-gray-900">
                {surah.number}. {surah.englishName} ({surah.name})
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-end space-x-2">
            <span className="text-xs font-medium text-gray-700">Mode Baca:</span>
            <button
              onClick={() => setShowTranslation(true)}
              className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${
                showTranslation ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-pressed={showTranslation}
            >
              Arab + Terjemahan
            </button>
            <button
              onClick={() => setShowTranslation(false)}
              className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${
                !showTranslation ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-pressed={!showTranslation}
            >
              Arab Saja
            </button>
        </div>
      </div>


      {isLoadingAyahs && <div className="p-4 text-center"><LoadingSpinner text="Memuat ayat..." color="text-gray-700"/></div>}
      
      {!isLoadingAyahs && error && <p className="text-red-600 text-xs mt-2 text-center">Gagal memuat ayat: {error}</p>}

      {!isLoadingAyahs && selectedSurahInfo && (
        <div className="space-y-3">
          <div className="text-center p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-xl font-semibold text-blue-700">{selectedSurahInfo.englishName}</h4>
            <p className="text-2xl font-arabic text-gray-900 my-1">{selectedSurahInfo.name}</p>
            <p className="text-xs text-gray-500">
              {selectedSurahInfo.englishNameTranslation} - {selectedSurahInfo.numberOfAyahs} ayat - {selectedSurahInfo.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}
            </p>
          </div>
          
          <div className="max-h-[300px] sm:max-h-[350px] overflow-y-auto space-y-4 pr-2 rounded-md scrollbar-thin scrollbar-light">
            {displayedAyahs.map(ayah => (
              <div 
                key={ayah.id} 
                className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                aria-labelledby={`ayah-arabic-${ayah.id}`}
              >
                <p id={`ayah-arabic-${ayah.id}`} className="text-right text-xl sm:text-2xl font-arabic mb-2 text-black" lang="ar" dir="rtl">
                  {renderAyahTextWithTajwidLight(applyBasicTajwidColorsLight(ayah.arabicText))} <span className="text-sm text-blue-600 font-sans">({ayah.numberInSurah})</span>
                </p>
                {showTranslation && (
                    <p className="text-gray-700 text-xs sm:text-sm mb-2">{ayah.translation}</p>
                )}
                
                <button
                  onClick={() => handleToggleTafsir(ayah.id)}
                  className="text-xs px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  aria-expanded={visibleTafsirForAyah === ayah.id}
                  aria-controls={`tafsir-content-${ayah.id}`}
                >
                  {visibleTafsirForAyah === ayah.id && !isLoadingTafsir ? 'Sembunyikan' : 'Lihat'} Tafsir (Kemenag)
                </button>

                {visibleTafsirForAyah === ayah.id && (
                  <div id={`tafsir-content-${ayah.id}`} className="mt-2 p-2.5 border-t border-gray-200 text-xs bg-gray-50 rounded-b-md">
                    {isLoadingTafsir && <LoadingSpinner size="sm" text="Memuat tafsir..." color="text-gray-600" />}
                    {!isLoadingTafsir && tafsirError && <p className="text-red-500 font-medium">Gagal memuat tafsir: {tafsirError}</p>}
                    {!isLoadingTafsir && !tafsirError && currentTafsirText && (
                      <>
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed">{currentTafsirText}</p>
                        <p className="text-gray-500 italic text-right text-[10px] mt-1.5 pt-1 border-t border-gray-200">Sumber: Tafsir Ringkas Kementerian Agama RI.</p>
                      </>
                    )}
                     {!isLoadingTafsir && !tafsirError && !currentTafsirText && <p className="text-gray-500 italic">Tafsir untuk ayat ini tidak tersedia dari sumber (Kemenag Tafsir Ringkas).</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-600 mt-3 p-3 border border-dashed border-gray-300 rounded-md leading-relaxed bg-gray-50 shadow-sm">
            <strong>Penting:</strong> Pewarnaan tajwid yang ditampilkan adalah upaya ilustratif untuk beberapa hukum dasar dan mungkin tidak mencakup semua aturan secara komprehensif atau 100% akurat. Untuk pembelajaran tajwid yang mendalam, sangat dianjurkan untuk merujuk kepada guru Al-Qur'an yang kompeten.
            <br />
            Contoh Ilustrasi (dengan warna tema gelap, hanya untuk referensi nama hukum): <span className="tajwid-ghunnah">Ghunnah</span>, <span className="tajwid-mad-normal">Mad</span>, <span className="tajwid-qalqalah">Qalqalah</span>, <span className="tajwid-ikhfa">Ikhfa</span>. Warna aktual pada ayat di atas disesuaikan untuk latar terang.
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranWidget;
