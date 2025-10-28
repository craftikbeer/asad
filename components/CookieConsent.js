function CookieConsent() {
  try {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        setTimeout(() => setIsVisible(true), 2000);
      }
    }, []);

    const handleAccept = () => {
      localStorage.setItem('cookie_consent', 'accepted');
      setIsVisible(false);
    };

    const handleDecline = () => {
      localStorage.setItem('cookie_consent', 'declined');
      setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 z-[90] bg-black text-white p-4 sm:p-6 shadow-2xl animate-slide-up" data-name="cookie-consent" data-file="components/CookieConsent.js">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm sm:text-base mb-2">
              Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
              <a href="privacy.html" className="underline hover:text-gray-300">политикой конфиденциальности</a>.
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={handleAccept}
              className="flex-1 sm:flex-none bg-white text-black px-6 py-2 text-sm hover:bg-gray-200 transition-colors active:scale-95"
            >
              Принять
            </button>
            <button 
              onClick={handleDecline}
              className="flex-1 sm:flex-none border border-white px-6 py-2 text-sm hover:bg-white hover:text-black transition-all active:scale-95"
            >
              Отклонить
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CookieConsent error:', error);
    return null;
  }
}