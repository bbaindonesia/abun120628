
import React, { useState, useMemo } from 'react';
import { GlossaryItem } from '../types';

const GLOSSARY_DATA: GlossaryItem[] = [
  { id: '1', term: 'Ihram', arabicTerm: 'إِحْرَام', definition: 'Niat untuk memulai ibadah haji atau umrah, ditandai dengan mengenakan pakaian ihram dan menghindari larangan-larangan tertentu.' },
  { id: '2', term: 'Miqat', arabicTerm: 'مِيْقَات', definition: 'Batas tempat atau waktu yang ditetapkan untuk memulai niat ihram haji atau umrah.' },
  { id: '3', term: 'Thawaf', arabicTerm: 'طَوَاف', definition: 'Mengelilingi Ka\'bah sebanyak tujuh kali putaran dengan cara tertentu, dimulai dan diakhiri di Hajar Aswad.' },
  { id: '4', term: 'Sa\'i', arabicTerm: 'سَعْي', definition: 'Berjalan atau berlari-lari kecil antara bukit Shafa dan Marwah sebanyak tujuh kali.' },
  { id: '5', term: 'Tahallul', arabicTerm: 'تَحَلُّل', definition: 'Keluarnya seseorang dari keadaan ihram, ditandai dengan mencukur atau memotong sebagian rambut kepala. Ada Tahallul Awwal dan Tahallul Tsani (untuk Haji).' },
  { id: '6', term: 'Hajar Aswad', arabicTerm: 'الحَجَرُ الأَسْوَد', definition: 'Batu hitam yang terletak di salah satu sudut Ka\'bah, menjadi titik awal dan akhir thawaf.' },
  { id: '7', term: 'Maqam Ibrahim', arabicTerm: 'مَقَامُ إِبْرَاهِيْم', definition: 'Tempat berdirinya Nabi Ibrahim AS ketika membangun Ka\'bah. Disunnahkan shalat dua rakaat di belakangnya setelah thawaf.' },
  { id: '8', term: 'Hijr Ismail', arabicTerm: 'حِجْرُ إِسْمَاعِيْل', definition: 'Area berbentuk setengah lingkaran di samping Ka\'bah yang merupakan bagian dari Ka\'bah. Shalat di dalamnya sama seperti shalat di dalam Ka\'bah.' },
  { id: '9', term: 'Rukun Yamani', arabicTerm: 'الرُّكْنُ الْيَمَانِي', definition: 'Salah satu sudut Ka\'bah yang menghadap ke arah Yaman. Disunnahkan untuk mengusapnya saat thawaf jika memungkinkan.' },
  { id: '10', term: 'Talbiyah', arabicTerm: 'تَلْبِيَة', definition: 'Kalimat pujian yang diucapkan oleh jamaah haji/umrah sejak niat ihram hingga melontar Jumrah Aqabah (untuk haji) atau hingga memulai thawaf (untuk umrah). Bacaannya: "Labbaikallahumma labbaik..."' },
  { id: '11', term: 'Dam', arabicTerm: 'دَم', definition: 'Denda yang wajib dibayar karena melanggar larangan ihram atau meninggalkan salah satu wajib haji/umrah. Biasanya berupa menyembelih hewan ternak.' },
  { id: '12', term: 'Arafah', arabicTerm: 'عَرَفَة', definition: 'Dataran luas tempat jamaah haji melakukan wukuf pada tanggal 9 Dzulhijjah, yang merupakan rukun haji terpenting.' },
  { id: '13', term: 'Wukuf', arabicTerm: 'وُقُوْف', definition: 'Berdiam diri di Arafah pada waktu yang telah ditentukan (mulai dari tergelincirnya matahari tanggal 9 Dzulhijjah hingga terbit fajar tanggal 10 Dzulhijjah).' },
  { id: '14', term: 'Muzdalifah', arabicTerm: 'مُزْدَلِفَة', definition: 'Tempat antara Arafah dan Mina, di mana jamaah haji bermalam (mabit) dan mengumpulkan batu kerikil setelah wukuf di Arafah.' },
  { id: '15', term: 'Mabit', arabicTerm: 'مَبِيْت', definition: 'Bermalam atau singgah di Muzdalifah dan Mina pada waktu-waktu yang telah ditentukan dalam rangkaian ibadah haji.' },
  { id: '16', term: 'Mina', arabicTerm: 'مِنَى', definition: 'Tempat di dekat Mekkah di mana jamaah haji melakukan lempar jumrah dan mabit.' },
  { id: '17', term: 'Jumrah', arabicTerm: 'جَمْرَة', definition: 'Tempat melempar batu kerikil di Mina. Ada tiga jumrah: Ula, Wustha, dan Aqabah.' },
  { id: '18', term: 'Nafar Awal', arabicTerm: 'نَفَر أَوَّل', definition: 'Pilihan bagi jamaah haji untuk meninggalkan Mina lebih awal, yaitu pada tanggal 12 Dzulhijjah setelah melempar jumrah.' },
  { id: '19', term: 'Nafar Tsani', arabicTerm: 'نَفَر ثَانِي', definition: 'Pilihan bagi jamaah haji untuk meninggalkan Mina pada tanggal 13 Dzulhijjah setelah melempar jumrah.' },
  { id: '20', term: 'Thawaf Ifadhah', arabicTerm: 'طَوَافُ الإِفَاضَة', definition: 'Thawaf yang merupakan salah satu rukun haji, dilakukan setelah kembali dari Mina.' },
  { id: '21', term: 'Thawaf Wada\'', arabicTerm: 'طَوَافُ الْوَدَاع', definition: 'Thawaf perpisahan yang dilakukan sebelum meninggalkan Mekkah setelah selesai menunaikan ibadah haji.' },
  { id: '22', term: 'Mutawwif', arabicTerm: 'مُطَوِّف', definition: 'Pembimbing ibadah haji atau umrah.' },
  { id: '23', term: 'Badal Haji/Umrah', arabicTerm: 'بَدَل الْحَجِّ / الْعُمْرَة', definition: 'Menghajikan atau mengumrahkan orang lain yang tidak mampu melaksanakannya sendiri karena alasan syar\'i (misalnya sakit parah, lanjut usia, atau telah meninggal dunia).' },
];

const GlossaryWidget: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<GlossaryItem | null>(null);

  const filteredGlossary = useMemo(() => {
    if (!searchTerm.trim()) {
      return GLOSSARY_DATA.sort((a, b) => a.term.localeCompare(b.term));
    }
    return GLOSSARY_DATA.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.arabicTerm && item.arabicTerm.includes(searchTerm)) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm]);

  const handleSelectTerm = (item: GlossaryItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="p-2 space-y-3 text-sm">
      <input
        type="text"
        placeholder="Cari istilah (contoh: Ihram, Thawaf)..."
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); setSelectedItem(null); }}
        className="form-input w-full text-sm mb-2"
        aria-label="Cari Istilah Umrah dan Haji"
      />

      {selectedItem && (
        <div className="p-3 bg-theme-widget-bg rounded-lg border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-intense animate-fade-in mb-3">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-xs text-theme-accent hover:text-theme-accent-hover hover:underline mb-2 flex items-center space-x-1 filter drop-shadow-glow-accent-icon"
            aria-label="Kembali ke daftar istilah"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>Kembali ke Daftar</span>
          </button>
          <h4 className="text-md font-semibold text-theme-accent mb-1 text-glow-accent-strong">{selectedItem.term}</h4>
          {selectedItem.arabicTerm && (
            <p className="font-arabic text-lg text-right text-theme-text mb-1" dir="rtl" lang="ar">{selectedItem.arabicTerm}</p>
          )}
          <p className="text-xs text-theme-text-muted leading-relaxed">{selectedItem.definition}</p>
        </div>
      )}

      {!selectedItem && (
        <div className="max-h-[300px] sm:max-h-[350px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-widget scrollbar-track-widget">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelectTerm(item)}
                className="w-full text-left p-2.5 rounded-md bg-theme-widget-bg hover:bg-theme-interactive transition-colors duration-150 border border-[var(--color-theme-widget-border-hologram)] hover:border-theme-accent focus:outline-none focus:ring-1 focus:ring-theme-accent shadow-hologram-soft hover:shadow-hologram-intense"
                aria-label={`Lihat detail ${item.term}`}
              >
                <span className="text-xs text-theme-text font-medium">{item.term}</span>
                {item.arabicTerm && <span className="text-xs text-theme-text-muted ml-1 font-arabic" dir="rtl" lang="ar">({item.arabicTerm})</span>}
              </button>
            ))
          ) : (
            <p className="text-theme-text-muted text-center p-3">
              Istilah "{searchTerm}" tidak ditemukan.
            </p>
          )}
        </div>
      )}
       <p className="text-xs text-theme-text-muted opacity-80 mt-3 pt-2 border-t border-dashed border-[var(--color-theme-widget-border-hologram)]/50">
          Kamus ini berisi istilah-istilah umum dalam ibadah Umrah dan Haji. Untuk pemahaman yang lebih mendalam, diskusikan dengan pembimbing manasik Anda.
        </p>
    </div>
  );
};

export default GlossaryWidget;
