
import React from 'react';
import Header from './Header';
import BottomNavigationBar from './BottomNavigationBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-theme-bg text-theme-text">
      <Header />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col flex-1">
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  );
};

export default Layout;
