

import { UmrahPackage, FAQItem, BBALegalityInfo, BBACompanyProfile, BBASavingsProgram, AbunAcquaintance, Employee } from './types';

export const APP_TITLE = "Customer Service BBA Indonesia";
// This will be replaced by an inline SVG in AbunAvatar.tsx
export const ABUN_DEFAULT_AVATAR = "placeholder_robot_avatar.svg";
export const USER_AVATAR = "https://picsum.photos/seed/user_avatar/80/80"; // Can be updated later
export const BBA_LOGO_URL = "https://photos.app.goo.gl/VWwMJWyf3D24eJDW9"; // Keep for now, maybe for a settings/about page

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';
export const QURAN_API_BASE_URL = "https://api.alquran.cloud/v1";
export const DOA_LIST_API_URL = "https://open-api.my.id/api/doa"; // Updated API URL

export const WHATSAPP_NOTIFICATION_NUMBER = "628158881884"; // BBA Indonesia's actual WhatsApp number for notifications

// Updated emergency contacts as per user request
export const BBA_EMERGENCY_CONTACTS: string[] = [
    "08158881884 (Kontak Darurat Utama BBA)",
    "082221000884 (Kontak Darurat BBA)",
    "082110003463 (Kontak Darurat BBA)",
    "08111110845 (Kontak Darurat BBA)",
    "085283894888 (Kontak Darurat BBA)",
    "085779237877 (Kontak Darurat BBA)"
];

export const GREETING_MESSAGES: string[] = [
  "Assalamualaikum Akang Teteh! Kumaha damang? Abun siap ngabantos!",
  "Wilujeng sumping! Dengan Abun di sini, ada yang bisa dibantu?",
  "Hallo! Abun hadir untuk melayani Akang Teteh. Mangga, bade naros naon?",
  "Sampurasun! Abun di sini, siap memberikan informasi terbaik untuk Anda.",
  "Salam hangat ti Abun! Siap ngajawab patarosan Akang Teteh sadayana!",
];

export const BBA_UMRAH_PACKAGES: UmrahPackage[] = [
  { id: 'bismillah', name: 'Paket Bismillah', price: 'Mulai dari Rp 25.000.000', description: 'Paket Umrah hemat dengan fasilitas dasar yang nyaman.', facilities: ['Tiket Pesawat PP', 'Hotel Bintang 3', 'Makan 3x Sehari', 'Visa Umrah', 'Mutowif'], image: 'https://picsum.photos/seed/umrah_bismillah/300/200' },
  { id: 'alhamdulillah', name: 'Paket Alhamdulillah', price: 'Mulai dari Rp 30.000.000', description: 'Paket Umrah populer dengan keseimbangan fasilitas dan harga.', facilities: ['Tiket Pesawat PP', 'Hotel Bintang 4', 'Makan 3x Sehari (Menu Internasional)', 'Visa Umrah', 'Mutowif Berpengalaman', 'City Tour Makkah & Madinah'], image: 'https://picsum.photos/seed/umrah_alhamdulillah/300/200' },
  { id: 'subhanallah', name: 'Paket Subhanallah', price: 'Mulai dari Rp 35.000.000', description: 'Paket Umrah premium dengan fasilitas terbaik dan kenyamanan ekstra.', facilities: ['Tiket Pesawat PP (Business Class optional)', 'Hotel Bintang 5 Dekat Masjidil Haram/Nabawi', 'Makan 3x Sehari (Buffet Lengkap)', 'Visa Umrah Prioritas', 'Mutowif Senior', 'Lounge Bandara', 'Perlengkapan Premium'], image: 'https://picsum.photos/seed/umrah_subhanallah/300/200' },
];

export const BBA_LEGALITY: BBALegalityInfo = {
  ppiuPermit: "Nomor U.438 Tahun 2020",
  accreditation: "Terakreditasi B, Nomor Sertifikat: LSUHK-01-IDN IMS-SUHK-066 Tahun 2022",
  bankAccount: "PT. Bani Bunyamin Attarbiyyah, Bank BNI, No. Rek: 7070505713 (Semua transaksi wajib via rekening ini)"
};

export const BBA_PROFILE: BBACompanyProfile = {
  name: "PT. Bani Bunyamin Attarbiyyah (BBA Indonesia)",
  skMenteri: "Surat Keputusan Menteri Agama Republik Indonesia Nomor: U.438 Tahun 2020 (sebelumnya U.348 Tahun 2020)", // Updated SK
  principle: "Yassiruu Wala Tu’assiruu (Mudahkan urusan orang, jangan dipersulit)",
  motto: "SAHABAT MENUJU BAITULLAH",
  vision: "Menjadi Penyelenggara Perjalanan Ibadah Umrah (PPIU) terdepan dan terpercaya di Indonesia yang senantiasa mengutamakan kepuasan, kenyamanan, dan keberkahan bagi setiap jamaah.",
  mission: [
    "Menyediakan layanan perjalanan ibadah umroh yang sesuai syariat Islam, aman, nyaman, dan profesional.", // Updated mission points
    "Membangun kepercayaan jamaah melalui transparansi, integritas, dan pelayanan prima.",
    "Memberikan pembinaan manasik umrah yang komprehensif.",
    "Terus berinovasi dalam penyediaan paket umroh yang beragam dan berkualitas.",
    "Menciptakan pengalaman spiritual yang mendalam dan tak terlupakan bagi setiap jamaah."
  ],
  reasonsToChoose: [
    "Terdaftar Resmi sebagai PPIU di Kementerian Agama RI.",
    "Terakreditasi sebagai Penyelenggara Perjalanan Ibadah Umrah & Haji.",
    "Memiliki Aplikasi Android untuk mempermudah jamaah.",
    "Selain Mutowif, memberangkatkan panitia untuk melayani jamaah.",
    "Tim Handling di Indonesia & KSA membantu pengurusan bagasi.",
    "Memilih hotel yang baik untuk kenyamanan jamaah.",
    "Pasti Berangkat (Menjamin jamaah berangkat dengan 5 Pasti Umrah).",
    "Tim Profesional membantu dari pendaftaran, pelaksanaan, hingga kepulangan.",
    "Kantor Milik Sendiri (bukan sewa) di Jl. Komplek Pondok Pesantren Attarbiyyah, Ds. Ciwulan, Kec. Telagasari, Kab. Karawang."
  ],
  address: "Jl. Komplek Pondok Pesantren Attarbiyyah, Ds. Ciwulan, Kec. Telagasari, Kab. Karawang",
  contact: "08158881884",
  officialWebsites: ["www.bbaindonesia.net", "www.indonesia.co.id", "www.bbatour.co.id"],
  androidAppLink: "https://play.google.com/store/apps/details?id=id.xit.bbatourcoid"
};

export const ABUN_ACQUAINTANCES: AbunAcquaintance[] = [
  { name: "Hj. Siti Fatimah", relation: "Istri K tercinta Bpk. H. Miftah Baedarus", description: " sosok ibu yang bijaksana dan panutan keluarga." },
  { name: "Muhammad Al Fatih Bunyamin", relation: "Putra pertama Bpk. H. Miftah Baedarus", description: " anak sholeh, cerdas, dan berbakti." },
  { name: "Aisyah Putri Azzahra", relation: "Putri kedua Bpk. H. Miftah Baedarus", description: " anak sholehah, lembut hati, dan kreatif." },
  { name: "KH. Abdullah Gymnastiar (Aa Gym)", relation: "Sahabat karib Bpk. H. Miftah Baedarus", description: " ulama kharismatik, pendiri Daarut Tauhiid." },
  { name: "Dr. (HC) H. Erick Thohir, B.A., M.B.A.", relation: "Tokoh Nasional & kolega Bpk. H. Miftah Baedarus", description: " Menteri BUMN RI, pengusaha sukses." },
  { name: "Ustadz Abdul Somad (UAS)", relation: "Ulama panutan Bpk. H. Miftah Baedarus", description: " da'i kondang dengan jutaan pengikut." },
  { name: "Keluarga Besar Ponpes Attarbiyyah", relation: "Keluarga besar & lingkungan Bpk. H. Miftah Baedarus", description: " tempat beliau tumbuh dan mengabdi." }
];

export const BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS = {
  administration: {
    title: "Ketentuan Administrasi Pendaftaran Umrah",
    points: [
      "Membayar uang pendaftaran sebesar Rp 7.000.000,- dengan minimum waktu 6 bulan sebelum jadwal keberangkatan.",
      "Paspor masih berlaku minimal 8 bulan dari jadwal keberangkatan dan nama di paspor minimal 3 suku kata (contoh: Subki Akbar Fairuz).",
      "Dokumen Lain (Sesuai Kondisi):",
      "  Suami Istri (Istri < 45 tahun): Buku Nikah Asli dan Kartu Keluarga.",
      "  Suami Istri dan Anak: Semua dokumen di atas ditambah Akte Kelahiran Anak.",
      "Catatan Penting:",
      "  Jamaah dengan kesehatan risiko tinggi diharapkan ada pendampingan keluarga dan diinformasikan saat mendaftar.",
      "  Semua berkas pendaftaran disampaikan paling lambat 1 bulan sebelum keberangkatan."
    ]
  },
  cancellation: {
    title: "Ketentuan Biaya Pembatalan Keberangkatan",
    points: [
      "Pembatalan tertulis harus diterima BBA Indonesia paling lambat 60 hari sebelum program.",
      "Biaya Pembatalan:",
      "  60 Hari Sebelum Keberangkatan: 30% dari harga paket.",
      "  45 Hari Sebelum Keberangkatan: 50% dari harga paket.",
      "  30 Hari Sebelum Keberangkatan: 70% dari harga paket.",
      "  15 Hari Sebelum Keberangkatan: 100% dari harga paket.",
      "Apabila terjadi kegagalan pembayaran pelunasan atau pembatalan oleh calon jamaah (misal: meninggal dunia, bencana alam), keberangkatan bisa digantikan oleh pihak keluarga atau kerabat."
    ]
  },
  prohibitionsAndSanctions: {
    title: "Ketentuan Larangan dan Sanksi Jamaah Umrah",
    points: [
      "Jamaah Umrah dilarang dan/atau berniat tinggal di Saudi Arabia atau overstay melebihi batas waktu yang ditentukan.",
      "Pelanggaran dikenakan sanksi denda USD 100.000 (Seratus Ribu dollar Amerika), ditanggung jamaah dan/atau keluarga/ahli waris."
    ]
  },
  childDiscount: {
    title: "Diskon Anak",
    points: [
      "Usia 1-3 tahun: Diskon 10%.",
      "Usia 4-5 tahun: Diskon 5%.",
      "Usia 5-7 tahun: Diskon 3%."
    ]
  },
  generalRequirements: {
    title: "Persyaratan Umum Umrah",
    points: [
      "Menyerahkan paspor asli paling lambat 1 bulan sebelum tanggal keberangkatan dengan nama endorse minimal 2 suku kata.",
      "Sertifikat Vaksin Miningitis, Vaksin Covid 3 Dosis, & Vaksin Influenza.",
      "Menyerahkan 4 lembar pas foto berwarna ukuran 4x6 (latar belakang putih & tampak wajah 80%).",
      "Menyerahkan fotokopy KTP, KK, Buku Nikah/Akta Kelahiran/Ijazah.",
      "Membayar Uang Muka (DP) sejumlah Rp 7.000.000,-/Orang.",
      "Pelunasan dilakukan H-45 atau selambatnya H-30 sebelum keberangkatan."
    ]
  },
  priceAndItineraryChanges: {
    title: "Perubahan Harga dan Itinerary",
    points: [
      "Harga paket sudah termasuk biaya operasional, perencanaan, dan penanganan peserta/jamaah menggunakan mata uang USD, SAR, dan IDR.",
      "Jika terjadi perubahan nilai tukar IDR ke USD atau SAR lebih besar dari 5%, biaya program dan biaya lain dapat direvisi.",
      "BBA Indonesia berhak mengubah itinerary dan harga, serta mengganti fasilitas dan hotel dengan kualitas yang sama atau lebih baik jika diperlukan."
    ]
  },
  packageInclusions: {
    title: "Termasuk dalam Harga Paket",
    points: [
      "Tiket Pesawat (PP) Starting Jakarta, Visa Umrah, Hotel Mekah & Madinah, Makan Selama Di Mekah & Madinah 3x Sehari, Tasrekh Raudhah, Bus Antar Jemput Jemaah & Kegiatan (Program), Mutowif, Tour Leader, Tour Guide, Handling, City Tour di Mekah & Madinah (Sesuai Program), Perlengkapan Umrah, Manasik, Bus Keberangkatan & Kepulangan (dari kantor BBA Indonesia ke Soeta Airport), Air Zamzam (Jika diizinkan), Sertifikat Umrah, Asuransi Perjalanan, Lounge di Jakarta (Program Khusus)."
    ]
  },
  packageExclusions: {
    title: "Tidak Termasuk dalam Harga Paket",
    points: [
      "Biaya Keperluan yang bersifat Pribadi, Kelebihan Bagasi, Pembuatan/Perpanjangan/Penambahan Nama di paspor, Vaksin (Miningitis, Covid 3 Dosis, Influenza), Request Kamar, City Tour di Luar Program."
    ]
  },
  departureConditions: {
    title: "Ketentuan Keberangkatan",
    points: [
      "BBA Indonesia akan memberangkatkan jamaah umrah minimal 35 orang dalam setiap keberangkatannya.",
      "Jika kuota belum terpenuhi, BBA Indonesia berhak me-reschedule keberangkatan sampai kuota terpenuhi, atau menambah biaya jika jamaah belum tercukupi."
    ]
  }
};

export const BBA_TERMS_AND_CONDITIONS_SUMMARY = {
  registrationAdmin: "Pendaftaran dilakukan dengan membayar DP, menyerahkan dokumen paspor (minimal 3 suku kata, berlaku 8 bulan), dan dokumen pendukung lainnya seperti buku nikah/akte. Jamaah risti (risiko tinggi) diharapkan didampingi keluarga dan menginformasikan saat mendaftar. Berkas lengkap maksimal 1 bulan sebelum berangkat.",
  cancellationPolicy: "Pembatalan tertulis diterima maksimal 60 hari sebelum program. Biaya pembatalan: 30% (60 hari), 50% (45 hari), 70% (30 hari), 100% (15 hari sebelum berangkat).",
  participantReplacement: "Jika terjadi kegagalan pembayaran pelunasan atau pembatalan karena sebab tertentu (misal: meninggal dunia, bencana), keberangkatan dapat digantikan oleh keluarga/kerabat.",
  prohibitionsAndSanctions: "Jamaah dilarang overstay di Saudi Arabia. Pelanggaran dikenakan denda USD 100.000 ditanggung jamaah/keluarga."
};

export const BBA_SERVICES_INFO = {
  title: "Pelayanan BBA Indonesia",
  points: [
    "Pelayanan ramah dan profesional dari tim BBA Indonesia yang selalu siap membantu, dari persiapan hingga kepulangan.",
    "Memilih transportasi dan akomodasi terbaik (BUS, HOTEL, MASKAPAI).",
    "Mempunyai Pembimbing, Tour Leader & Tour Guide yang Bersertifikat, melayani ibadah sesuai Al Qur’an dan Sunnah.",
    "Didukung oleh Midtrans dan Flip sebagai Gateway Payment Terbesar untuk transaksi aman.",
    "Memiliki Aplikasi Android (https://play.google.com/store/apps/details?id=id.xit.bbatourcoid) untuk memudahkan jamaah dan mitra dalam pendaftaran atau ibadah."
  ]
};

export const BBA_REGISTRATION_FLOW = {
  title: "Alur Pendaftaran",
  points: [
    "Jamaah bisa datang langsung ke kantor BBA Indonesia, lewat mitra resmi, web, atau aplikasi.",
    "Pengisian Formulir Pendaftaran dan Pemilihan paket perjalanan (Umrah atau Haji).",
    "Pembayaran DP (Uang Muka) sesuai ketentuan paket yang dipilih.",
    "Penyerahan dokumen persyaratan (Paspor, KTP, KK, Buku Nikah, Akte, Foto, dll).",
    "Pelunasan biaya paket sesuai jadwal yang ditentukan (biasanya H-45 atau H-30 sebelum keberangkatan).",
    "Mengikuti Manasik Umrah/Haji yang diselenggarakan oleh BBA Indonesia.",
    "Persiapan keberangkatan (pembagian perlengkapan, informasi teknis).",
    "Keberangkatan menuju Tanah Suci.",
  ]
};

export const BBA_DEPARTURE_PAYMENT_TERMS = {
  title: "Ketentuan Keberangkatan & Pembayaran Lanjutan",
  points: [
    "Pelunasan biaya paket dilakukan selambat-lambatnya 30 hari (H-30) sebelum tanggal keberangkatan yang dijadwalkan.",
    "Pembayaran dianggap sah jika telah diterima di rekening resmi PT. Bani Bunyamin Attarbiyyah.",
    "Keterlambatan pelunasan tanpa konfirmasi dapat mengakibatkan penjadwalan ulang atau pembatalan keberangkatan sesuai dengan ketentuan pembatalan yang berlaku.",
    "Biaya tambahan yang mungkin timbul di luar fasilitas paket (seperti kelebihan bagasi, pengeluaran pribadi, atau tour tambahan di luar program) menjadi tanggung jawab penuh jamaah.",
    "Perubahan kurs mata uang asing (USD/SAR) yang signifikan dapat mempengaruhi total biaya paket dan akan diinformasikan kepada jamaah.",
    "Setiap jamaah wajib memastikan semua dokumen perjalanan (Paspor, Visa, dll.) valid dan sesuai."
  ]
};

export const BBA_SAVINGS_PROGRAMS_DETAILED: BBASavingsProgram[] = [
  {
    type: 'Regular',
    title: 'Tabungan Umrah Reguler BBA',
    description: 'Program tabungan Umrah dengan setoran fleksibel untuk membantu Anda merencanakan ibadah ke Tanah Suci. Cocok untuk semua kalangan yang ingin mulai menabung sedikit demi sedikit.',
    terms: [
      'Setoran awal minimal Rp 500.000,-',
      'Setoran selanjutnya minimal Rp 100.000,- (dapat disetor kapan saja).',
      'Tidak ada batas waktu kontrak yang mengikat.',
      'Dana dapat ditarik atau dialihkan untuk pendaftaran paket Umrah BBA Indonesia setelah mencapai jumlah tertentu, dengan konfirmasi terlebih dahulu.',
      'Bebas biaya administrasi bulanan.',
      'Mendapatkan buku tabungan atau catatan digital untuk memantau saldo.',
    ]
  },
  {
    type: 'Ujrah',
    title: 'Tabungan Umrah Ujrah Barokah',
    description: 'Program tabungan Umrah syariah dengan akad Ujrah (imbalan atas jasa pengelolaan). Dana Anda dikelola secara profesional dan transparan.',
    terms: [
      'Nasabah memberikan kuasa (wakalah) kepada BBA Indonesia untuk mengelola dana tabungan.',
      'BBA Indonesia memberikan imbalan (ujrah) atas jasa pengelolaan dana sesuai kesepakatan di awal.',
      'Imbalan dapat diberikan secara periodik atau diakumulasikan.',
      'Penarikan dana atau penggunaan untuk paket Umrah tunduk pada ketentuan akad.',
      'Transparansi laporan pengelolaan dana.',
    ],
    minInitialDepositUjrah: 'Rp 1.000.000,-',
    contractPeriodUjrah: 'Minimal 12 Bulan (dapat diperpanjang)',
  }
];

export const BBA_SAVINGS_COMMON_TERMS = {
  generalRegistration: [
    "Mengisi Formulir Pendaftaran Program Tabungan Umrah BBA Indonesia.",
    "Menyerahkan fotokopi KTP yang masih berlaku.",
    "Menyetujui dan menandatangani akad serta syarat dan ketentuan program tabungan yang dipilih.",
    "Melakukan setoran awal sesuai jenis program tabungan."
  ],
  withdrawalAndRedemption: [
    "Pengajuan penarikan dana atau penebusan untuk paket Umrah dilakukan secara tertulis melalui formulir yang disediakan.",
    "Proses penarikan dana memerlukan waktu maksimal 7 hari kerja setelah semua persyaratan dipenuhi.",
    "Biaya administrasi penarikan sebelum jatuh tempo (jika ada) akan diinformasikan saat pendaftaran.",
    "Dana tabungan dapat digunakan untuk pembayaran DP atau pelunasan paket Umrah/Haji BBA Indonesia.",
  ],
  accountClosure: [
    "Penutupan rekening tabungan dapat dilakukan dengan mengajukan permohonan tertulis.",
    "Sisa saldo akan dikembalikan setelah dipotong biaya administrasi penutupan (jika ada) dan kewajiban lain (jika ada).",
  ],
  otherImportantNotes: [
    "BBA Indonesia berhak mengubah syarat dan ketentuan program tabungan dengan pemberitahuan kepada nasabah sesuai peraturan yang berlaku.",
    "Semua transaksi keuangan terkait program tabungan harus dilakukan melalui rekening resmi PT. Bani Bunyamin Attarbiyyah.",
    "Untuk informasi lebih lanjut, silakan hubungi layanan pelanggan BBA Indonesia.",
  ]
};

export const INITIAL_FAQ: FAQItem[] = [
  { id: 'faq_daftar', question: "Bagaimana cara mendaftar umrah di BBA Indonesia?", answer: "Akang Teteh tiasa daftar langsung ka kantor BBA Indonesia, ngalangkungan mitra resmi kami, website, atanapi aplikasi Android BBA Tour. Lengkepan formulirna, pilih paketna, teras bayar DP-na. Gampil pisan!" },
  { id: 'faq_dokumen', question: "Dokumen apa saja yang diperlukan untuk pendaftaran umrah?", answer: "Anu utami mah Paspor nu masih berlaku minimal 8 sasih, nami di paspor minimal 3 kecap. Teras fotokopi KTP, KK, buku nikah (kanggo suami istri), akte lahir (upami nyandak putra), pas foto, sareng sertifikat vaksin (Miningitis, Covid dosis lengkap)." },
  { id: 'faq_resmi', question: "Apakah BBA Indonesia travel resmi?", answer: "Alhamdulillah, BBA Indonesia teh PPIU (Penyelenggara Perjalanan Ibadah Umrah) resmi, tos kadaptar di Kementrian Agama RI. Nomor SK-na U.438 Taun 2020. Akreditasina oge tos B. Jadi, aman sareng terpercaya, Insya Allah." },
  { id: 'faq_harga', question: "Berapa harga paket umrah di BBA Indonesia?", answer: "Kanggo harga paket umrah anu paling update, fasilitasna naon wae, sareng jadwal angkatna, mangga Akang Teteh langsung cek di website resmi BBA Tour di bbatour.co.id/transaksi/paket-umrah. Di dinya sadayana lengkap!" },
  { id: 'faq_tabungan', question: "Apakah ada program tabungan umrah?", answer: "Aya pisan, Akang Teteh! BBA Indonesia gaduh program tabungan Umrah Reguler sareng Ujrah. Janten tiasa nabung sakedik-sakedik kanggo ngawujudkeun impian ka Baitullah. Mangga taroskeun ka Abun kanggo info langkung lengkap!" },
];

export const ALLOWED_EMPLOYEES: Employee[] = [
  { code: 'BBAEMP001', name: 'Miftah Baedarus (CEO)' },
  { code: 'BBAEMP002', name: 'Aisyah Humaira (Manajer Operasional)' },
  { code: 'BBAEMP003', name: 'Zulkifli Ahmad (Staf Marketing)' },
  { code: 'BBAEMP004', name: 'Siti Khadijah (Admin Keuangan)' },
  { code: 'TEST001', name: 'Pegawai Uji Coba' },
];
