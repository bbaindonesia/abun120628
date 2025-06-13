
import React from 'react';

interface InfoCardProps {
  title: string;
  icon?: React.ReactNode; 
  children: React.ReactNode;
  className?: string;
  titleColorClass?: string; 
  actionSlot?: React.ReactNode; 
  onTitleClick?: () => void; 
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children, className = '', titleColorClass = 'text-theme-text', actionSlot, onTitleClick }) => {
  const titleAreaClasses = `flex items-center mb-3 sm:mb-4 ${onTitleClick ? 'cursor-pointer' : ''}`;
  
  let titleClasses = `text-lg sm:text-xl font-semibold ${titleColorClass} flex-grow`;
  // let titleStyle: React.CSSProperties = {}; // Removed direct style application

  if (titleColorClass === 'text-theme-accent') {
    titleClasses += ' text-glow-accent'; // Apply glow class if accent color
  } else {
    titleClasses += ' infocard-title-glow'; 
  }


  return (
    <div className={`bg-theme-widget-bg p-5 sm:p-6 rounded-xl transition-all duration-300 border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-soft hover:shadow-hologram-intense ${className}`}>
      <div className={titleAreaClasses} onClick={onTitleClick} role={onTitleClick ? "button" : undefined} tabIndex={onTitleClick ? 0 : undefined} 
           onKeyDown={onTitleClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onTitleClick() : undefined}
      >
        {icon && <div className="mr-3 text-theme-accent filter drop-shadow-glow-accent-icon">{icon}</div>}
        <h3 className={titleClasses}>{title}</h3>
        {actionSlot && <div className="ml-auto flex-shrink-0">{actionSlot}</div>}
      </div>
      <div className="text-theme-text-muted text-sm sm:text-base space-y-2">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;

export const InfoIcon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => ( // Default className for icons will be overridden by parent if needed
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const FeatureIconTemplate: React.FC<{className?: string}> = ({className="h-8 w-8"}) => ( 
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.16 14.59a2.25 2.25 0 01-1.591.659H1.5V19.5h1.25a2.25 2.25 0 002.25-2.25v-3.862c0-.454.228-.866.591-1.123L9.75 9.104V3.104zm0 0A2.25 2.25 0 0112 5.25v13.5A2.25 2.25 0 019.75 21v-2.625m0-10.5h.008v.008H9.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const QuranIcon: React.FC<{className?: string}> = ({className="h-6 w-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const TasbihIcon: React.FC<{className?: string}> = ({className="h-6 w-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const PackageIcon: React.FC<{className?: string}> = ({className="h-6 w-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1012 10.125A2.625 2.625 0 0012 4.875z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.125V21m0-10.875L9.375 7.5M12 10.125L14.625 7.5M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v3c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

export const PrayerMatIcon: React.FC<{className?: string}> = ({className="h-6 w-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15M9 9l6-6m-6 6l6 6m-6-6v6m6-6h-6m6 0l-6 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const PrayingHandsIcon: React.FC<{className?: string}> = ({className="h-6 w-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 12h.008v.008H12V12zm0 0L9.045 6.691M12 12l2.955-5.309M12 12l-.396 2.836M12 12l.396 2.836M12 12l-1.482 2.964M12 12l1.482 2.964" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5l4.5-4.5 4.5 4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 13.5s0-1.5 4.5-1.5 4.5 1.5 4.5 1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5l3-3 3 3" />
  </svg>
);

export const TimerIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CalendarPlusIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25M12 18.75V15m0 0V11.25m0 3.75h3.75M12 15H8.25" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M3 18.75h18M3 11.25h18M3 7.5h18" />
  </svg>
);

export const ListChecksIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const CalendarCheckIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25M16.5 21L12 16.5l-4.5 4.5M12 7.5h.008v.008H12V7.5z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M3 18.75h18M3 11.25h18M3 7.5h18" />
  </svg>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 012.087 2.087L22.75 12l-1.598.813a4.5 4.5 0 01-2.087 2.087L18.25 16.5l-.813-2.846a4.5 4.5 0 01-2.087-2.087L13.75 12l1.598-.813a4.5 4.5 0 012.087-2.087L18.25 7.5z" />
  </svg>
);

export const ExclamationCircleIcon: React.FC<{className?: string}> = ({className="h-6 w-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
);

export const SuitcaseIcon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-1.5m0 0H3.75M9 12h3M9 15h3M6.75 6.75h10.5M6.75 6.75V4.5c0-1.24 1.01-2.25 2.25-2.25h3c1.24 0 2.25 1.01 2.25 2.25v2.25M6.75 6.75C6.75 7.99 5.74 9 4.5 9H3.75c-1.24 0-2.25-1.01-2.25-2.25V6.75c0-1.24 1.01-2.25 2.25-2.25h.75c1.24 0 2.25 1.01 2.25 2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 15h12c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H6c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

export const ZakatIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1012 10.125A2.625 2.625 0 0012 4.875zM12 10.125C12 11.087 12.4231 11.9708 13.125 12.5625M12 10.125C11.5769 11.9708 10.875 12.5625 9.875 12.5625M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v3c0 .621.504 1.125 1.125 1.125zM12 15.75H12.0075V15.7575H12V15.75Z M12 18.375H12.0075V18.3825H12V18.375Z M12 13.125H12.0075V13.1325H12V13.125Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.125v10.875" />
  </svg>
);

export const QiblaIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2.25 12 2.25zm0 16.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l3.75-6.495M12 12L8.25 5.505M12 12l6.495 3.75M12 12l-6.495 3.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v9M7.5 12h9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L12 5.5M12 18.5V21.75M2.25 12H5.5M18.5 12H21.75" /> // Ka'bah direction pointer
  </svg>
);

export const HijriCalendarIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.375a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /> // Moon crescent
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 11.25c0 .966-.784 1.75-1.75 1.75h-.008A1.75 1.75 0 0110.75 11.25c0-.966.784-1.75 1.75-1.75h.008c.966 0 1.75.784 1.75 1.75z" />
  </svg>
);

export const GlossaryIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25h6M9 11.25h6M9 14.25h3.75" />
  </svg>
);

export const ClipboardListIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m6 3H9m12-7.5h-4.5v4.5m0-4.5L16.5 3M9 3v4.5M3 9h4.5" />
  </svg>
);
// HealthMonitorIcon removed
