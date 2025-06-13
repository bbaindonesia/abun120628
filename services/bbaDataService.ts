
import { 
    BBA_PROFILE, 
    BBA_LEGALITY, 
    ABUN_ACQUAINTANCES,
    BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS,
    BBA_SERVICES_INFO,
    BBA_REGISTRATION_FLOW,
    BBA_DEPARTURE_PAYMENT_TERMS,
    BBA_SAVINGS_PROGRAMS_DETAILED,
    BBA_UMRAH_PACKAGES, // Kept for potential illustrative use if Abun is asked about *types* of packages generally
    BBA_SAVINGS_COMMON_TERMS // Import added
} from '../constants';

const formatTermsSection = (title: string, points: string[]): string => {
    return `\n**${title}**\n${points.map(p => `- ${p}`).join('\n')}`;
};

export const getBBADataContext = () => {
    
    let context = `
=== Informasi Kunci BBA Indonesia ===

**Profil Perusahaan (PT. Bani Bunyamin Attarbiyyah - BBA Indonesia):**
Nama Resmi: ${BBA_PROFILE.name}
SK Menteri Agama RI: ${BBA_PROFILE.skMenteri}
Prinsip: "${BBA_PROFILE.principle}"
Motto: "${BBA_PROFILE.motto}"
Visi: ${BBA_PROFILE.vision}
Misi:
${BBA_PROFILE.mission.map(m => `- ${m}`).join('\n')}
Alasan Memilih BBA Indonesia:
${BBA_PROFILE.reasonsToChoose.map(r => `- ${r}`).join('\n')}
Alamat Kantor: ${BBA_PROFILE.address}
Kontak: ${BBA_PROFILE.contact}
Website Resmi: ${BBA_PROFILE.officialWebsites.join(', ')}
Link Aplikasi Android: ${BBA_PROFILE.androidAppLink}

**Legalitas BBA Indonesia:**
Izin Resmi PPIU: ${BBA_LEGALITY.ppiuPermit}
Akreditasi: ${BBA_LEGALITY.accreditation}
Nomor Rekening PT. Bani Bunyamin Attarbiyyah: ${BBA_LEGALITY.bankAccount} (Semua transaksi harus lewat rekening ini)

**Paket Umrah:**
Kanggo sadaya inpormasi detail ngeunaan Paket Umrah anu sayogi ayeuna di BBA Indonesia (kalebet nami paket, jadwal angkat, fasilitas lengkap, sareng harga), sumber inpormasi anu paling akurat sareng teranyar nyaéta website resmi BBA Tour: https://bbatour.co.id/transaksi/paket-umrah. Mangga kunjungi link éta kanggo kéngingkeun data teranyar. BBA Indonesia nawiskeun sababaraha pilihan paket kanggo nyumponan kabutuhan jamaah. Abun siap ngabantosan Akang Teteh upami aya patarosan umum ngeunaan proses umrah!

**Syarat & Ketentuan Umrah BBA Indonesia (Lengkap):**
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.administration.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.administration.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.cancellation.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.cancellation.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.prohibitionsAndSanctions.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.prohibitionsAndSanctions.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.childDiscount.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.childDiscount.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.generalRequirements.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.generalRequirements.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.priceAndItineraryChanges.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.priceAndItineraryChanges.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.packageInclusions.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.packageInclusions.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.packageExclusions.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.packageExclusions.points)}
${formatTermsSection(BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.departureConditions.title, BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS.departureConditions.points)}

**Pelayanan BBA Indonesia:**
${formatTermsSection(BBA_SERVICES_INFO.title, BBA_SERVICES_INFO.points)}

**Alur Pendaftaran:**
${formatTermsSection(BBA_REGISTRATION_FLOW.title, BBA_REGISTRATION_FLOW.points)}

**Ketentuan Keberangkatan & Pembayaran:**
${formatTermsSection(BBA_DEPARTURE_PAYMENT_TERMS.title, BBA_DEPARTURE_PAYMENT_TERMS.points)}

**Program Tabungan Umroh BBA Indonesia (Lengkap):**
`; // Correctly closed the initial template literal here

    BBA_SAVINGS_PROGRAMS_DETAILED.forEach(program => {
        context += `\n\n**Program ${program.title} (${program.type})**\nDeskripsi: ${program.description}\n`;
        context += `Syarat Spesifik Program:\n${program.terms.map(t => `- ${t}`).join('\n')}\n`;
        if (program.minInitialDepositUjrah) {
            context += `- Saldo Awal Minimal (Ujrah): ${program.minInitialDepositUjrah}\n`;
        }
        if (program.contractPeriodUjrah) {
            context += `- Masa Kontrak (Ujrah): ${program.contractPeriodUjrah}\n`;
        }
    });
    context += `\n\n**Syarat dan Ketentuan Umum Program Tabungan (Berlaku untuk semua jenis tabungan):**`;
    Object.entries(BBA_SAVINGS_COMMON_TERMS).forEach(([key, points]) => {
        const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()); // Format title
        if (Array.isArray(points)) { // Ensure points is an array before mapping
            context += `\n\n*${title}*:\n${points.map(p => `- ${p}`).join('\n')}`;
        } else {
            // Handle cases where points might not be an array, though BBA_SAVINGS_COMMON_TERMS structure implies it should be.
            console.warn(`Expected points for ${title} to be an array, but got ${typeof points}`);
        }
    });


    const summarizedAcquaintances = ABUN_ACQUAINTANCES.map(a => `${a.name} (${a.relation}${a.description ? ': ' + a.description : ''})`).join(', ') + '.';
    context += `\n\n**Lingkaran Perkenalan Abun (Keluarga & Sahabat H. Miftah Baedarus):**\nAbun kenal dekat dengan keluarga dan sahabat Bapak Haji Miftah Baedarus. Diantaranya: ${summarizedAcquaintances}`;

    context += `\n=== Akhir Informasi Kunci BBA Indonesia ===\n`;
    return context;
};

// Existing exports remain, they might be used by other parts of the app or for different contexts.
export const getAllUmrahPackages = () => BBA_UMRAH_PACKAGES; 
export const getCompanyProfile = () => BBA_PROFILE; // Returns updated profile
export const getLegalityInfo = () => BBA_LEGALITY; // Returns updated legality
export const getSavingsPrograms = () => BBA_SAVINGS_PROGRAMS_DETAILED; // Returns detailed savings programs
export const getAllFAQs = () => import('../constants').then(mod => mod.INITIAL_FAQ);
// export const getAllTermsAndConditions = () => BBA_COMPREHENSIVE_TERMS_AND_CONDITIONS; // Export comprehensive if needed directly
