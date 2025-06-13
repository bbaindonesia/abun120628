
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface RegistrantData {
  fullName: string;
  nik: string;
  gender: 'Laki-laki' | 'Perempuan' | '';
  placeOfBirth: string;
  dateOfBirth: string;
  addressDesa: string;
  addressKecamatan: string;
  addressKabupaten: string;
  addressDetail: string;
  phoneNumber: string;
}

interface AdditionalRegistrantData extends Omit<RegistrantData, 'addressDesa' | 'addressKecamatan' | 'addressKabupaten' | 'addressDetail' | 'phoneNumber'> {
  relationship: 'Suami' | 'Istri' | 'Ayah' | 'Ibu' | 'Anak' | 'Adik' | 'Kakak' | 'Saudara' | 'Sahabat' | 'Ponakan' | 'Kakek' | 'Nenek' | '';
}

type RegistrationType = 'Umrah' | 'Haji' | 'Tabungan';
type HajjPackageType = 'Regular' | 'Plus' | 'Furoda' | 'Dakhili' | '';

const initialPrimaryRegistrantState: RegistrantData = {
  fullName: '',
  nik: '',
  gender: '',
  placeOfBirth: '',
  dateOfBirth: '',
  addressDesa: '',
  addressKecamatan: '',
  addressKabupaten: '',
  addressDetail: '',
  phoneNumber: '',
};

const initialAdditionalRegistrantState: AdditionalRegistrantData = {
  fullName: '',
  nik: '',
  gender: '',
  placeOfBirth: '',
  dateOfBirth: '',
  relationship: '',
};

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const RELATIONSHIP_OPTIONS: AdditionalRegistrantData['relationship'][] = [
  'Suami', 'Istri', 'Ayah', 'Ibu', 'Anak', 'Adik', 'Kakak', 'Saudara', 'Sahabat', 'Ponakan', 'Kakek', 'Nenek'
];

const USD_TO_IDR_RATE = 15700; // Mock exchange rate

const HAJJ_PACKAGES_INFO = {
  Regular: {
    description: "Kuota Haji resmi dari pemerintah RI (Kementerian Agama RI).",
    porsiFee: 25000000,
    adminFee: 1000000,
    estimatedDeparture: "25-30 Tahun",
  },
  Plus: {
    description: "Diselenggarakan oleh Penyelenggara Ibadah Haji Khusus (PIHK) dengan kuota resmi pemerintah. Fasilitas lebih lengkap (penginapan dekat Masjidil Haram, hotel berbintang, bimbingan ibadah intensif, transportasi nyaman).",
    waitingTime: "Sekitar 5-9 Tahun",
    downPaymentUSD: 5000,
  },
  Furoda: {
    description: "Program haji di luar kuota reguler, menggunakan visa mujamalah (undangan khusus pemerintah Arab Saudi). Berangkat langsung pada tahun yang sama (non-kuota/tanpa antre).",
    downPaymentUSD: 10000,
  },
  Dakhili: {
    description: "Jalur haji bagi warga negara Saudi Arabia atau penduduk yang tinggal di Saudi (memiliki IQAMAH).",
    initialFeeUSD: 5000,
    savingsInitialFeeUSD: 1000,
  }
};


const calculateAge = (dobString: string): string => {
  if (!dobString) return '';
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? `${age} Tahun` : '';
};

const formatCurrency = (amount: number, currency: 'IDR' | 'USD' = 'IDR'): string => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const RegistrationPage: React.FC = () => {
  const [registrationType, setRegistrationType] = useState<RegistrationType>('Umrah');
  const [primaryRegistrant, setPrimaryRegistrant] = useState<RegistrantData>(initialPrimaryRegistrantState);
  const [plannedDepartureMonth, setPlannedDepartureMonth] = useState<string>(''); // For Umrah
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [additionalRegistrants, setAdditionalRegistrants] = useState<AdditionalRegistrantData[]>([]);

  const [primaryAge, setPrimaryAge] = useState<string>('');
  const [additionalAges, setAdditionalAges] = useState<string[]>([]);

  const [hajjPackageType, setHajjPackageType] = useState<HajjPackageType>('Regular');
  const [dakhiliSavingsOption, setDakhiliSavingsOption] = useState<boolean>(false);
  const [hajjCalculatedCost, setHajjCalculatedCost] = useState<number>(0);


  useEffect(() => {
    setPrimaryAge(calculateAge(primaryRegistrant.dateOfBirth));
  }, [primaryRegistrant.dateOfBirth]);

  useEffect(() => {
    setAdditionalAges(additionalRegistrants.map(ar => calculateAge(ar.dateOfBirth)));
  }, [additionalRegistrants]);
  
  useEffect(() => {
    if (registrationType === 'Haji') {
      let totalCost = 0;
      const numPeople = numberOfPeople;
      switch (hajjPackageType) {
        case 'Regular':
          totalCost = (HAJJ_PACKAGES_INFO.Regular.porsiFee + HAJJ_PACKAGES_INFO.Regular.adminFee) * numPeople;
          break;
        case 'Plus':
          totalCost = HAJJ_PACKAGES_INFO.Plus.downPaymentUSD * USD_TO_IDR_RATE * numPeople;
          break;
        case 'Furoda':
          totalCost = HAJJ_PACKAGES_INFO.Furoda.downPaymentUSD * USD_TO_IDR_RATE * numPeople;
          break;
        case 'Dakhili':
          const feeUSD = dakhiliSavingsOption ? HAJJ_PACKAGES_INFO.Dakhili.savingsInitialFeeUSD : HAJJ_PACKAGES_INFO.Dakhili.initialFeeUSD;
          totalCost = feeUSD * USD_TO_IDR_RATE * numPeople;
          break;
      }
      setHajjCalculatedCost(totalCost);
    }
  }, [registrationType, hajjPackageType, numberOfPeople, dakhiliSavingsOption]);


  const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrimaryRegistrant(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePrimaryRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrimaryRegistrant(prev => ({ ...prev, [name]: value as RegistrantData['gender'] }));
  };

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    setNumberOfPeople(count);
    const currentAdditionalCount = additionalRegistrants.length;
    if (count -1 > currentAdditionalCount) {
        const newEntries = Array(count - 1 - currentAdditionalCount).fill(null).map(() => ({...initialAdditionalRegistrantState}));
        setAdditionalRegistrants(prev => [...prev, ...newEntries]);
    } else if (count -1 < currentAdditionalCount) {
        setAdditionalRegistrants(prev => prev.slice(0, count-1));
    }
  };

  const handleAdditionalChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdditionalRegistrants(prev => 
      prev.map((item, i) => i === index ? { ...item, [name]: value } : item)
    );
  };
  
  const handleAdditionalRadioChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdditionalRegistrants(prev => 
      prev.map((item, i) => i === index ? { ...item, [name]: value as AdditionalRegistrantData['gender'] } : item)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!primaryRegistrant.fullName || !primaryRegistrant.nik || !primaryRegistrant.phoneNumber) {
        alert("Nama Lengkap, NIK, dan Nomor Telepon Pendaftar Utama wajib diisi!");
        return;
    }

    const whatsAppNumber = "628158881884"; 
    let message = `Assalamualaikum Wr. Wb. Tim BBA Indonesia,\n\nSaya (${primaryRegistrant.fullName}) ingin mendaftar untuk program ${registrationType} dengan detail sebagai berikut:\n\n`;
    
    message += `*DATA PENDAFTAR UTAMA*\n`;
    message += `-----------------------------------\n`;
    message += `Nama Lengkap: ${primaryRegistrant.fullName}\n`;
    message += `NIK: ${primaryRegistrant.nik}\n`;
    message += `Nomor Telepon: ${primaryRegistrant.phoneNumber}\n`;
    message += `Jenis Kelamin: ${primaryRegistrant.gender}\n`;
    message += `Tempat Lahir: ${primaryRegistrant.placeOfBirth}\n`;
    message += `Tanggal Lahir: ${primaryRegistrant.dateOfBirth} (Usia: ${primaryAge})\n`;
    message += `Alamat Lengkap:\n`;
    message += `  Desa/Kelurahan: ${primaryRegistrant.addressDesa}\n`;
    message += `  Kecamatan: ${primaryRegistrant.addressKecamatan}\n`;
    message += `  Kabupaten/Kota: ${primaryRegistrant.addressKabupaten}\n`;
    message += `  Detail Alamat: ${primaryRegistrant.addressDetail}\n\n`;

    message += `*RENCANA JUMLAH JEMAAH*: ${numberOfPeople} orang\n\n`;

    if (registrationType === 'Umrah') {
      message += `*RENCANA PERJALANAN UMRAH*\n`;
      message += `-----------------------------------\n`;
      message += `Rencana Bulan Keberangkatan: ${plannedDepartureMonth}\n\n`;
    } else if (registrationType === 'Haji') {
      message += `*DETAIL PENDAFTARAN HAJI*\n`;
      message += `-----------------------------------\n`;
      message += `Pilihan Paket Haji: ${hajjPackageType}\n`;
      
      const selectedPackageInfo = HAJJ_PACKAGES_INFO[hajjPackageType as Exclude<HajjPackageType, ''>];
      if (selectedPackageInfo) {
        message += `Deskripsi Paket: ${selectedPackageInfo.description}\n`;
        if ('porsiFee' in selectedPackageInfo) message += `Biaya Porsi: ${formatCurrency(selectedPackageInfo.porsiFee)}/orang\n`;
        if ('adminFee' in selectedPackageInfo) message += `Biaya Administrasi: ${formatCurrency(selectedPackageInfo.adminFee)}/orang\n`;
        if ('estimatedDeparture' in selectedPackageInfo) message += `Estimasi Keberangkatan: ${selectedPackageInfo.estimatedDeparture}\n`;
        if ('waitingTime' in selectedPackageInfo) message += `Waktu Tunggu: ${selectedPackageInfo.waitingTime}\n`;
        if ('downPaymentUSD' in selectedPackageInfo) message += `Uang Muka (DP): ${formatCurrency(selectedPackageInfo.downPaymentUSD, 'USD')} (Kurs ${formatCurrency(USD_TO_IDR_RATE)}/USD)\n`;
        if (hajjPackageType === 'Dakhili') {
          const feeUSD = dakhiliSavingsOption ? HAJJ_PACKAGES_INFO.Dakhili.savingsInitialFeeUSD : HAJJ_PACKAGES_INFO.Dakhili.initialFeeUSD;
          message += `Biaya Awal: ${formatCurrency(feeUSD, 'USD')}\n`;
          if (dakhiliSavingsOption) message += `(Dipilih Opsi Tabungan dengan Saldo Awal)\n`;
        }
      }
      message += `Total Estimasi Biaya Keseluruhan: ${formatCurrency(hajjCalculatedCost)}\n\n`;
    }

    if (additionalRegistrants.length > 0) {
      message += `*DATA JEMAAH TAMBAHAN*\n`;
      message += `-----------------------------------\n`;
      additionalRegistrants.forEach((ar, index) => {
        message += `\n*Jemaah Ke-${index + 2}:*\n`;
        message += `Nama Lengkap: ${ar.fullName}\n`;
        message += `NIK: ${ar.nik}\n`;
        message += `Jenis Kelamin: ${ar.gender}\n`;
        message += `Tempat Lahir: ${ar.placeOfBirth}\n`;
        message += `Tanggal Lahir: ${ar.dateOfBirth} (Usia: ${additionalAges[index]})\n`;
        message += `Hubungan dengan Pendaftar Pertama: ${ar.relationship}\n`;
      });
      message += `\n`;
    }

    message += `Mohon informasi dan tindak lanjutnya mengenai pendaftaran ini.\n\n`;
    message += `Terima kasih atas perhatiannya.\n\n`;
    message += `Hormat Saya,\n${primaryRegistrant.fullName}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    alert("Anda akan diarahkan ke WhatsApp untuk mengirim detail pendaftaran. Pastikan Anda telah mengirim pesan tersebut. Jika halaman WhatsApp tidak terbuka, mohon periksa pengaturan pop-up blocker pada browser Anda atau coba salin pesan secara manual.");
  };
  
  const ageDisplayClasses = "form-input text-theme-text-muted min-h-[42px] sm:min-h-[48px] flex items-center bg-theme-interactive/70 opacity-80"; 

  const renderTextField = (
    label: string, name: string, value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
    type: string = "text", required: boolean = true,
    pattern?: string, title?: string, placeholder?: string, extraProps?: Record<string, any>
  ) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-theme-text mb-1.5">{label}{required && <span className="text-red-400">*</span>}</label>
      {type === "textarea" ? (
        <textarea
          id={name} name={name} value={value} onChange={onChange} required={required}
          className="form-textarea w-full min-h-[80px] text-sm"
          rows={3} placeholder={placeholder || label} {...extraProps}
        />
      ) : (
        <input
          type={type} id={name} name={name} value={value} onChange={onChange} required={required} pattern={pattern} title={title}
          className="form-input w-full text-sm"
          placeholder={placeholder || label} {...extraProps}
        />
      )}
    </div>
  );

  const renderSelectField = (
    label: string, name: string, value: string | number, 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
    options: {value: string | number, label: string}[], required: boolean = true, extraProps?: Record<string, any>
  ) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-theme-text mb-1.5">{label}{required && <span className="text-red-400">*</span>}</label>
      <select
        id={name} name={name} value={value} onChange={onChange} required={required}
        className="form-select w-full text-sm appearance-none bg-arrow" 
        {...extraProps}
      >
        <option value="" className="text-theme-text-muted bg-theme-interactive">Pilih {label.toLowerCase()}</option>
        {options.map(opt => <option key={opt.value} value={opt.value} className="bg-theme-interactive text-theme-text">{opt.label}</option>)}
      </select>
    </div>
  );

  const renderRadioGroup = (
    label: string, name: string, value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    options: {value: string, label: string}[], required: boolean = true,
    layout: 'horizontal' | 'vertical' = 'horizontal'
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-theme-text mb-1.5">{label}{required && <span className="text-red-400">*</span>}</label>
      <div className={`flex ${layout === 'horizontal' ? 'flex-wrap gap-x-6 gap-y-2' : 'flex-col space-y-2'}`}>
        {options.map(opt => (
          <label key={opt.value} className="flex items-center space-x-2 text-theme-text cursor-pointer">
            <input
              type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={onChange} required={required}
              className="form-radio"
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
  
  const renderNIKField = (
    label: string, name: string, value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required: boolean = true
  ) => (
    <div className="mb-4">
      {renderTextField(label, name, value, onChange as (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, "text", required, "\\d{16}", "NIK harus terdiri dari 16 digit angka.", "Contoh: 320101XXXXXXXXXX", {maxLength: 16})}
      <p className="text-xs text-theme-text-muted mt-1">Pastikan NIK valid (16 digit angka). Validasi lebih lanjut akan dilakukan oleh tim kami.</p>
    </div>
  );

  const renderRegistrantForm = (
    data: RegistrantData | AdditionalRegistrantData, 
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isAdditional: boolean, 
    age?: string,
    relationshipOptions?: AdditionalRegistrantData['relationship'][]
  ) => (
    <>
      {renderTextField("Nama Lengkap", "fullName", data.fullName, handleChange)}
      {renderNIKField("Nomor Induk Kependudukan (NIK)", "nik", data.nik, handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void)}
      {!isAdditional && 'phoneNumber' in data && renderTextField("Nomor Telepon (WhatsApp Aktif)", "phoneNumber", data.phoneNumber, handleChange, "tel", true, undefined, "Format: 08xxxxxxxxxx")}
      {renderRadioGroup("Jenis Kelamin", "gender", data.gender, handleRadioChange, [{value: 'Laki-laki', label: 'Laki-laki'}, {value: 'Perempuan', label: 'Perempuan'}])}
      {renderTextField("Tempat Lahir", "placeOfBirth", data.placeOfBirth, handleChange)}
      {renderTextField("Tanggal Lahir", "dateOfBirth", data.dateOfBirth, handleChange, "date")}
      <div className="mb-4">
        <label className="block text-sm font-medium text-theme-text mb-1.5">Usia Saat Ini</label>
        <p className={ageDisplayClasses}>
          {age || (data.dateOfBirth ? 'Menghitung...' : 'Isi tanggal lahir')}
        </p>
      </div>

      {!isAdditional && 'addressDesa' in data && (
        <>
          <h4 className="text-lg font-semibold text-theme-accent mb-3 mt-5 text-glow-accent">Alamat Lengkap (Sesuai KTP)</h4>
          {renderTextField("Desa/Kelurahan", "addressDesa", data.addressDesa, handleChange)}
          {renderTextField("Kecamatan", "addressKecamatan", data.addressKecamatan, handleChange)}
          {renderTextField("Kabupaten/Kota", "addressKabupaten", data.addressKabupaten, handleChange)}
          {renderTextField("Detail Alamat (Nama Jalan, RT/RW, No Rumah, dll)", "addressDetail", data.addressDetail, handleChange, "textarea", true, undefined, "Contoh: Jl. Merdeka No. 10, RT 01 RW 05, Kp. Bahagia")}
        </>
      )}
      {isAdditional && 'relationship' in data && relationshipOptions && (
         renderSelectField("Hubungan dengan Pendaftar Utama", "relationship", data.relationship, handleChange as (e: React.ChangeEvent<HTMLSelectElement>) => void, relationshipOptions.map(r => ({value: r, label: r})))
      )}
    </>
  );

  const sectionClasses = "bg-theme-widget-bg p-5 sm:p-6 rounded-xl shadow-hologram-soft border border-[var(--color-theme-widget-border-hologram)] hover:shadow-hologram-intense transition-shadow duration-300";

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-theme-accent text-center mb-6 page-title-glow">Formulir Pendaftaran Online</h2>

      <section className={`${sectionClasses} mb-8`}>
        <h3 className="text-xl font-semibold text-theme-accent mb-4 text-glow-accent-strong">Pilihan Pendaftaran</h3>
        {renderRadioGroup("Saya ingin mendaftar untuk:", "registrationType", registrationType, 
          (e) => setRegistrationType(e.target.value as RegistrationType),
          [
            {value: 'Umrah', label: 'Umrah'},
            {value: 'Haji', label: 'Haji'},
            {value: 'Tabungan', label: 'Program Tabungan'},
          ], 
          true, 'vertical'
        )}
      </section>

      {registrationType === 'Tabungan' && (
        <section className={`${sectionClasses} text-center`}>
          <h3 className="text-xl font-semibold text-theme-accent mb-4 text-glow-accent-strong">Program Tabungan</h3>
          <p className="text-theme-text-muted">
            Fitur pendaftaran Program Tabungan akan segera hadir. 
            <br/>Untuk saat ini, silakan hubungi Customer Service kami melalui <Link to="/" className="text-theme-accent hover:text-theme-accent-hover hover:underline">Chat dengan Abun</Link> atau langsung ke nomor WhatsApp BBA Indonesia untuk informasi lebih lanjut.
          </p>
        </section>
      )}

      {(registrationType === 'Umrah' || registrationType === 'Haji') && (
        <form onSubmit={handleSubmit} className="space-y-8">
          <section className={sectionClasses}>
            <h3 className="text-xl font-semibold text-theme-accent mb-6 border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-3 text-glow-accent-strong">Data Pendaftar Utama</h3>
            {renderRegistrantForm(primaryRegistrant, handlePrimaryChange, handlePrimaryRadioChange, false, primaryAge)}
          </section>

          <section className={sectionClasses}>
            <h3 className="text-xl font-semibold text-theme-accent mb-6 border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-3 text-glow-accent-strong">Rencana Jumlah Jemaah</h3>
            {renderSelectField("Total Jumlah Yang Akan Berangkat (Termasuk Pendaftar Utama)", "numberOfPeople", numberOfPeople, handleNumberOfPeopleChange, 
              Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: `${i + 1} Orang` }))
            )}
          </section>

          {registrationType === 'Umrah' && (
            <section className={sectionClasses}>
              <h3 className="text-xl font-semibold text-theme-accent mb-6 border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-3 text-glow-accent-strong">Rencana Perjalanan Umrah</h3>
              {renderSelectField("Rencana Keberangkatan (Bulan)", "plannedDepartureMonth", plannedDepartureMonth, (e) => setPlannedDepartureMonth(e.target.value), MONTHS.map(m => ({ value: m, label: m })))}
            </section>
          )}

          {registrationType === 'Haji' && (
            <section className={sectionClasses}>
              <h3 className="text-xl font-semibold text-theme-accent mb-6 border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-3 text-glow-accent-strong">Pilihan Paket Haji</h3>
              {renderRadioGroup("Pilih Paket Haji:", "hajjPackageType", hajjPackageType, 
                (e) => setHajjPackageType(e.target.value as HajjPackageType),
                [
                  {value: 'Regular', label: 'Reguler'},
                  {value: 'Plus', label: 'Plus (PIHK)'},
                  {value: 'Furoda', label: 'Furoda (Visa Mujamalah)'},
                  {value: 'Dakhili', label: 'Dakhili (Warga/Penduduk Saudi)'},
                ],
                true, 'vertical'
              )}

              {hajjPackageType && (
                <div className="mt-4 p-4 border border-[var(--color-theme-widget-border-hologram)]/70 rounded-md bg-theme-bg"> 
                  <h4 className="text-lg font-medium text-theme-accent mb-2 text-glow-accent">{`Detail Paket ${hajjPackageType}`}</h4>
                  <p className="text-sm text-theme-text-muted whitespace-pre-line mb-2">{HAJJ_PACKAGES_INFO[hajjPackageType].description}</p>
                  {hajjPackageType === 'Regular' && (
                    <>
                      <p className="text-sm text-theme-text-muted">Biaya Porsi: <span className="font-semibold text-theme-accent">{formatCurrency(HAJJ_PACKAGES_INFO.Regular.porsiFee)}</span> /orang</p>
                      <p className="text-sm text-theme-text-muted">Biaya Administrasi: <span className="font-semibold text-theme-accent">{formatCurrency(HAJJ_PACKAGES_INFO.Regular.adminFee)}</span> /orang</p>
                      <p className="text-sm text-theme-text-muted">Estimasi Keberangkatan: <span className="font-semibold text-theme-text">{HAJJ_PACKAGES_INFO.Regular.estimatedDeparture}</span></p>
                    </>
                  )}
                  {hajjPackageType === 'Plus' && (
                    <>
                      <p className="text-sm text-theme-text-muted">Uang Muka (DP): <span className="font-semibold text-theme-accent">{formatCurrency(HAJJ_PACKAGES_INFO.Plus.downPaymentUSD, 'USD')}</span> /orang</p>
                      <p className="text-xs text-theme-text-muted">(Estimasi Rupiah: {formatCurrency(HAJJ_PACKAGES_INFO.Plus.downPaymentUSD * USD_TO_IDR_RATE)} dengan kurs {formatCurrency(USD_TO_IDR_RATE)}/USD)</p>
                      <p className="text-sm text-theme-text-muted">Waktu Tunggu: <span className="font-semibold text-theme-text">{HAJJ_PACKAGES_INFO.Plus.waitingTime}</span></p>
                    </>
                  )}
                  {hajjPackageType === 'Furoda' && (
                     <>
                      <p className="text-sm text-theme-text-muted">Uang Muka (DP): <span className="font-semibold text-theme-accent">{formatCurrency(HAJJ_PACKAGES_INFO.Furoda.downPaymentUSD, 'USD')}</span> /orang</p>
                      <p className="text-xs text-theme-text-muted">(Estimasi Rupiah: {formatCurrency(HAJJ_PACKAGES_INFO.Furoda.downPaymentUSD * USD_TO_IDR_RATE)} dengan kurs {formatCurrency(USD_TO_IDR_RATE)}/USD)</p>
                    </>
                  )}
                  {hajjPackageType === 'Dakhili' && (
                    <>
                      <p className="text-sm text-theme-text-muted">Biaya Awal: <span className="font-semibold text-theme-accent">{formatCurrency(HAJJ_PACKAGES_INFO.Dakhili.initialFeeUSD, 'USD')}</span> /orang</p>
                       <label className="flex items-center space-x-2 mt-2 text-theme-text-muted cursor-pointer">
                        <input
                          type="checkbox"
                          checked={dakhiliSavingsOption}
                          onChange={(e) => setDakhiliSavingsOption(e.target.checked)}
                          className="form-checkbox"
                        />
                        <span className="text-sm">Pilih Opsi Tabungan (Saldo Awal <span className="font-semibold text-theme-accent">{formatCurrency(HAJJ_PACKAGES_INFO.Dakhili.savingsInitialFeeUSD, 'USD')}</span>)</span>
                      </label>
                      <p className="text-xs text-theme-text-muted mt-1">(Estimasi Rupiah: {formatCurrency((dakhiliSavingsOption ? HAJJ_PACKAGES_INFO.Dakhili.savingsInitialFeeUSD : HAJJ_PACKAGES_INFO.Dakhili.initialFeeUSD) * USD_TO_IDR_RATE)} dengan kurs {formatCurrency(USD_TO_IDR_RATE)}/USD)</p>
                    </>
                  )}
                  <p className="text-md font-bold text-theme-accent mt-3 pt-3 border-t border-[var(--color-theme-widget-border-hologram)]/70">
                    Total Estimasi Biaya ({numberOfPeople} Orang): {formatCurrency(hajjCalculatedCost)}
                  </p>
                  <p className="text-xs text-theme-text-muted mt-1">Ini adalah estimasi biaya awal. Biaya akhir akan dikonfirmasi oleh tim BBA Indonesia.</p>
                </div>
              )}
            </section>
          )}

          {numberOfPeople > 1 && additionalRegistrants.map((ar, index) => (
            <section key={index} className={`${sectionClasses} animate-fade-in`}>
              <h3 className="text-xl font-semibold text-theme-accent mb-6 border-b border-[var(--color-theme-widget-border-hologram)]/70 pb-3 text-glow-accent-strong">Data Jemaah Tambahan Ke-{index + 2}</h3>
              {renderRegistrantForm(
                ar, 
                (e) => handleAdditionalChange(index, e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>), 
                (e) => handleAdditionalRadioChange(index, e as React.ChangeEvent<HTMLInputElement>),
                true,
                additionalAges[index],
                RELATIONSHIP_OPTIONS
              )}
            </section>
          ))}
          
          <div className="mt-8 text-center">
            <button 
              type="submit"
              className="bg-theme-accent hover:bg-theme-accent-hover text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-glow-accent-strong transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-75 focus:shadow-glow-accent-strong"
            >
              Daftar Sekarang via WhatsApp
            </button>
            <p className="text-xs text-theme-text-muted mt-4 leading-relaxed">
              Dengan mengeklik tombol di atas, detail pendaftaran Anda akan diformat untuk dikirim melalui WhatsApp ke nomor resmi BBA Indonesia.
              <br />Anda akan diarahkan ke aplikasi WhatsApp untuk mengirimkan pesan. Pastikan WhatsApp sudah terinstal.
              <br />Anda juga menyetujui <Link to="/terms" className="text-theme-accent hover:text-theme-accent-hover hover:underline">Syarat & Ketentuan</Link> yang berlaku.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationPage;
