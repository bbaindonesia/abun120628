
import React from 'react';
import InfoCard, { InfoIcon, PrayerMatIcon } from './InfoCard'; 

// Helper component for Arabic prayer blocks
const ArabicPrayerBlock: React.FC<{ arabic: string; latin?: string; translation: string; title?: string }> = ({ arabic, latin, translation, title }) => (
  <div className="my-4 p-3 bg-theme-interactive/40 rounded-md border border-[var(--color-theme-widget-border-hologram)]/70 shadow-hologram-soft"> 
    {title && <h5 className="text-sm font-semibold text-theme-accent mb-1 text-glow-accent">{title}</h5>}
    <p className="font-arabic text-lg sm:text-xl text-right leading-relaxed my-2 text-theme-text" dir="rtl" lang="ar">
      {arabic}
    </p>
    {latin && <p className="text-xs text-theme-text-muted italic mt-1">{latin}</p>}
    <p className="text-xs text-theme-text mt-1">
      <strong>Artinya:</strong> {translation}
    </p>
  </div>
);

// Icon for Book/Guide
const GuideIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6 text-theme-accent" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const ManasikPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-2 sm:p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-theme-accent text-center mb-8 page-title-glow">
        Panduan Lengkap Manasik Umrah BBA Indonesia
      </h2>

      <InfoCard title="Kata Pengantar" icon={<GuideIcon />} titleColorClass="text-theme-accent">
        <p className="mb-2">BBA Indonesia adalah salah satu perusahaan penyelenggara Ibadah Umrah yang telah terdaftar resmi di Kementrian Agama Republik Indonesia dengan Nama perusahaan PT. Bani Bunyamin Attarbiyyah sesuai dengan Surat Keputusan Menteri Agama Republik Indonesia Nomor : U.348 Tahun 2020 Tentang Izin Operasional PT. Bani Bunyamin Attarbiyyah sebagai Penyelenggara Perjalanan Ibadah Umrah.</p>
        <p className="mb-2">BBA Indonesia sendiri berdiri pada tahun 2016 sebagai Biro Perjalanan Wisata. Seiring berkembangnya waktu kami terus berupaya meningkatkan mutu dan kualitas pelayanan kami untuk mengantarkan para tamu Allah dan Rosulullah sehingga pada tahun 2020 kami mendapatkan Izin Resmi sebagai Perusahaan Penyelenggara Ibadah Umrah (PPIU).</p>
        <p className="mb-2">Dan Alhamdulillah pada tanggal, 23 Oktober 2023 BBA Indonesia telah mendapatkan sertifikat Akreditasi sebagai Penyelenggara Perjalanan Ibadah Umroh dengan Nilai (B) dengan nomor sertifikat : LSUHK-011-IDN.</p>
        <p>Dengan Prinsip “Yassiruu Wala Tu’assiruu” (Mudahkan urusan orang, jangan dipersulit), yang bersinergi dengan Motto : SAHABAT MENUJU BAITULLAH, dengan niat semata-mata mencari keridhoan Allah serta dengan harapan mendapatkan pahala Ibadah dengan jalan melayani perjalanan Ibadah saudara Muslim, BBA Indonesia berusaha sebaikbaiknya untuk melayani perjalanan Umroh dan Haji Plus sesuai amanat yang dipercayakan dan diembankan.</p>
      </InfoCard>

      <InfoCard title="Sambutan Direktur (Miftah Baedarus, CEO BBA Indonesia)" icon={<GuideIcon />} titleColorClass="text-theme-accent">
        <p className="mb-2">Puji syukur kami panjatkan ke hadirat Allah SWT, yang telah memberikan rahmat-Nya kepada kita semua sehingga dimungkinkan untuk hadir dalam kesempatan ini.</p>
        <p className="mb-2">Salam sejahtera dan salam umroh, kepada seluruh jamaah yang terhormat, pengelola dan karyawan BBA Indonesia, serta semua pihak yang turut berperan dalam penyusunan Buku Panduan Umroh ini.</p>
        <p className="mb-2">Hidup adalah perjalanan yang penuh dengan tantangan dan hikmah. Di tengah kehidupan yang kompleks ini, terdapat kebijaksanaan yang perlu kita pelajari dan hayati. Ketika kita dapat memandang dunia dengan bijak, setiap pengalaman akan menjadi guru yang berharga bagi kita.</p>
        <p className="mb-2">Sebagai direktur utama BBA Indonesia, kami sangat berterima kasih kepada tim yang telah bekerja keras dalam menyusun buku ini. Semangat dan dedikasi yang telah tertanam dalam setiap halaman buku ini, akan sejalan dengan visi dan misi BBA Indonesia untuk memberikan pengalaman umroh yang tak terlupakan dan terbaik bagi jamaah kami.</p>
        <p>Akhir kata, bijaklah dalam setiap langkah. Jadilah orang yang melangkah dengan hati yang bersyukur, pikiran yang bijaksana, dan tindakan yang berkelanjutan. Semoga setiap langkah kita dalam hidup ini membawa manfaat, kedamaian, dan cahaya bagi diri kita sendiri dan dunia di sekitar kita. Terima kasih dan semoga Allah senantiasa memberikan hidayah dan kebijaksanaan kepada kita semua. Wassalamualaikum warahmatullahi wabarakatuh.</p>
        <p className="mt-2 text-right font-semibold text-theme-text-muted">Karawang, 04 Desember 2023</p>
        <p className="text-right font-bold text-theme-text">MIFTAH BAEDARUS</p>
        <p className="text-right text-sm text-theme-text-muted">Ceo BBA Indonesia</p>
      </InfoCard>
      
      <InfoCard title="Sekilas Profil & Legalitas BBA Indonesia" icon={<InfoIcon />} titleColorClass="text-theme-accent">
        <p className="text-xs text-theme-text-muted mb-2">Informasi lebih detail mengenai profil perusahaan, legalitas, dan layanan BBA Indonesia dapat ditemukan pada halaman 'Tentang BBA' di aplikasi ini.</p>
        <h4 className="text-md font-semibold text-theme-text mt-3 mb-1 text-glow-accent">Profil Singkat</h4>
        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
            <li>Nama Perusahaan: PT. BANI BUNYAMIN ATTARBIYYAH</li>
            <li>Nama Dagang: BBA INDONESIA</li>
            <li>Tahun Berdiri: 2018</li>
            <li>SK. PPIU Nomor: U.438 Tahun 2020</li>
            <li>Akreditasi: B (LSUHK-011-IDN)</li>
            <li>Alamat: Jl. Komplek Pondok Pesantren Attarbiyyah, Ds. Ciwulan, Kec. Telagasari, Kab. Karawang Provinsi Jawa Barat</li>
            <li>Website: www.bbaindonesia.co.id</li>
            <li>Phone: 0821 1000 3461</li>
        </ul>
         <h4 className="text-md font-semibold text-theme-text mt-3 mb-1 text-glow-accent">Dasar Legalitas</h4>
        <p className="text-sm">BBA Indonesia beroperasi berdasarkan Keputusan Menteri Agama RI Nomor U.438 Tahun 2020 dan telah memenuhi semua persyaratan sebagai Penyelenggara Perjalanan Ibadah Umrah (PPIU) resmi.</p>
      </InfoCard>

      <InfoCard title="Tips Memilih Travel Umroh" icon={<InfoIcon />} titleColorClass="text-theme-accent">
        <p className="mb-2">Selain 5 Pasti Umrah yang dihimbau oleh Ditjen Penyelenggara Haji dan Umroh Kemenag RI:</p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
          <li><strong>PASTIKAN Travel Umrah Berizin Kemenag.</strong> Travel harus memiliki izin umrah agar terjamin perlindungan, pelayanan, dan bimbingan selama di Tanah Suci.</li>
          <li><strong>PASTIKAN Tiket Pesawat dan Jadwal Penerbangan.</strong> Maskapai penerbangannya harus jelas, jadwal berangkatnya pasti, tiketnya harus pulang-pergi, dan hanya satu kali transit dengan maskapai penerbangan yang sama.</li>
          <li><strong>PASTIKAN Harga dan Paket Layanannya.</strong> Jangan tergiur harga murah, cek rincian harga paket yang ditawarkan. Paket layanan terdiri dari konsumsi, transportasi, manasik, petugas yang mendampingi, dan asuransi perjalanan.</li>
          <li><strong>PASTIKAN Akomodasi (Hotel)</strong> selama berada di Arab Saudi. Hotel tempat menginap minimal hotel bintang 3 dan jarak dari tempat ibadah maksimal 1 km.</li>
          <li><strong>PASTIKAN Visanya.</strong> Visa harus selesai minimal 3 hari sebelum keberangkatan.</li>
        </ol>
        <p className="mt-3 mb-1 font-semibold text-theme-text">Selain Tips di Atas ada tips lain yaitu:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Cek kantor travelnya</li>
          <li>Melihat Testimoni Jemaah yang sudah berangkat</li>
          <li>Menyediakan Bimbingan/Manasik</li>
          <li>Hindari Travel Umroh Berbasis MLM</li>
          <li>Menyediakan Handling dan Mutowif di KSA</li>
        </ul>
        <p className="mt-2">Biiznillah, BBA Indonesia bisa memenuhi semua kriteria sebagai Perusahaan Penyelenggara Ibadah Umroh yang Resmi Terdaftar di Kementerian Agama RI, dengan nomor U.438 Tahun 2020 dan telah mendapatkan sertifikat Akreditasi dengan Nilai Sangat Baik sebagai Penyelenggara Perjalanan Ibadah Umroh.</p>
      </InfoCard>

      <InfoCard title="BAB I: PERSIAPAN & KIAT" icon={<PrayerMatIcon className="text-theme-accent"/>} titleColorClass="text-theme-accent">
        <h4 className="text-md font-semibold text-theme-text mt-1 mb-2 text-glow-accent">1. MENTAL DAN FISIK</h4>
        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
          <li>Bertaubat kepada Allah, memperbanyak zikir dan memohon bimbingan dari Allah SWT.</li>
          <li>Menyelesaikan masalah-masalah yang berkenaan dengan tanggung jawab, seperti : tanggung jawab kepada keluarga, pekerjaan dan utang piutang.</li>
          <li>Silaturahmi dengan sanak saudara, sahabat, dan masyarakat dengan memohon maaf dan do'a restu.</li>
          <li>Membiasakan pola hidup sehat.</li>
          <li>Mempelajari manasik atau tata cara ibadah haji/umroh.</li>
          <li>Membawa perlengkapan untuk ibadah dan istirahat selama di Tanah Suci, gunakanlah pakaian yang sopan (pakaian perempuan tidak boleh yang tipis/transparan).</li>
        </ul>

        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">2. PERBEKALAN</h4>
        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
          <li>Mempersiapkan bekal secukupnya selama dalam perjalanan dan bekal untuk keluarga yang ditinggalkan.</li>
          <li>Diperbolehkan melaksanakan walimatussafar (Halal Bil Halal) bagi yang mampu, dengan niat mensyukuri nikmat dan menghindari sifat Riya.</li>
          <li>Tidak diperbolehkan membawa benda atau alat yang membahayakan.</li>
        </ul>
        
        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">3. Kiat Meraih Ibadah yang Mabrur</h4>
        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
          <li>Niat yang tulus karena Allah bukan karena ingin ada panggilan gelar.</li>
          <li>Biaya yang digunakan berasal dari usaha/harta yang halal dan telah dikeluarkan zakatnya.</li>
          <li>Selama dalam perjalanan dan ibadah haji/umroh tidak melakukan rafas (ucapan/perbuatan yang bersifat pornografi), fasiq (Perbuatan maksiat), dan jidal (Berbantah-bantahan dan pertengkaran).</li>
          <li>Setelah kembali dari Tanah Suci berupaya semaksimal mungkin meningkatkan kualitas ibadah dan kepedulian social yang ditandai dengan: Perilaku dan tutur katanya lebih baik, Menebarkan kedamaian dan kesejahteraan, Senang memberi dan membantu untuk kepentingan umat.</li>
        </ul>
      </InfoCard>
      
      <InfoCard title="BAB II: SAFAR (PERJALANAN)" icon={<PrayerMatIcon className="text-theme-accent"/>} titleColorClass="text-theme-accent">
        <h4 className="text-md font-semibold text-theme-text mt-1 mb-2 text-glow-accent">1. Shalat Safar</h4>
        <p className="text-sm mb-2">Sebelum melakukan perjalanan baik haji atau umroh maka diharuskan setiap jemaah melaksanakan shalat sunat safar 2 rakaat terlebih dahulu, disarankan melaksanakan shalat safar di pertengahan rumah.</p>
        <p className="text-sm font-semibold mb-1 text-theme-text">Syarat dan Rukun Salat Safar:</p>
        <ol className="list-decimal list-inside ml-4 text-sm space-y-1">
            <li>Berwudhu (Mempunyai Wudhu)</li>
            <li>Menutup Aurat</li>
            <li>Shalat Sunat Safar (Rukun: Niat, Takbiratul Ihram, Berdiri, Membaca Al-Fatihah, Ruku (sunnah membaca tasbih), I'tidal/Bangun dari Ruku, Sujud, Duduk antara 2 sujud, Duduk Tasyahud Akhir, Membaca Tasyahud Akhir, Membaca Sholawat Nabi, Salam, Tertib).</li>
        </ol>
        <ArabicPrayerBlock
            title="Bacaan Niat Solat Sunat Safar"
            arabic="أصَلِّي سَنَّةَ السَّفَرِ رَكْعَتَيْنِ اللَّهِ تَعَالَى"
            latin="Ushalli sunnatas safari rak'ataini Lillahi Ta'ala"
            translation="Aku berniat shalat sunat safar dua rakaat karena Allah yang Maha Tinggi."
        />
        <p className="text-sm font-semibold mb-1 text-theme-text">Tata Cara Solat Safar:</p>
        <ol className="list-decimal list-inside ml-4 text-sm space-y-1">
            <li>Jumlah rakaat sholat sunnah Safar sebanyak dua rakaat.</li>
            <li>Pada rakaat pertama setelah membaca Surat Al Fatihah dilanjutkan dengan Surat Al Kafirun dan di rakaat kedua membaca Surat Al Ikhlas.</li>
            <li>Seusai mengerjakan sholat sunnah Safar dianjurkan memperbanyak baca ayat kursi dan Surat Quraisy.</li>
            <li>Gerakan dan bacaan dalam sholat sunnah Safar sama seperti shalat sunnah pada umumnya, yaitu rukuk, itidal, sujud dan tasyahud.</li>
        </ol>
         <ArabicPrayerBlock
            title="Do'a Setelah Shalat Sunat Safar"
            arabic="اَللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا بِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى اللَّهُمَّ هُوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطُوْ عَنَّا بُعْدَهُ اللَّهُمَّ أَنْتَ الصَاحِبُ فِي السَّفَرِ وَالْخَلِفَةً فِي الْأَهْلِ اللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَابَةِ الْمَنْظَرِ وَسُوْءِ الْمُنْقَلَبِ فِي الْمَالِ وَالأَهْلِ"
            latin="Allahumma inna nas-aluka fi safarina hadza al-birra wat-taqwa wa minal 'amali ma tardha. Allahumma hawwin 'alaina safarana hadza wathwi 'anna bu'dahu. Allahumma antas shohibu fis safari wal kholifatu fil ahli. Allahumma inni a'udzubika min wa'tsaais safari wa kaabatil mandzori wa suu-il munqolabi fil maali wal ahli."
            translation="Ya Allah, sesungguhnya kami memohon kepada-Mu kebaikan dan amal yang Engkau ridhai dalam perjalanan kami. Ya Allah, mudahkanlah perjalanan kami ini, dekatkanlah bagi kami jarak yang jauh. Ya Allah, Engkau adalah rekan dalam perjalanan dan pengganti di tengah keluarga. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kesukaran perjalanan, tempat kembali yang menyedihkan, dan pemandangan yang buruk pada harta dan keluarga."
        />

        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">2. Do'a Keluar Rumah</h4>
        <p className="text-sm mb-2">Setelah melaksanakan shalat sunat safar dan membaca do'a setelah sunat safar maka berdo'alah kembali sebelum keluar rumah:</p>
        <ArabicPrayerBlock
            arabic="بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ"
            latin="Bismillahi, tawakkaltu 'alallah, laa haula wa laa quwwata illaa billaah"
            translation="Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan kekuatan kecuali dengan Allah."
        />
        
        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">3. Do'a Ketika Naik Kendaraan</h4>
         <ArabicPrayerBlock
            arabic="بِسْمِ اللَّهِ مَجْرَنها وَمُرْسَهَا إِنَّ رَبِي لَغَفُورٌ رَحِيمٌ ، وَمَا قَدَرُوْا اللهَ حَقَّ قَدْرِهِ وَالْأَرْضُ جَمِيعاً قَبْضَتُهُ يَوْمَ القِيامَةِ وَالسَّمَوَاتُ مَطْوِيَّاتٌ بِيَمِيْنِهِ سُبْحَانَهُ وَتَعَالَى عَمَّا يُشْرِكُوْنَ"
            latin="Bismillahi majreha wamursaha inna robbi laghofururrohim wama qodarullaha haqqo qodrihi walardlu jami’an qobdlotahu yaumal qiyamah wassamawatu mathowiyyatu biyaminihi subhanahu wataʼala ‘amma yusyrikun."
            translation="Dengan nama Allah di waktu berangkat dan berlabuh, sesungguhnya Tuhanku benar-benar Maha Pengampun dan Maha Penyayang. Dan mereka tidak mengagungkan Allah dengan pengagungan yang semestinya, padahal bumi seluruhnya dalam genggaman-Nya pada hari kiamat, dan langit digulung dengan kekuasaan-Nya. Maha Suci Allah dan Maha Tinggi Dia dari apa yang mereka persekutukan."
        />

        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">4. Do'a Ketika Kendaraan Mulai Bergerak</h4>
        <ArabicPrayerBlock
            arabic="سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى اللَّهُمَّ هَوَنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْرِ عَنَّا بُعْدَهُ اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَابَةِ الْمَنْظَرِ وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ"
            latin="Subhanalladzi sakh-khoro lanaa hadza wa maa kunna lahu muqrinin. Wa inna ila robbina lamun-qolibuun. Allahumma innaa nas'aluka fii safarinaa hadza al birro wat taqwa wa minal 'amali ma tardho. Allahumma hawwin 'alainaa safaronaa hadza, wathwi ‘anna bu’dahu. Allahumma antash shoohibu fis safar, wal kholiifatu fil ahli. Allahumma inni a'udzubika min wa'tsaa-is safari wa ka-aabatil manzhori wa suu-il munqolabi fil maali wal ahli."
            translation="Maha Suci Allah yang telah menundukkan untuk kami kendaraan ini, padahal kami sebelumnya tidak mempunyai kemampuan untuk melakukannya. Dan sesungguhnya hanya kepada Rabb kami, kami akan kembali. Ya Allah, sesungguhnya kami memohon kepada-Mu kebaikan, takwa dan amal yang Engkau ridhai dalam perjalanan kami ini. Ya Allah mudahkanlah perjalanan kami ini, dekatkanlah bagi kami jarak yang jauh. Ya Allah, Engkau adalah rekan dalam perjalanan dan pengganti di tengah keluarga. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kesukaran perjalanan, tempat kembali yang menyedihkan, dan pemandangan yang buruk pada harta dan keluarga."
        />
        
        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">5. Do'a Ketika Sampai Ditujuan</h4>
         <ArabicPrayerBlock
            arabic="أَللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ أَهْلِهَا وَخَيْرَ مَافِيْهَا وَأَعُوْذُ بِكَ مِنْ شَرِّها وَشَرِّ أَهْلِهَا وَشَرِّ مَافِيْهَا"
            latin="Allahumma inni as-aluka khoiroha wa khoiro ahliha wa khoiro maa fiihaa wa 'audzubika min Syarrihaa wasyarri ahlihaa wa syarri maa fiihaa"
            translation="Ya Allah, saya mohon pada-Mu kebaikan negeri ini dan kebaikan penduduknya serta kebaikan yang ada di dalamnya. Dan saya berlindung pada-Mu dari kejahatan negeri ini dan kejahatan penduduknya serta kejahatan yang ada di dalamnya."
        />
      </InfoCard>

      <InfoCard title="BAB III: UMRAH - PENGERTIAN, WAJIB, & LARANGAN" icon={<PrayerMatIcon className="text-theme-accent"/>} titleColorClass="text-theme-accent">
        <h4 className="text-md font-semibold text-theme-text mt-1 mb-2 text-glow-accent">1. Pengertian Umrah</h4>
        <p className="text-sm">Adalah mengunjungi ka'bah (baitullah) untuk melaksanakan serangkaian kegiatan ibadah (thawaf, sa'i, tahallul) dengan syarat dan ketentuan yang telah ditetapkan dalam al-qur'an maupun sunnah Rasulillah SAW.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
            <div className="p-3 border border-[var(--color-theme-widget-border-hologram)]/70 rounded-md bg-theme-interactive/30 shadow-hologram-soft">
                <p className="font-semibold text-theme-text mb-1">Syarat Umrah:</p>
                <ul className="list-disc list-inside ml-2">
                    <li>Beragama Islam</li>
                    <li>Baligh</li>
                    <li>Berakal Sehat</li>
                    <li>Merdeka</li>
                    <li>Mampu</li>
                </ul>
            </div>
            <div className="p-3 border border-[var(--color-theme-widget-border-hologram)]/70 rounded-md bg-theme-interactive/30 shadow-hologram-soft">
                <p className="font-semibold text-theme-text mb-1">Rukun Umrah:</p>
                <ul className="list-disc list-inside ml-2">
                    <li>Niat Ihram dari Miqat</li>
                    <li>Thawaf</li>
                    <li>Sa'i</li>
                    <li>Tahalul (Ditandai menggunting sebahagian rambut)</li>
                    <li>Tertib</li>
                </ul>
            </div>
        </div>

        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">2. Wajib Umrah</h4>
        <ol className="list-decimal list-inside ml-4 space-y-1 text-sm">
            <li>Niat dari miqat</li>
            <li>Meninggalkan larangan selama ihram</li>
        </ol>

        <h4 className="text-md font-semibold text-theme-text mt-4 mb-2 text-glow-accent">3. Larangan Selama Ihram</h4>
        <ol className="list-decimal list-inside ml-4 space-y-1 text-sm">
            <li>Tidak boleh mencabut dan memotong rambut, menggaruk sampai kulit terkelupas, memotong kuku.</li>
            <li>Tidak boleh memakai wangi-wangian / parfum.</li>
            <li>Tidak boleh bertengkar.</li>
            <li>Tidak boleh melakukan hubungan suami istri.</li>
            <li>Tidak boleh bermesraan.</li>
            <li>Tidak boleh berkata kotor, perkataan yang tidak baik, bicara porno, jorok.</li>
            <li>Tidak boleh menikah atau menikahkan.</li>
            <li>Tidak boleh berburu binatang atau membantu berburu.</li>
            <li>Tidak boleh membunuh binatang, kecuali yang mengancam jiwa.</li>
            <li>Tidak boleh memotong atau mencabut tumbuhan dan segala hal yang mengganggu kehidupan makhluk di dunia ini.</li>
            <li>Tidak boleh berhias atau berdandan.</li>
            <li>Pria tidak boleh memakai penutup kepala, pakaian yang berjahit, memakai alas kaki yang menutup mata kaki.</li>
            <li>Wanita tidak boleh menutup wajah dan memakai sarung tangan yang dapat menutup telapak tangan.</li>
        </ol>
      </InfoCard>

       <InfoCard title="BAB III: UMRAH - PELAKSANAAN UMRAH" icon={<PrayerMatIcon className="text-theme-accent"/>} titleColorClass="text-theme-accent">
        <h4 className="text-md font-semibold text-theme-text mt-1 mb-2 text-glow-accent">4. Pelaksanaan Umroh</h4>
        <ol className="list-decimal list-inside ml-4 space-y-2 text-sm">
            <li>
                <span className="font-semibold text-theme-text">Niat Ihrom dari Miqot</span>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>
                        Di tempat miqot:
                        <ol className="list-lower-alpha list-inside ml-4">
                            <li>Mengambil Wudhu</li>
                            <li>Memakai pakaian Ihrom sesuai ketentuan</li>
                            <li>Melakukan shalat sunat Ihram 2 Rakaat</li>
                        </ol>
                    </li>
                </ul>
            </li>
            <li>
                <ArabicPrayerBlock
                    title="Niat Shalat Sunat Ihram"
                    arabic="أصَلِى سُنَّةُ الْإِحْرَامِ رَكْعَتَيْنِ اللَّهِ تَعَالَى"
                    latin="Usholli sunnatal Ihromi Rok'ataini Lillahi Ta'ala"
                    translation="Aku niat shalat sunat Ihram dua rakaat karena Allah Ta'ala."
                />
            </li>
            <li>
                <span className="font-semibold text-theme-text">Melafalkan Niat Umrah (Dalam Hati)</span>
                <ArabicPrayerBlock
                    arabic="لَبَّيْكَ اللَّهُمَّ عُمْرَةً"
                    latin="Labaikallahumma ‘Umrotan"
                    translation="Aku datang memenuhi panggilanMu ya Allah untuk Umrah."
                 />
                 <p className="text-sm text-center my-1 text-theme-text-muted">Atau</p>
                <ArabicPrayerBlock
                    arabic="نَوَيْتُ الْعُمْرَةَ وَأَحْرَمْتُ بِهَا لِلَّهِ تَعَالَى"
                    latin="Nawaitul 'Umrota Wa Ahromtu Bihaa Lillahi Ta'ala"
                    translation="Aku niat Umrah dan berihram karena Allah Ta'ala."
                 />
            </li>
            <li>
                 <span className="font-semibold text-theme-text">Memperbanyak membaca talbiyah dan dzikir</span>
                 <ArabicPrayerBlock
                    arabic="لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيْكَ لَكَ"
                    latin="Labbaikallahumma labbaik, labbaika laa syariika laka labbaik. Innal hamda wan ni'mata laka wal mulka laa syariikalak."
                    translation="Aku datang memenuhi panggilan-Mu ya Allah, Aku datang memenuhi panggilan-Mu, Aku datang memenuhi panggilan-Mu, tiada sekutu bagi-Mu, Aku datang memenuhi panggilan-Mu, sesungguhnya segala puji, nikmat dan segenap kekuasaan milik-Mu, tiada sekutu bagi-Mu."
                />
            </li>
        </ol>
      </InfoCard>

      <InfoCard title="BAB III: UMRAH - THAWAF" icon={<PrayerMatIcon className="text-theme-accent"/>} titleColorClass="text-theme-accent">
        <h4 className="text-md font-semibold text-theme-text mt-1 mb-2 text-glow-accent">6. Thawaf</h4>
        <ArabicPrayerBlock
            title="a. Do'a Ketika Memasuki Masjidil Haram"
            arabic="اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ فَحَيْنَا رَبَّنَا بِالسَّلَامِ وَأَدْخِلْنَا الْجَنَّةَ دَارَ السَّلَامَ تَبَارَكْتَ وَتَعَالَيْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ. اَللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ وَمَغْفِرَتِكَ وَأَدْخِلْنِي فِيْهَا. بِسْمِ اللَّهِ وَالْحَمْدُ لِلَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُوْلِ اللَّهِ"
            latin="Allahumma antas-salam wa minkas-salam wa ilaika ya'udus-slaamu fahayyinaa rabbana bis-salami wa adkhilnaal-jannata daaras-salaami tabarakta rabbanaa wa ta'alaita ya dzal-jalaali wal-ikraam. Allahummaftah lii abwaaba rahmatika. Bismillahi wal hamdu lillahi was-shalatu was-salaamu 'alaa rosulillah."
            translation="Ya Allah, Engkaulah sumber keselamatan, dari-Mu-lah datangnya keselamatan, dan kepada-Mu kembalinya semua keselamatan. Maka bangkitkanlah kami, wahai Tuhan, dengan selamat sejahtera, dan masukkanlah ke dalam surga, negeri keselamatan serta kebahagiaan. Maha banyak anugerah-Mu dan Maha Tinggi Engkau, wahai Tuhan yang memiliki keagungan dan kehormatan. Ya Allah, bukakanlah untukku pintu rahmat-Mu. Aku masuk masjid ini dengan nama Allah disertai dengan segala puji bagi Allah serta shalawat dan salam untuk Rasulullah."
        />
        <ArabicPrayerBlock
            title="b. Do'a Ketika Melihat Ka'bah (Baitullah)"
            arabic="اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيْفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيْفًا وَتَعْظِيمًا وَتَكْرِيمًا وَبِرًّا. اَللَّهُمَّ أَنْتَ السَّلَامُ فَحَيْنَا رَبَّنَا بِالسَّلَامِ"
            latin="Allahumma zid haadzal baita tasyriifan wata'dziiman, watakriiman wamahaabatan wazid man syarroffahu, wa karramahu mimman hajjahu awi'tamarahu, tasyriifan wata'dzhiiman watakriiman wabirran. Allahumma antas-salam fahayyina rabbana bissalam."
            translation="Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan wibawa pada Bait (Ka'bah) ini. Dan tambahkan pula pada orang-orang yang memuliakan, mengagungkan, dan menghormatinya di antara mereka yang berhaji atau yang berumrah dengan kemuliaan, keagungan, kehormatan, dan kebaikan. Ya Allah, Engkau adalah sumber keselamatan, maka hidupkanlah kami Ya Tuhan kami dengan keselamatan."
        />
        <ArabicPrayerBlock
            title="c. Mulai Thawaf dengan Mengecup (Isyarah) ke Hajar Aswad (Dibaca Setiap Putaran)"
            arabic="بِسْمِ اللَّهِ ، وَاللَّهُ أَكْبَرٍ. اللَّهُمَّ إِيمَاناً بِكَ وَتَصْدِيقًا بِكِتَابِكَ ، وَوَفَاءً بِعَهْدِكَ ، وَاتِّبَاعاً لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى الله عليه وسلم"
            latin="Bismillahi wallahu akbar allahumma imanan bika, wa tashdiqan bikitabika wa wafa'an bi 'ahdika wat tiba'an li sunnati nabiyyika Muhammadin shallallahu alaihi wa sallam."
            translation="Dengan nama Allah, dan Allah Maha Besar, Ya Allah! Dengan beriman kepada-Mu, membenarkan Kitab-Mu (Al-Qur'an), setia kepada janji-Mu dan dengan mengikuti Sunnah Nabi-Mu (aku berthawaf di sekeliling Ka'bah ini)."
        />
        <ArabicPrayerBlock
            title="d. Do'a Ketika Melintasi Pintu Ka'bah (Dibaca Setiap Putaran)"
            arabic="اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ وَالْحَرَامِ حَرَامُكَ وَالْأَمْنَ أَمْنُكَ وَالْعَبْدَ عَبْدُكَ وَأَنَا عَبْدُكَ وَابْنُ عَبْدِكَ وَهَذَا مَقَامُ عَيْذُكَ بِكَ مِنْ النَّارِ"
            latin="Allahumma innaa haadzal baita baituka wal haraama haraamuka wal amna amnuka wal 'abda 'abduka wa anaa 'abduka wabnu 'abdika wa haadzaa maqaamu 'aidza bika minannaari"
            translation="Ya Allah, sesungguhnya Bait ini rumah-Mu, tanah mulia ini tanah-Mu, negeri aman ini negeriMu, hamba ini hamba-Mu, anak dari hamba-Mu, dan tempat ini adalah tempat orang berlindung pada-Mu dari siksa neraka."
        />
        <ArabicPrayerBlock
            title="e. Do'a Ketika Melintasi Rukun Iraqi"
            arabic="اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِن الشَّكِ وَالشِرْكِ وَالشَّقَاقِ والنِّفَاقِ وَسُوءِ الْأَخْلَاقِ وَسُوءِ الْمَنْظَرِ وَالْمُنْقَلِبِ فِي الْمَالِ وَالْأَهْلِ والوَلَدِ اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ والْجَنَّةَ وأَعُوذُبِكَ مِن سَخَطِكَ وَالنَّارِ وَالهَمِّ إِنِّي أَعُوذُبِكَ مِنْ فِتْنَةِ القُبُرِ وأَعُوذُ بِكَ مِن فِتْنَةِ الْمَحْيَا والْمَمَاتِ وَمِنْ حَرِّ جَهَنَّمَ"
            latin="Allahumma inni a'udzubika minasysyakki wasysyirki wasysyiqaaqi wannifaaqi wa suu'il akhlaaqi wa suu'il manzhari wal munqalabi fil maali wal ahli wal waladi. Allahumma innii as'aluka ridhaaka wal jannata wa a'udzubika min sakhotika wannaar. Allahumma innii a'udzubika min fitnatil qobri wa a'udzubika min fitnatil mahyaa wal mamaati wa min harri jahannam."
            translation="Ya Allah, aku berlindung kepada-Mu dari syirik, keraguan, kekufuran, kemunafikan, perselisihan, buruk budi pekerti, dan aku berlindung dari fitnah keluarga, harta dan keturunan. Ya Allah, aku mohon kepadamu keridaan-Mu dan surga. Dan aku berlindung pada-Mu dari murka-Mu dan siksa neraka. Ya Allah, aku berlindung kepada-Mu dari fitnah kubur, dan aku berlindung kepada-Mu dari fitnah dajjal, fitnah kehidupan dan derita kematian serta dari panasnya jahanam."
        />
         <ArabicPrayerBlock
            title="f. Do'a Ketika Melintasi Talang Emas"
            arabic="أَللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلَّ عَرْشِكَ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّكَ وَلَا بَقِيَ إِلَّا وَجْهَكَ وَأَسْقِنِي مِنْ حَوْضِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّم شُرْبَةً هَنِيئَةً مَرِيئَةً لَا أَظْمَأُ بَعْدَهَا أَبَدًا يَا ذَالْجَلَالِ وَالْإِكْرَمِ"
            latin="Allahumma azhillanii tahta zhilli ‘arsyika yauma laa zhilla illaa zhilluka walaa baqiya illaa wajhuka wa asqini min haudhi nabiyyika muhammadin shallallaahu 'alaihi wasallama syurbatan haniii'atan marii’atan laa azma'u ba’dahaa abadan, ya dzaljalali wal ikrom"
            translation="Ya Allah, lindungilah aku di bawah naungan singgasana-Mu pada hari yang tidak ada naungan selain naungan-Mu, dan tidak ada yang kekal kecuali zat-Mu, dan berilah aku minuman dari telaga Nabi Muhammad SAW dengan suatu minuman yang lezat, segar dan nyaman, sesudah itu aku tidak akan haus untuk selamanya. Wahai sang pemilik Kebesaran dan Kemulyaan."
        />
        <ArabicPrayerBlock
            title="g. Do'a antara rukun yamani & rukun syami"
            arabic="اللَّهُمَّ اجْعَلْنِي حَجًّا مَبْرُورًا وَسَعْياً مَشْكُورًا وَذُنُباً مَغْفُورًا وَعَمَلًا صَالِحًا مَقْبُولًا وَتِجَارَةً لَّنْ تَبُورًا. يَا عَالِمٌ مَا فِي الصُّدُورِ أَخْرِجْنِي مِن الظُّلُمَاتِ إِلَى النور"
            latin="Allahummaj’alnii hajjan mabruuran wa saʼyan masykuuran wa dzanban maghfuura wa 'amalan shaalihan maqbuulan wa tijaaratan lan tabuura. Ya ‘aalima maa fish shuduuri akhrijnii minazh zhulumaati ilannuri"
            translation="Ya Allah, karuniakanlah kepada kami haji yang mabrur, Sa'i yang diterima, dosa yang diampuni, amal saleh yang diterima, dan usaha yang tidak mengalami kerugian. Wahai Tuhan Yang Maha Mengetahui segala yang terkandung dalam sanubari, keluarkanlah aku dari kegelapan menuju cahaya yang terang benderang."
        />
        <ArabicPrayerBlock
            title="h. Do'a antara rukun yamani & hajar aswad"
            arabic="رَبَّنَا آتِنَا فِي الدُنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ. (Tambahkan: اَللَّهُمَّ أَنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَفِيَةَ فِي الدِّيْنِ وَ الدُّنْيَا وَالْآخِرَةَ)"
            latin="Robbana atina fidunya hasanah wafil akhiroti hasanataw waqina 'adzabannar. (Allahumma inni as'alukal 'afwa wal 'afiyata fid diini wad dunya wal akhiroh)"
            translation="Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka. (Ya Allah, aku memohon kepada-Mu ampunan dan keselamatan dalam agamaku, duniaku, dan akhiratku)."
        />
        <ArabicPrayerBlock
            title="i. Do'a Selesai Thawaf"
            arabic="اللهم يا رب البيت العتيق أعتق رقابنا ورقاب أبائنا وأمهاتنا وإخواننا وأولادنا من النار ياذا الجود والكرم والفضل والمن والعطاء والإحسان اللهم أحسن عاقبتنا في الأمور كلها وأجرنا من خزي الدنيا وعذاب الآخرة"
            latin="Allahuma yaa rabbal baitil ‘atiiqi a'tiq riqaabanaa wa riqaaba aabaaʼinaa wa ummahaatinaa wa ikhwaaninaa wa aulaadina minan naari yaa dzal juudi wal karami wal fadhli wal manni wal a'tha'i wal ihsaani. Allahumma ahsin ‘aaqibatanaa fil umuuri kullihaa wa ajirna min khizyid-dunya wa 'adzaabil aakhirati."
            translation="Ya Allah, yang memelihara Ka'bah ini, bebaskanlah diri kami, bapak dan ibu kami, saudara-saudara dan anak-anak kami dari siksa neraka, wahai Tuhan Yang Maha Pemurah, Maha Dermawan, dan yang mempunyai keutamaan, kemuliaan, kelebihan, anugerah, pemberian, serta kebaikan. Ya Allah, perbaikilah akhir segenap urusan kami dan jauhkanlah kami dari kehinaan dunia serta siksa di akhirat kelak."
        />
        <h5 className="text-sm font-semibold text-theme-text mt-3 mb-1 text-glow-accent">j. Shalat Sunat Thawaf</h5>
        <p className="text-sm">Setelah melaksanakan Thawaf (7 Putaran) maka diharuskan melaksanakan shalat sunat Thawaf 2 Rokaat.</p>
        <ArabicPrayerBlock
            title="Niat Shalat Sunat Thawaf"
            arabic="أصَلِّي سُنَّةَ الطَّوَافَ رَكْعَتَيْنِ اللَّهِ تَعَالَى"
            latin="Usholli Sunnatat Thowwafa Rokʼataini Lillahi Ta'alaa"
            translation="Aku niat shalat sunnah Thawaf dua rakaat karena Allah Ta'ala."
        />
         <h5 className="text-sm font-semibold text-theme-text mt-3 mb-1 text-glow-accent">k. Berdo'a Setelah Melaksanakan Shalat Sunat Thawaf</h5>
         <p className="text-sm mb-2">Sangat dianjurkan berdo'a setelah melaksanakan shalat sunat thawaf di belakang atau sejajar dengan Multazam. Do'a Setelah Melaksanakan Shalat Sunat Thawaf:</p>
        <ArabicPrayerBlock
            arabic="اللَّهُمَّ أَنَا عَبْدُكَ وَابْنُ عَبْدِكَ أَتَيْتُكَ بِذُنُوبِ كَثِيرَةٍ وأَعْمَالٍ سَيِّئَةٍ وَهَذَا مَقَامُ الْعَائِذٍ بِكَ مِنَ النَّارِ فَاغْفِرْ لِي إِنَّكَ أَنتَ الْغَفُورُ الرَّحِيمُ"
            latin="Allaahumma ana 'abdika wabnu 'abdika ataituka bidzunuubin katsiiratin wa'maalin sayyiatin, wa haadzaa maqaamul 'aaidzi bik minan naar, fagfir lii innaka antal ghafuurur rahiim"
            translation="Ya Allah, aku adalah hamba-Mu dan putra hamba-Mu, aku mendatangi-Mu dengan dosa yang banyak dan amal-amal yang buruk, ini adalah tempat berlindung kepada-Mu dari api neraka, maka ampunilah kepadaku, sesungguhnya Engkau Maha Pengampun lagi Maha Penyayang."
        />
        <h5 className="text-sm font-semibold text-theme-text mt-3 mb-1 text-glow-accent">Do'a Meminum Air Zamzam</h5>
        <p className="text-sm mb-1">Hadist tentang Air Zamzam: Ketika seseorang ingin minum air zamzam, disunnahkan untuk membaca doa kepada Allah. Dalam hadits yang diriwayatkan oleh Ibnu Majah dan Ahmad dari Jabir RA disebutkan, <span className="font-arabic text-md text-right leading-relaxed" dir="rtl" lang="ar">مَاءُ زَمْزَمَ لِمَا شُرِبَ لَهُ</span> (Artinya: Air zamzam sesuai dengan apa yang diniatkan peminumnya. HR Ibnu Majah).</p>
        <ArabicPrayerBlock
            arabic="اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمَ نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ وَسَقَمٍ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ"
            latin="Allahumma innii as aluka 'ilman naafi'an wa rizqan waasi'an wasyifaa an min kulli daa in wasaqamin birahmatika yaa arhamarraahimiin."
            translation="Ya Allah! Sesungguhnya daku bermohon kepadaMu ilmu yang bermanfaat, rezeki yang luas dan penawar bagi segala penyakit; Dengan Rahmat Mu, Wahai Tuhan Yang Maha Pengasih lagi Maha Penyayang."
        />
      </InfoCard>

      <InfoCard title="BAB III: UMRAH - SA'I" icon={<PrayerMatIcon className="text-theme-accent"/>} titleColorClass="text-theme-accent">
        <h4 className="text-md font-semibold text-theme-text mt-1 mb-2 text-glow-accent">1. Pengertian Sa'i</h4>
        <p className="text-sm">Sa'i merupakan salah satu rukun umrah yang dilakukan dengan berjalan kaki (berlari-lari kecil) bolak-balik 7 kali dari Bukit Shafa ke Bukit Marwah dan sebaliknya. Kedua bukit yang satu sama lainnya berjarak sekitar 450 meter.</p>
        {/* Konten selanjutnya untuk Sa'i akan ditambahkan di sini jika tersedia */}
        <p className="text-sm mt-2 text-theme-text-muted"><em>(Panduan lebih lanjut mengenai Sa'i dan Tahallul akan ditambahkan di sini. Untuk saat ini, informasi Sa'i berhenti sampai di pengertian.)</em></p>
      </InfoCard>

    </div>
  );
};

export default ManasikPage;
