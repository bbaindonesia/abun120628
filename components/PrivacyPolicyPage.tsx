
import React from 'react';
import InfoCard from './InfoCard'; 

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-theme-accent text-center mb-6 page-title-glow">
        Kebijakan Privasi Aplikasi Abun BBA Indonesia
      </h2>

      <InfoCard title="Pendahuluan" titleColorClass="text-theme-accent">
        <p>
          Selamat datang di Kebijakan Privasi Aplikasi Abun Customer Service BBA Indonesia ("Aplikasi"). Kebijakan Privasi ini menjelaskan bagaimana kami, PT Bani Bunyamin Attarbiyyah ("BBA Indonesia", "kami"), mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadi Anda saat Anda menggunakan Aplikasi kami.
        </p>
        <p className="mt-2">
          Dengan menggunakan Aplikasi, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini. Jika Anda tidak setuju dengan ketentuan kebijakan privasi ini, mohon untuk tidak mengakses Aplikasi.
        </p>
      </InfoCard>

      <InfoCard title="Informasi yang Kami Kumpulkan" titleColorClass="text-theme-accent">
        <p>Kami dapat mengumpulkan beberapa jenis informasi untuk berbagai tujuan guna menyediakan dan meningkatkan layanan kami kepada Anda:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>
            <strong>Data Pribadi:</strong> Saat menggunakan Aplikasi kami, khususnya saat berinteraksi dengan fitur tertentu (seperti formulir pendaftaran yang datanya kemudian Anda kirim manual via WhatsApp), Anda mungkin diminta untuk memberikan informasi identitas pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda ("Data Pribadi"). Data Pribadi dapat mencakup, namun tidak terbatas pada: nama, alamat email (jika berlaku), nomor telepon, dan data lain yang relevan dengan layanan yang Anda minta.
          </li>
          <li>
            <strong>Data Penggunaan:</strong> Kami mungkin juga mengumpulkan informasi tentang bagaimana Aplikasi diakses dan digunakan ("Data Penggunaan"). Data Penggunaan ini dapat mencakup informasi seperti alamat Protokol Internet komputer Anda (misalnya alamat IP), jenis browser, versi browser, halaman Aplikasi kami yang Anda kunjungi, waktu dan tanggal kunjungan Anda, waktu yang dihabiskan di halaman tersebut, pengidentifikasi perangkat unik, dan data diagnostik lainnya.
          </li>
          <li>
            <strong>Data Interaksi dengan AI (Abun):</strong> Percakapan Anda dengan asisten AI Abun diproses untuk memberikan respons. Kami tidak menyimpan histori percakapan secara permanen di server kami yang mengaitkannya dengan identitas pribadi Anda setelah sesi berakhir, kecuali jika diperlukan untuk peningkatan layanan secara anonim atau agregat.
          </li>
        </ul>
      </InfoCard>

      <InfoCard title="Bagaimana Kami Menggunakan Informasi Anda" titleColorClass="text-theme-accent">
        <p>BBA Indonesia menggunakan data yang dikumpulkan untuk berbagai tujuan:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Untuk menyediakan dan memelihara Aplikasi kami.</li>
          <li>Untuk memberitahu Anda tentang perubahan pada Aplikasi kami.</li>
          <li>Untuk memungkinkan Anda berpartisipasi dalam fitur interaktif Aplikasi kami saat Anda memilih untuk melakukannya.</li>
          <li>Untuk memberikan dukungan pelanggan.</li>
          <li>Untuk mengumpulkan analisis atau informasi berharga sehingga kami dapat meningkatkan Aplikasi kami.</li>
          <li>Untuk memantau penggunaan Aplikasi kami.</li>
          <li>Untuk mendeteksi, mencegah, dan mengatasi masalah teknis.</li>
          <li>Untuk memproses pendaftaran atau permintaan informasi yang Anda ajukan (misalnya, formulir pendaftaran yang datanya dikirim via WhatsApp).</li>
        </ul>
      </InfoCard>
      
      <InfoCard title="Pengungkapan Data" titleColorClass="text-theme-accent">
         <p>Kami tidak menjual atau menyewakan Data Pribadi Anda kepada pihak ketiga. Kami dapat mengungkapkan informasi Anda dalam situasi berikut:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>
                <strong>Kewajiban Hukum:</strong> Jika diharuskan oleh hukum atau sebagai tanggapan atas permintaan yang sah oleh otoritas publik (misalnya pengadilan atau lembaga pemerintah).
            </li>
            <li>
                <strong>Penyedia Layanan Pihak Ketiga:</strong> Kami dapat mempekerjakan perusahaan dan individu pihak ketiga untuk memfasilitasi Aplikasi kami ("Penyedia Layanan"), untuk menyediakan Aplikasi atas nama kami, untuk melakukan layanan terkait Aplikasi atau untuk membantu kami dalam menganalisis bagaimana Aplikasi kami digunakan. Pihak ketiga ini memiliki akses ke Data Pribadi Anda hanya untuk melakukan tugas-tugas ini atas nama kami dan berkewajiban untuk tidak mengungkapkan atau menggunakannya untuk tujuan lain apa pun. Contohnya adalah penggunaan API dari Google Gemini untuk fungsionalitas AI.
            </li>
        </ul>
      </InfoCard>

      <InfoCard title="Keamanan Data" titleColorClass="text-theme-accent">
        <p>
          Keamanan data Anda penting bagi kami, tetapi ingatlah bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun kami berusaha untuk menggunakan cara yang dapat diterima secara komersial untuk melindungi Data Pribadi Anda, kami tidak dapat menjamin keamanan mutlaknya.
        </p>
      </InfoCard>

      <InfoCard title="Hak-Hak Anda" titleColorClass="text-theme-accent">
        <p>Tergantung pada yurisdiksi Anda, Anda mungkin memiliki hak-hak berikut terkait Data Pribadi Anda:</p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Hak untuk mengakses, memperbarui, atau menghapus informasi yang kami miliki tentang Anda.</li>
          <li>Hak pembetulan.</li>
          <li>Hak untuk menolak.</li>
          <li>Hak pembatasan.</li>
          <li>Hak portabilitas data.</li>
          <li>Hak untuk menarik persetujuan.</li>
        </ul>
        <p className="mt-2">Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang disediakan di Aplikasi.</p>
      </InfoCard>
      
      <InfoCard title="Layanan Pihak Ketiga (Google Gemini API)" titleColorClass="text-theme-accent">
        <p>
          Aplikasi ini menggunakan Google Gemini API untuk menyediakan fungsionalitas asisten AI (Abun). Penggunaan Anda atas fitur ini juga tunduk pada kebijakan privasi Google. Kami menyarankan Anda untuk meninjau kebijakan privasi Google untuk memahami bagaimana mereka menangani data Anda.
        </p>
      </InfoCard>

      <InfoCard title="Perubahan pada Kebijakan Privasi Ini" titleColorClass="text-theme-accent">
        <p>
          Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini.
        </p>
        <p className="mt-2">
          Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan. Perubahan pada Kebijakan Privasi ini efektif ketika diposting di halaman ini.
        </p>
      </InfoCard>

      <InfoCard title="Hubungi Kami" titleColorClass="text-theme-accent">
        <p>
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Melalui Aplikasi: Gunakan fitur chat dengan Abun dan tanyakan cara menghubungi BBA Indonesia.</li>
          <li>Nomor Telepon: 08158881884</li>
          <li>Kunjungi Kantor Kami: Jl. Komplek Pondok Pesantren Attarbiyyah, Ds. Ciwulan, Kec. Telagasari, Kab. Karawang</li>
        </ul>
      </InfoCard>
      <p className="text-xs text-center text-theme-text-muted mt-6">
        Kebijakan Privasi ini terakhir diperbarui pada tanggal 30 Juli 2024.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
