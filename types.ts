

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'abun';
  timestamp: Date;
  avatar?: string;
  isTyping?: boolean;
}

export enum AbunPersona {
  DEFAULT = 'default',
  SUNDA = 'sunda',
}

export interface UmrahPackage {
  id:string;
  name: string;
  price: string;
  description: string;
  facilities: string[];
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string; // This might be dynamically generated by Abun too
}

export interface BBALegalityInfo {
  ppiuPermit: string;
  accreditation: string;
  bankAccount: string;
}

export interface BBACompanyProfile {
  name: string;
  skMenteri: string;
  principle: string;
  motto: string;
  vision: string;
  mission: string[];
  reasonsToChoose: string[];
  address: string;
  contact: string;
  officialWebsites: string[];
  androidAppLink: string;
}

export interface BBASavingsProgram {
  type: 'Regular' | 'Ujrah';
  title: string; // Added title as it's used in bbaDataService.ts
  description: string;
  terms: string[];
  minInitialDepositUjrah?: string; // Only for Ujrah
  contractPeriodUjrah?: string; // Only for Ujrah
}

export interface AbunAcquaintance {
  name: string;
  relation: string;
  description?: string;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web?: GroundingChunkWeb;
  retrievedContext?: {
    retrievalQuery: string;
    retrievedContent: string;
  };
}

// For frame.ai actions
export interface FrameActionPayload {
  action: "maps_local.query_places" | "maps_navigation.navigate"; // Updated from maps_local.search
  params: Record<string, any>; // e.g., { query: "..." } or { origin: "...", destination: "...", travelMode: "..." }
}

export interface AbunResponse {
  text: string;
  groundingSources?: GroundingChunk[];
  frameAction?: FrameActionPayload;
}

// Quran Widget Types from api.alquran.cloud
export interface ApiAyah {
  number: number; // Overall Ayah number in Quran
  text: string; // Arabic text or translation text
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | Record<string, any>; // API might return object for Sajda details
}

export interface ApiSurah {
  number: number;
  name: string; // Arabic name: "سُورَةُ ٱلْفَاتِحَةِ"
  englishName: string; // Latin name: "Al-Faatiha"
  englishNameTranslation: string; // Translation of name: "The Opening"
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan'; // API uses 'Meccan' or 'Medinan'
}

export interface QuranEdition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string; // e.g., "translation", "quran", "tafsir"
  direction: 'ltr' | 'rtl';
}

export interface QuranEditionResponse { // Used for Surah with Ayahs (Quran or Translation)
  number: number; // Surah number
  name: string; // Surah Arabic name
  englishName: string; // Surah English name
  englishNameTranslation: string; // Surah English name translation
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: ApiAyah[];
  edition: QuranEdition;
}

export interface CombinedAyah {
  id: number; // Overall Ayah number in Quran, used as key
  numberInSurah: number;
  arabicText: string;
  translation: string;
  tafsir?: string; // Optional: To be filled when tafsir is fetched
}

// Illustrative Tajwid Types (remains client-side interpretation)
export type TajwidRule = 'ghunnah' | 'ikhfa' | 'idgham' | 'iqlab' | 'qalqalah' | 'mad_normal' | 'mad_jaiz_munfasil' | 'mad_wajib_muttasil' | 'mad_arid_lissukun';

export interface TajwidSpan {
  text: string;
  rule: TajwidRule;
}
export type AyahTextPart = string | TajwidSpan; // Used by illustrative tajwid rendering

// Doa Dzikir Widget Types - Updated to match new API structure
export interface DoaListItem {
  id: number;       // API returns number
  judul: string;    // API returns 'judul' for title
  latin: string;
  arab: string;     // API returns 'arab' for Arabic text
  terjemah: string; // API returns 'terjemah' for translation
}

// DoaDetail is now the same as DoaListItem since the list API returns all data
export type DoaDetail = DoaListItem;


// Tafsir Types for Quran Widget
export interface ApiTafsirAyah { // Structure for a single ayah's tafsir
    number: number; // Overall Ayah number in Quran
    text: string; // Tafsir text for this Ayah
    edition: QuranEdition; // Information about the tafsir edition
}

export interface TafsirResponse { // Structure for the API response when fetching tafsir for a single Ayah
    code: number;
    status: string;
    data: ApiTafsirAyah;
}

// Attendance System Types
export interface Employee {
  code: string;
  name: string;
  // position?: string; // Optional: Add if needed elsewhere
}

export enum AttendanceType {
  CLOCK_IN = 'Masuk Kerja',
  CLOCK_OUT = 'Pulang Kerja',
}

export interface AttendanceRecord {
  id: string;
  employeeCode: string;
  employeeName: string;
  type: AttendanceType;
  timestamp: string; // ISO string
  location?: {
    latitude: number;
    longitude: number;
  };
  locationError?: string;
}

export enum LeaveType {
  CUTI = 'Cuti Tahunan',
  IZIN = 'Izin Sakit/Penting Lainnya',
  // Example: SAKIT = 'Sakit (dengan surat dokter)'
}

export interface LeaveRequest {
  id: string;
  employeeCode: string;
  employeeName: string;
  type: LeaveType;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestTimestamp: string; // ISO string
  // Optional: Add approval details if needed for display
  // approvedBy?: string;
  // approvalTimestamp?: string;
}

// Glossary Widget Types
export interface GlossaryItem {
  id: string;
  term: string;
  arabicTerm?: string;
  definition: string;
}

// Islamic Calendar Widget Types
export interface IslamicHoliday {
  name: string;
  hijriDate: string; // e.g., "1 Shawwal"
  gregorianEstimate: string; // e.g., "10 April 2024" (can be a range or note)
  description?: string;
}

// Zakat Calculator Types
export type ZakatType = 'maal' | 'penghasilan' | 'fitrah';

export interface ZakatMaalInputs {
  currentGoldPricePerGram: number; // e.g., 1000000
  totalWealth: number; // Gold, Silver, Cash, Receivables, Trade Goods
}
export interface ZakatPenghasilanInputs {
  monthlyNetIncome: number;
  currentGoldPricePerGram: number; // For nisab calculation
}
export interface ZakatFitrahInputs {
  stapleFoodPricePerKg: number; // e.g., 15000 for rice
  numberOfPeople: number;
}

export const NISAB_GOLD_GRAMS = 85;
export const ZAKAT_RATE = 0.025; // 2.5%
export const FITRAH_STAPLE_KG = 2.5; // common standard, can also be 2.7 or 3kg
