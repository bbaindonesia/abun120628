
import React, { useState, useMemo } from 'react';
import { ZakatType, ZakatMaalInputs, ZakatPenghasilanInputs, ZakatFitrahInputs, NISAB_GOLD_GRAMS, ZAKAT_RATE, FITRAH_STAPLE_KG } from '../types';
import LoadingSpinner from './LoadingSpinner'; // Assuming this exists for potential future use

const formatCurrency = (amount: number, currency: 'IDR' | 'USD' = 'IDR'): string => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const ZakatCalculatorWidget: React.FC = () => {
  const [activeZakatType, setActiveZakatType] = useState<ZakatType>('maal');
  
  const [maalInputs, setMaalInputs] = useState<ZakatMaalInputs>({ currentGoldPricePerGram: 1000000, totalWealth: 0 });
  const [penghasilanInputs, setPenghasilanInputs] = useState<ZakatPenghasilanInputs>({ monthlyNetIncome: 0, currentGoldPricePerGram: 1000000 });
  const [fitrahInputs, setFitrahInputs] = useState<ZakatFitrahInputs>({ stapleFoodPricePerKg: 15000, numberOfPeople: 1 });

  const [zakatMaalResult, setZakatMaalResult] = useState<string | null>(null);
  const [zakatPenghasilanResult, setZakatPenghasilanResult] = useState<string | null>(null);
  const [zakatFitrahResult, setZakatFitrahResult] = useState<string | null>(null);

  const nisabMaal = useMemo(() => NISAB_GOLD_GRAMS * maalInputs.currentGoldPricePerGram, [maalInputs.currentGoldPricePerGram]);
  const nisabPenghasilanAnnual = useMemo(() => NISAB_GOLD_GRAMS * penghasilanInputs.currentGoldPricePerGram, [penghasilanInputs.currentGoldPricePerGram]);
  const nisabPenghasilanMonthly = useMemo(() => nisabPenghasilanAnnual / 12, [nisabPenghasilanAnnual]);

  const handleInputChange = (type: ZakatType, field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (type === 'maal') {
      setMaalInputs(prev => ({ ...prev, [field]: numValue }));
    } else if (type === 'penghasilan') {
      setPenghasilanInputs(prev => ({ ...prev, [field]: numValue }));
    } else if (type === 'fitrah') {
      setFitrahInputs(prev => ({ ...prev, [field]: Math.max(0, Math.round(numValue)) })); // Ensure numberOfPeople is integer and non-negative
    }
  };

  const calculateZakat = () => {
    if (activeZakatType === 'maal') {
      if (maalInputs.totalWealth >= nisabMaal) {
        const zakatAmount = maalInputs.totalWealth * ZAKAT_RATE;
        setZakatMaalResult(`Wajib Zakat Maal: ${formatCurrency(zakatAmount)}`);
      } else {
        setZakatMaalResult(`Total harta Anda (${formatCurrency(maalInputs.totalWealth)}) belum mencapai nisab (${formatCurrency(nisabMaal)}). Belum wajib zakat maal.`);
      }
    } else if (activeZakatType === 'penghasilan') {
      if (penghasilanInputs.monthlyNetIncome >= nisabPenghasilanMonthly) {
        const zakatAmount = penghasilanInputs.monthlyNetIncome * ZAKAT_RATE;
        setZakatPenghasilanResult(`Wajib Zakat Penghasilan Bulanan: ${formatCurrency(zakatAmount)}`);
      } else {
        setZakatPenghasilanResult(`Penghasilan bulanan Anda (${formatCurrency(penghasilanInputs.monthlyNetIncome)}) belum mencapai nisab bulanan (${formatCurrency(nisabPenghasilanMonthly)}).`);
      }
    } else if (activeZakatType === 'fitrah') {
      if (fitrahInputs.numberOfPeople > 0 && fitrahInputs.stapleFoodPricePerKg > 0) {
        const zakatAmount = fitrahInputs.numberOfPeople * FITRAH_STAPLE_KG * fitrahInputs.stapleFoodPricePerKg;
        setZakatFitrahResult(`Total Zakat Fitrah: ${formatCurrency(zakatAmount)} (untuk ${fitrahInputs.numberOfPeople} jiwa)`);
      } else {
        setZakatFitrahResult("Mohon isi harga makanan pokok dan jumlah jiwa dengan benar.");
      }
    }
  };
  
  const tabButtonBaseClass = "flex-1 py-2.5 sm:py-3 px-1 text-xs sm:text-sm font-medium focus:outline-none transition-all duration-200";
  const activeTabClass = "border-b-2 border-theme-accent text-theme-accent bg-theme-interactive/60 shadow-inner";
  const inactiveTabClass = "text-theme-text-muted hover:text-theme-text hover:bg-theme-interactive/40 border-b-2 border-transparent hover:border-theme-accent/60";

  const renderInputField = (label: string, id: string, value: number, onChange: (val: string) => void, placeholder?: string, helpText?: string, unit?: string, type: string = "number") => (
    <div className="mb-3">
      <label htmlFor={id} className="block text-xs font-medium text-theme-text-muted mb-1">{label}:</label>
      <div className="flex items-center">
        {unit === 'Rp' && <span className="text-theme-text bg-theme-interactive/50 p-2.5 rounded-l-md border border-r-0 border-[var(--color-theme-widget-border-hologram)]">{unit}</span>}
        <input
          type={type}
          id={id}
          value={value === 0 && type==="number" ? '' : value.toString()} // Show empty for 0 to allow easy input
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`form-input w-full text-sm ${unit === 'Rp' ? 'rounded-l-none' : ''} ${unit === 'Jiwa' || unit === 'Gram' || unit === 'Kg' ? 'rounded-r-none' : ''}`}
          min="0"
          step={type === "number" && (id.includes("GoldPrice") || id.includes("Wealth") || id.includes("Income") || id.includes("stapleFood")) ? "1000" : "1"}
        />
        {(unit && unit !== 'Rp') && <span className="text-theme-text bg-theme-interactive/50 p-2.5 rounded-r-md border border-l-0 border-[var(--color-theme-widget-border-hologram)]">{unit}</span>}
      </div>
      {helpText && <p className="text-xs text-theme-text-muted opacity-80 mt-1">{helpText}</p>}
    </div>
  );

  return (
    <div className="p-1 sm:p-2 space-y-3 text-sm">
      <div className="flex border-b border-[var(--color-theme-widget-border-hologram)] mb-3 bg-theme-widget-bg rounded-t-lg">
        {(['maal', 'penghasilan', 'fitrah'] as ZakatType[]).map(type => (
          <button
            key={type}
            onClick={() => setActiveZakatType(type)}
            className={`${tabButtonBaseClass} ${activeZakatType === type ? activeTabClass : inactiveTabClass} 
                         ${type === 'maal' ? 'rounded-tl-lg' : ''} 
                         ${type === 'fitrah' ? 'rounded-tr-lg' : ''}`}
            aria-pressed={activeZakatType === type}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-2 bg-theme-widget-bg rounded-b-lg border border-t-0 border-[var(--color-theme-widget-border-hologram)] shadow-hologram-intense">
        {activeZakatType === 'maal' && (
          <div className="animate-fade-in">
            <h4 className="text-md font-semibold text-theme-accent mb-2 text-glow-accent">Zakat Maal (Kekayaan)</h4>
            {renderInputField("Harga Emas Murni Saat Ini", "maalGoldPrice", maalInputs.currentGoldPricePerGram, (val) => handleInputChange('maal', 'currentGoldPricePerGram', val), "Contoh: 1000000", "Harga per gram emas murni (24 karat).", "Rp")}
            {renderInputField("Total Harta Kena Zakat", "maalTotalWealth", maalInputs.totalWealth, (val) => handleInputChange('maal', 'totalWealth', val), "Total emas, perak, uang, tabungan, piutang, aset dagang", "Nilai total harta yang telah dimiliki selama satu tahun haul.", "Rp")}
            <p className="text-xs text-theme-text-muted my-2">Nisab (batas minimal): {NISAB_GOLD_GRAMS} gram emas = <span className="font-semibold text-theme-text">{formatCurrency(nisabMaal)}</span> (jika haul terpenuhi).</p>
            <p className="text-xs text-theme-text-muted my-2">Tarif Zakat Maal: {ZAKAT_RATE * 100}%.</p>
            {zakatMaalResult && <p className="mt-3 p-2 bg-theme-interactive/50 text-theme-text rounded-md border border-theme-accent text-xs sm:text-sm">{zakatMaalResult}</p>}
          </div>
        )}

        {activeZakatType === 'penghasilan' && (
          <div className="animate-fade-in">
            <h4 className="text-md font-semibold text-theme-accent mb-2 text-glow-accent">Zakat Penghasilan (Profesi)</h4>
            {renderInputField("Penghasilan Bersih Bulanan", "penghasilanMonthlyIncome", penghasilanInputs.monthlyNetIncome, (val) => handleInputChange('penghasilan', 'monthlyNetIncome', val), "Setelah dikurangi kebutuhan pokok.", undefined, "Rp")}
            {renderInputField("Harga Emas Murni Saat Ini (Nisab)", "penghasilanGoldPrice", penghasilanInputs.currentGoldPricePerGram, (val) => handleInputChange('penghasilan', 'currentGoldPricePerGram', val), "Contoh: 1000000", "Digunakan untuk menghitung nisab.", "Rp")}
            <p className="text-xs text-theme-text-muted my-2">Nisab bulanan (setara 1/12 dari {NISAB_GOLD_GRAMS} gram emas): <span className="font-semibold text-theme-text">{formatCurrency(nisabPenghasilanMonthly)}</span>.</p>
            <p className="text-xs text-theme-text-muted my-2">Tarif Zakat Penghasilan: {ZAKAT_RATE * 100}%.</p>
            {zakatPenghasilanResult && <p className="mt-3 p-2 bg-theme-interactive/50 text-theme-text rounded-md border border-theme-accent text-xs sm:text-sm">{zakatPenghasilanResult}</p>}
          </div>
        )}

        {activeZakatType === 'fitrah' && (
          <div className="animate-fade-in">
            <h4 className="text-md font-semibold text-theme-accent mb-2 text-glow-accent">Zakat Fitrah</h4>
            {renderInputField("Harga Makanan Pokok", "fitrahStapleFoodPrice", fitrahInputs.stapleFoodPricePerKg, (val) => handleInputChange('fitrah', 'stapleFoodPricePerKg', val), "Contoh: 15000 untuk beras", "Harga per kg atau per liter makanan pokok.", "Rp")}
            {renderInputField("Jumlah Jiwa", "fitrahNumberOfPeople", fitrahInputs.numberOfPeople, (val) => handleInputChange('fitrah', 'numberOfPeople', val), "Jumlah orang yang dizakati", undefined, "Jiwa", "number")}
            <p className="text-xs text-theme-text-muted my-2">Besaran per jiwa: {FITRAH_STAPLE_KG} Kg makanan pokok.</p>
            {zakatFitrahResult && <p className="mt-3 p-2 bg-theme-interactive/50 text-theme-text rounded-md border border-theme-accent text-xs sm:text-sm">{zakatFitrahResult}</p>}
          </div>
        )}

        <button 
          onClick={calculateZakat} 
          className="mt-4 w-full bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-glow-accent-strong transition-all duration-200"
        >
          Hitung Zakat
        </button>
      </div>
      
      <div className="mt-3 p-2 border border-dashed border-[var(--color-theme-widget-border-hologram)]/50 rounded-md text-xs text-theme-text-muted bg-theme-widget-bg shadow-hologram-soft leading-relaxed">
        <strong>Penting:</strong>
        <ul className="list-disc list-inside ml-3 mt-1">
          <li>Nilai harga emas yang digunakan untuk nisab adalah contoh dan dapat berubah. Silakan gunakan harga emas terkini yang berlaku di daerah Anda.</li>
          <li>Perhitungan ini bersifat panduan. Untuk informasi dan pelaksanaan zakat yang lebih akurat dan sesuai syariat, disarankan untuk berkonsultasi dengan lembaga amil zakat (LAZ) resmi dan terpercaya.</li>
          <li>Untuk Zakat Maal, pastikan harta telah mencapai haul (tersimpan selama satu tahun hijriyah).</li>
        </ul>
      </div>
    </div>
  );
};

export default ZakatCalculatorWidget;
