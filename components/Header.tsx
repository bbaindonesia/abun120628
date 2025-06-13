
import React from 'react';
import { APP_TITLE, BBA_LOGO_URL } from '../constants';
import GlowingDigitalClock from './GlowingDigitalClock'; 

const Header: React.FC = () => {
  return (
    <header className="bg-theme-header-footer-bg shadow-xl sticky top-0 z-50 border-b border-theme-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <img 
            src={BBA_LOGO_URL} 
            alt="Logo BBA Indonesia - Travel Umroh dan Haji" 
            className="h-8 sm:h-9 w-auto rounded filter drop-shadow-glow-accent-icon"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <h1 
            className="text-lg sm:text-xl font-semibold text-theme-text tracking-tight text-glow-accent-strong"
            >
              {APP_TITLE}
          </h1>
        </div>
        
        <GlowingDigitalClock /> {/* Uses theme-accent by default */}

      </div>
    </header>
  );
};

export default Header;
