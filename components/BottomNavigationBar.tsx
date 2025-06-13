
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClipboardListIcon } from './InfoCard'; // Import ClipboardListIcon

interface NavItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  const activeClasses = isActive 
    ? 'text-theme-accent filter drop-shadow-glow-accent-icon scale-110' 
    : 'text-theme-text-muted hover:text-theme-accent hover:filter hover:drop-shadow-glow-accent-icon';

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center flex-1 p-2 rounded-md transition-all duration-200 ${activeClasses}`}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={`w-6 h-6 mb-0.5 transform transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
        {React.cloneElement(icon, { className: `w-full h-full ${isActive ? 'text-theme-accent' : 'text-current'}`})}
      </div>
      <span className={`text-xs ${isActive ? 'font-semibold text-theme-accent' : 'text-theme-text-muted group-hover:text-theme-text'}`}>{label}</span>
    </Link>
  );
};

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/', label: 'Obrolan', icon: <HomeIcon />, pathPattern: /^(\/)?$/ },
    { to: '/about', label: 'Tentang', icon: <InformationCircleIcon />, pathPattern: /^\/about/ },
    { to: '/packages', label: 'Paket', icon: <CubeIcon />, pathPattern: /^\/packages/ },
    { to: '/registration', label: 'Daftar', icon: <UserPlusIcon />, pathPattern: /^\/registration/ },
    { to: '/testimonial', label: 'Testimoni', icon: <ClipboardListIcon />, pathPattern: /^\/testimonial/ },
    // { to: '/privacy', label: 'Privasi', icon: <ShieldCheckIcon />, pathPattern: /^\/privacy/ }, // Example of how to add more
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-theme-header-footer-bg border-t border-theme-border shadow-lg z-40">
      <div className="container mx-auto flex items-stretch justify-around h-16">
        {navItems.map(item => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={item.pathPattern.test(currentPath)}
          />
        ))}
      </div>
    </nav>
  );
};

// Icons with currentColor to inherit color from NavItem
const HomeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

const InformationCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

const CubeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);

const UserPlusIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

// ShieldCheckIcon is no longer used here, but can be kept for future use if needed.
const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622A11.99 11.99 0 0018.402 6a11.959 11.959 0 01-1.622-.986L12 2.25M9.002 6l.152.023A11.942 11.942 0 0112 4.5c.67 0 1.316.095 1.946.273L15 6M4.061 9.638l.082.074A11.953 11.953 0 0012 11.794c.968 0 1.903-.166 2.757-.483l.082-.074M4.06 9.638L12 2.25l7.94 7.388" />
  </svg>
);

export default BottomNavigationBar;
