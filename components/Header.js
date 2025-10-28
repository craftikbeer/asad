function Header({ cartCount, language, onLanguageChange, onCartClick, translations }) {
  try {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigateToSection = (sectionId, e) => {
      if (e) e.preventDefault();
      const currentPage = window.location.pathname;
      const element = document.getElementById(sectionId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      } else if (!currentPage.includes('index.html') && currentPage !== '/') {
        window.location.href = `index.html#${sectionId}`;
      }
    };

    return (
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'glass-effect shadow-xl' : 'bg-white/80 backdrop-blur-sm'
        }`} 
        data-name="header" 
        data-file="components/Header.js"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-4 sm:gap-8">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden hover:opacity-60 transition-opacity p-3 -ml-3 active:scale-95"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className={`icon-${menuOpen ? 'x' : 'menu'} text-2xl`}></div>
              </button>
              <a href="index.html" className="text-2xl sm:text-3xl font-bold tracking-tighter hover:opacity-60 transition-opacity">ANDERS</a>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              <a href="index.html#featured" onClick={(e) => navigateToSection('featured', e)} className="text-sm tracking-wider hover:opacity-60 transition-opacity py-2 cursor-pointer">{translations.new}</a>
              <a href="index.html#lookbook" onClick={(e) => navigateToSection('lookbook', e)} className="text-sm tracking-wider hover:opacity-60 transition-opacity py-2 cursor-pointer">{translations.women}</a>
              <a href="index.html#lookbook" onClick={(e) => navigateToSection('lookbook', e)} className="text-sm tracking-wider hover:opacity-60 transition-opacity py-2 cursor-pointer">{translations.men}</a>
              <a href="index.html#lookbook" onClick={(e) => navigateToSection('lookbook', e)} className="text-sm tracking-wider hover:opacity-60 transition-opacity py-2 cursor-pointer">{translations.collection}</a>
              <a href="about.html" className="text-sm tracking-wider hover:opacity-60 transition-opacity py-2 cursor-pointer">{translations.about}</a>
            </nav>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => onLanguageChange(language === 'en' ? 'ru' : 'en')}
                className="text-xs tracking-wider hover:opacity-60 transition-opacity px-3 py-2 border border-gray-300 rounded hidden sm:block active:scale-95"
                aria-label="Change language"
              >
                {language === 'en' ? 'RU' : 'EN'}
              </button>
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="hover:opacity-60 transition-opacity p-2 active:scale-95"
                aria-label="Search"
              >
                <div className="icon-search text-xl"></div>
              </button>
              <button 
                className="hover:opacity-60 transition-opacity p-2 hidden sm:block active:scale-95"
                aria-label="Wishlist"
              >
                <div className="icon-heart text-xl"></div>
              </button>
              <button 
                onClick={onCartClick}
                className="relative hover:opacity-60 transition-opacity p-2 active:scale-95"
                aria-label="Shopping cart"
              >
                <div className="icon-shopping-bag text-xl"></div>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-6 space-y-4">
              <a href="index.html#featured" onClick={(e) => navigateToSection('featured', e)} className="block text-sm tracking-wider hover:opacity-60 transition-opacity py-3 border-b border-gray-100 cursor-pointer">{translations.new}</a>
              <a href="index.html#lookbook" onClick={(e) => navigateToSection('lookbook', e)} className="block text-sm tracking-wider hover:opacity-60 transition-opacity py-3 border-b border-gray-100 cursor-pointer">{translations.women}</a>
              <a href="index.html#lookbook" onClick={(e) => navigateToSection('lookbook', e)} className="block text-sm tracking-wider hover:opacity-60 transition-opacity py-3 border-b border-gray-100 cursor-pointer">{translations.men}</a>
              <a href="index.html#lookbook" onClick={(e) => navigateToSection('lookbook', e)} className="block text-sm tracking-wider hover:opacity-60 transition-opacity py-3 border-b border-gray-100 cursor-pointer">{translations.collection}</a>
              <a href="about.html" onClick={() => setMenuOpen(false)} className="block text-sm tracking-wider hover:opacity-60 transition-opacity py-3 border-b border-gray-100 cursor-pointer">{translations.about}</a>
              <button 
                onClick={() => onLanguageChange(language === 'en' ? 'ru' : 'en')}
                className="w-full text-left text-sm tracking-wider hover:opacity-60 transition-opacity py-3 border-t border-gray-100"
              >
                {language === 'en' ? 'Русский' : 'English'}
              </button>
            </nav>
          </div>
        )}
        
        {searchOpen && (
          <div className="border-t border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-12">
            <input 
              type="text" 
              placeholder={translations.searchPlaceholder}
              className="w-full text-base sm:text-lg focus:outline-none bg-transparent"
              autoFocus
            />
          </div>
        )}
      </header>
    );
  } catch (error) {
    console.error('Header error:', error);
    return null;
  }
}
