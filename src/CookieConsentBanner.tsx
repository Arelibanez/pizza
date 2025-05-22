import React, { useState, useEffect } from 'react';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 z-50">
      <p className="text-xs sm:text-sm text-center sm:text-left">
        Questo sito utilizza i cookie per garantire la migliore esperienza utente. Accetta per continuare.
      </p>
      <button
        onClick={handleAccept}
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 sm:py-2 px-4 rounded text-sm whitespace-nowrap"
      >
        Accetta
      </button>
    </div>
  );
};

export default CookieConsentBanner;
