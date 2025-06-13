
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const IS_MOTION_LOADED = typeof motion !== 'undefined' && typeof AnimatePresence !== 'undefined';
if (!IS_MOTION_LOADED) {
  console.warn(
    "Modal: Framer Motion ('motion' or 'AnimatePresence') is not loaded. Animations will be disabled, and a static version of the modal will be shown. This might be due to a CDN issue or network problem."
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  headerIcon?: React.ReactNode; 
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { scale: 0.95, y: 10, opacity: 0 }, 
  visible: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0.95, y: 10, opacity: 0 },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, headerIcon }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; 
      modalRef.current?.focus(); 
    } else {
      document.body.style.overflow = ''; 
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; 
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <div
      className="bg-theme-widget-bg rounded-xl shadow-2xl flex flex-col max-h-[90vh] w-full max-w-2xl border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-intense overflow-hidden" 
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      tabIndex={-1} 
      ref={modalRef} 
    >
      <header className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[var(--color-theme-widget-border-hologram)] bg-theme-interactive">
        <div className="flex items-center space-x-2">
          {headerIcon && <div className="flex-shrink-0 text-theme-accent filter drop-shadow-glow-accent-icon">{headerIcon}</div>}
          {title && (
            <h2 id="modal-title" className="text-lg sm:text-xl font-semibold text-theme-text text-glow-accent">
              {title}
            </h2>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-theme-text-muted hover:text-theme-accent hover:bg-theme-widget-bg transition-colors hover:shadow-neon-icon-glow"
          aria-label="Tutup modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-widget scrollbar-track-widget">
        {children}
      </div>
    </div>
  );

  if (!IS_MOTION_LOADED) {
    return isOpen ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" // Slightly less opaque backdrop
        onClick={onClose}
      >
        {modalContent}
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" 
          onClick={onClose} 
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "circOut" }} 
          >
           {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
