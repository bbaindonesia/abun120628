
import React, { useState, useEffect, useCallback } from 'react';
import { DoaListItem, DoaDetail } from '../types';
import { DOA_LIST_API_URL } from '../constants';
import LoadingSpinner from './LoadingSpinner';

const DoaDzikirWidget: React.FC = () => {
  const [doaList, setDoaList] = useState<DoaListItem[]>([]);
  const [selectedDoa, setSelectedDoa] = useState<DoaDetail | null>(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoaList = useCallback(async () => {
    setIsLoadingList(true);
    setError(null);
    setSelectedDoa(null);
    try {
      const response = await fetch(DOA_LIST_API_URL); // Uses the updated constant
      if (!response.ok) {
        throw new Error(`Gagal memuat daftar doa: Status ${response.status}`);
      }
      const data: any[] = await response.json(); 
      
      // Validate and map the data according to DoaListItem structure
      const validList: DoaListItem[] = data
        .filter((item: any) => 
          item && 
          typeof item.id === 'number' &&
          typeof item.judul === 'string' &&
          typeof item.latin === 'string' &&
          typeof item.arab === 'string' &&
          typeof item.terjemah === 'string'
        )
        .map((item: any) => ({
          id: item.id,
          judul: item.judul,
          latin: item.latin,
          arab: item.arab,
          terjemah: item.terjemah,
        }));

      setDoaList(validList);

      if (data.length > 0 && validList.length === 0) {
        console.warn('Format data daftar doa dari API tidak sepenuhnya sesuai atau beberapa item mungkin tidak valid, namun API mengembalikan data.');
        // Potentially set an error here if no valid items are found despite API returning data
        // setError('Format data doa dari server tidak sesuai.'); 
      }
      if (validList.length === 0 && data.length === 0){
        // setError('Tidak ada data doa yang ditemukan dari server.'); // Optional: if empty list is an error
      }


    } catch (err) {
      console.error("Error fetching Doa list:", err);
      if (err instanceof Error) {
        if (err.message.toLowerCase().includes('failed to fetch')) {
          setError('Gagal terhubung ke server doa. Periksa koneksi internet Anda atau coba lagi nanti. Server penyedia data doa mungkin sedang mengalami gangguan.');
        } else {
          // For other errors (like HTTP status errors thrown above, or JSON parse errors), display their message.
          setError(`${err.message}`);
        }
      } else {
        setError('Terjadi kesalahan tidak diketahui saat memuat daftar doa.');
      }
      setDoaList([]); // Clear list on error
    } finally {
      setIsLoadingList(false);
    }
  }, []); // DOA_LIST_API_URL is a constant from '../constants', no need for it in dep array


  useEffect(() => {
    fetchDoaList();
  }, [fetchDoaList]);

  const handleDoaSelect = (doaItem: DoaListItem) => {
    // Since the list API provides all details, we can directly use the item.
    setSelectedDoa(doaItem);
    setError(null); // Clear previous errors when a selection is made
  };

  if (isLoadingList) {
    return <div className="p-4 text-center"><LoadingSpinner text="Memuat daftar doa..." /></div>;
  }

  // Show error and retry button only if the list is empty due to an error
  if (error && doaList.length === 0) {
    return (
      <div className="p-4 text-center text-red-400 text-sm">
        <p>Error: {error}</p>
        <button 
            onClick={fetchDoaList}
            className="mt-2 px-3 py-1 text-xs bg-theme-interactive text-theme-text rounded hover:bg-theme-accent hover:text-white"
        >
            Coba Lagi
        </button>
      </div>
    );
  }


  return (
    <div className="space-y-4 text-sm p-1">
      {selectedDoa && (
        <div className="p-3 bg-theme-widget-bg rounded-lg border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-intense animate-fade-in">
          <button 
            onClick={() => { setSelectedDoa(null); setError(null); }} // Clear error when going back
            className="text-xs text-theme-accent hover:text-theme-accent-hover hover:underline mb-3 flex items-center space-x-1 filter drop-shadow-glow-accent-icon"
            aria-label="Kembali ke daftar doa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>Kembali ke Daftar Doa</span>
          </button>
          <h4 className="text-md font-semibold text-theme-accent mb-1 text-glow-accent-strong">{selectedDoa.judul}</h4>
          {selectedDoa.arab && (
            <p className="text-right text-lg font-arabic leading-relaxed my-2 p-2 bg-theme-interactive/30 rounded text-theme-text" lang="ar" dir="rtl">
              {selectedDoa.arab}
            </p>
          )}
          {selectedDoa.latin && <p className="text-xs text-theme-text-muted italic mb-1">{selectedDoa.latin}</p>}
          {selectedDoa.terjemah && <p className="text-xs text-theme-text"><strong>Artinya:</strong> {selectedDoa.terjemah}</p>}
            {/* Display error related to detail fetching if any, though not currently fetching details separately */}
            {error && <p className="text-red-400 text-xs mt-2">Error: {error}</p>}
        </div>
      )}

      {!selectedDoa && (
        <>
          {doaList.length > 0 ? (
            <div className="max-h-[300px] sm:max-h-[350px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-widget scrollbar-track-widget">
              {doaList.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleDoaSelect(item)}
                  className="w-full text-left p-2.5 rounded-md bg-theme-widget-bg hover:bg-theme-interactive transition-colors duration-150 border border-[var(--color-theme-widget-border-hologram)] hover:border-theme-accent focus:outline-none focus:ring-1 focus:ring-theme-accent shadow-hologram-soft hover:shadow-hologram-intense"
                  aria-label={`Lihat detail ${item.judul}`}
                >
                  <span className="text-xs text-theme-text">{item.judul}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-theme-text-muted text-center p-3">
              {/* This message will show if list is empty AND no error occurred or if an error occurred but list is also empty */}
              {error && doaList.length === 0 ? `Error: ${error}` : "Tidak ada doa yang tersedia saat ini."}
              <button 
                onClick={fetchDoaList}
                className="block mx-auto mt-2 px-3 py-1 text-xs bg-theme-interactive text-theme-text rounded hover:bg-theme-accent hover:text-white"
               >
                Muat Ulang Daftar
              </button>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default DoaDzikirWidget;
