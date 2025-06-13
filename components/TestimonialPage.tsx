import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NOTIFICATION_NUMBER } from '../constants';
import InfoCard from './InfoCard';

interface JamaahDetails {
  nama: string;
  noHp: string;
}

interface Answers {
  // Section A
  kemudahanInformasi: number;
  penjelasanPaket: number;
  hargaPaket: number;
  fasilitasPelayanan: number;
  // Section B
  keramahanTim: number;
  penjelasanPembimbing: number;
  responsTourLeaderGuide: number;
  kenyamananBusUmum: number;
  kepuasanCityTour: number;
  kenyamananHotel: number;
  kenyamananBusSaudi: number;
  // Section C
  kritikSaran: string;
}

const initialAnswers: Answers = {
  kemudahanInformasi: 0,
  penjelasanPaket: 0,
  hargaPaket: 0,
  fasilitasPelayanan: 0,
  keramahanTim: 0,
  penjelasanPembimbing: 0,
  responsTourLeaderGuide: 0,
  kenyamananBusUmum: 0,
  kepuasanCityTour: 0,
  kenyamananHotel: 0,
  kenyamananBusSaudi: 0,
  kritikSaran: '',
};

const scoreLabels: { [key: number]: string } = {
  1: "Tidak Puas",
  2: "Kurang Puas",
  3: "Puas",
  4: "Sangat Puas",
};

const questionnaireItems = {
  A: [
    { id: 'kemudahanInformasi', label: 'Kemudahan dalam menerima informasi perjalanan umrah' },
    { id: 'penjelasanPaket', label: 'Penjelasan tentang paket umrah yang ditawarkan' },
    { id: 'hargaPaket', label: 'Harga paket umrah yang ditawarkan' },
    { id: 'fasilitasPelayanan', label: 'Fasilitas & Pelayanan yang diberikan selama perjalanan' },
  ],
  B: [
    { id: 'keramahanTim', label: 'Keramahan Tim' },
    { id: 'penjelasanPembimbing', label: 'Penjelasan Pembimbing dalam Materi Manasik' },
    { id: 'responsTourLeaderGuide', label: 'Respons pelayanan Tour Leader dan Tour Guide dalam melayani' },
    { id: 'kenyamananBusUmum', label: 'Kenyamanan Bus (Umum, misal dari/ke bandara di Indonesia)' },
    { id: 'kepuasanCityTour', label: 'Kepuasan untuk City Tour & Ziarah' },
    { id: 'kenyamananHotel', label: 'Kenyamanan di Hotel Mekah & Madinah' },
    { id: 'kenyamananBusSaudi', label: 'Kenyamanan Bus selama perjalanan di Mekah & Madinah' },
  ],
};

const TestimonialPage: React.FC = () => {
  const [step, setStep] = useState<'details' | 'questionnaire'>('details');
  const [jamaahDetails, setJamaahDetails] = useState<JamaahDetails>({ nama: '', noHp: '' });
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJamaahDetails({ ...jamaahDetails, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (section: 'A' | 'B', id: keyof Answers, value: number) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleKritikSaranChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({ ...answers, kritikSaran: e.target.value });
  };

  const proceedToQuestionnaire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jamaahDetails.nama.trim() || !jamaahDetails.noHp.trim()) {
      alert('Nama dan Nomor HP wajib diisi.');
      return;
    }
    setStep('questionnaire');
  };

  const handleSubmit = () => {
    setSubmitError(null);
    // Validasi apakah semua pertanyaan skor sudah diisi
    const allScoresFilled = Object.values(questionnaireItems.A)
                              .concat(Object.values(questionnaireItems.B))
                              .every(item => (answers[item.id as keyof Omit<Answers, 'kritikSaran'>] as number) !== 0);

    if (!allScoresFilled) {
      const errorMessage = 'Mohon isi semua poin penilaian (skor 1-4) sebelum mengirim.';
      setSubmitError(errorMessage);
      alert(errorMessage);
      return;
    }
    if (!answers.kritikSaran.trim()) {
        const errorMessage = 'Mohon isi kolom Kritik & Saran.';
        setSubmitError(errorMessage);
        alert(errorMessage);
        return;
    }


    let message = `TESTIMONI JEMAAH BBA INDONESIA\n=============================\n\n`;
    message += `Nama Jamaah: ${jamaahDetails.nama}\n`;
    message += `No. HP: ${jamaahDetails.noHp}\n\n`;
    message += `POIN SKOR KEPUASAN:\n[1] Tidak Puas [2] Kurang Puas [3] Puas [4] Sangat Puas\n\n`;

    message += `A. PENILAIAN PELAYANAN UMUM\n`;
    questionnaireItems.A.forEach(item => {
      const score = answers[item.id as keyof Omit<Answers, 'kritikSaran'>] as number;
      message += `- ${item.label}: ${score} (${scoreLabels[score] || 'Belum dinilai'})\n`;
    });

    message += `\nB. PENILAIAN PELAYANAN TIM, TOUR GUIDE, DLL.\n`;
    questionnaireItems.B.forEach(item => {
      const score = answers[item.id as keyof Omit<Answers, 'kritikSaran'>] as number;
      message += `- ${item.label}: ${score} (${scoreLabels[score] || 'Belum dinilai'})\n`;
    });

    message += `\nC. KRITIK & SARAN\n`;
    message += `${answers.kritikSaran}\n\n`;
    message += `-----------------------------\nTerima kasih atas partisipasi Anda!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NOTIFICATION_NUMBER}?text=${encodedMessage}`, '_blank');
    alert("Terima kasih! Anda akan diarahkan ke WhatsApp untuk mengirim testimoni Anda.");
  };

  const renderRadioGroup = (item: { id: keyof Answers; label: string }, section: 'A' | 'B') => (
    <div key={item.id} className="mb-4 p-3 bg-theme-interactive/30 rounded-md border border-[var(--color-theme-widget-border-hologram)]/50">
      <p className="text-sm font-medium text-theme-text mb-2">{item.label}:</p>
      <div className="flex flex-wrap justify-around gap-2">
        {[1, 2, 3, 4].map(score => (
          <label key={score} className="flex flex-col items-center space-y-1 cursor-pointer p-1.5 rounded-md hover:bg-theme-accent/30 transition-colors w-20 text-center">
            <input
              type="radio"
              name={item.id}
              value={score}
              checked={(answers[item.id as keyof Answers] as number) === score}
              onChange={() => handleAnswerChange(section, item.id as keyof Answers, score)}
              className="form-radio h-4 w-4"
            />
            <span className="text-xs text-theme-text-muted">{scoreLabels[score]}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const sectionClasses = "bg-theme-widget-bg p-5 sm:p-6 rounded-xl shadow-hologram-soft border border-[var(--color-theme-widget-border-hologram)] hover:shadow-hologram-intense transition-shadow duration-300";

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8 px-4 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-theme-accent text-center mb-6 page-title-glow">
        Kuesioner Testimoni Jamaah
      </h2>

      {step === 'details' && (
        <InfoCard title="Identitas Jamaah" titleColorClass="text-theme-accent">
          <form onSubmit={proceedToQuestionnaire} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-theme-text mb-1.5">Nama Lengkap Jamaah <span className="text-red-400">*</span></label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={jamaahDetails.nama}
                onChange={handleDetailChange}
                className="form-input w-full text-sm"
                required
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>
            <div>
              <label htmlFor="noHp" className="block text-sm font-medium text-theme-text mb-1.5">No. HP (WhatsApp Aktif) <span className="text-red-400">*</span></label>
              <input
                type="tel"
                id="noHp"
                name="noHp"
                value={jamaahDetails.noHp}
                onChange={handleDetailChange}
                className="form-input w-full text-sm"
                required
                placeholder="Contoh: 081234567890"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-theme-accent hover:bg-theme-accent-hover text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-glow-accent-strong transition-colors"
            >
              Lanjut Isi Kuesioner
            </button>
          </form>
        </InfoCard>
      )}

      {step === 'questionnaire' && (
        <div className="space-y-6">
          <div className={`${sectionClasses} text-sm`}>
            <p><strong>Nama:</strong> {jamaahDetails.nama}</p>
            <p><strong>No. HP:</strong> {jamaahDetails.noHp}</p>
            <button onClick={() => setStep('details')} className="text-xs text-theme-accent hover:underline mt-1">
              (Ganti Detail Jamaah)
            </button>
          </div>

          <section className={sectionClasses}>
            <h3 className="text-lg font-semibold text-theme-accent mb-3 text-glow-accent-strong border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-2">
              A. Penilaian Pelayanan Umum
            </h3>
            {questionnaireItems.A.map(item => renderRadioGroup(item as { id: keyof Answers; label: string }, 'A'))}
          </section>

          <section className={sectionClasses}>
            <h3 className="text-lg font-semibold text-theme-accent mb-3 text-glow-accent-strong border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-2">
              B. Penilaian Pelayanan Terhadap Tim, Tour Guide, Tour Leader, Sarana & Prasarana
            </h3>
            {questionnaireItems.B.map(item => renderRadioGroup(item as { id: keyof Answers; label: string }, 'B'))}
          </section>

          <section className={sectionClasses}>
            <h3 className="text-lg font-semibold text-theme-accent mb-3 text-glow-accent-strong border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-2">
              C. Kritik & Saran
            </h3>
            <textarea
              value={answers.kritikSaran}
              onChange={handleKritikSaranChange}
              className="form-textarea w-full min-h-[100px] text-sm"
              rows={4}
              placeholder="Tuliskan kritik dan saran membangun Anda di sini..."
            />
          </section>
          
          {submitError && (
            <p className="text-red-400 text-sm text-center bg-red-900/30 p-2 rounded-md">{submitError}</p>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-theme-accent hover:bg-theme-accent-hover text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-glow-accent-strong transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-75"
            >
              Kirim Testimoni via WhatsApp
            </button>
            <p className="text-xs text-theme-text-muted mt-3">
              Dengan mengirim, Anda setuju testimoni Anda (dengan anonimisasi jika diperlukan) dapat digunakan oleh BBA Indonesia.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialPage;
