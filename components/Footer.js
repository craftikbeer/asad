function Footer({ translations }) {
  try {
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    };

    return (
      <footer id="footer" className="bg-black text-white py-12 sm:py-16 lg:py-20" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
            <div className="sm:col-span-2 lg:col-span-4">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">ANDERS</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                {translations.description}
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="icon-map-pin text-base"></div>
                  <span>Москва, ул. Тверская, 15</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="icon-phone text-base"></div>
                  <a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="icon-mail text-base"></div>
                  <a href="mailto:info@anders.fashion" className="hover:text-white transition-colors">info@anders.fashion</a>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.3em] mb-4 sm:mb-6 text-gray-500">{translations.navigation}</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm">
                <li><a href="index.html#lookbook" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.navLinks.collections}</a></li>
                <li><a href="index.html#featured" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.navLinks.editorial}</a></li>
                <li><a href="index.html#lookbook" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.navLinks.lookbook}</a></li>
                <li><a href="about.html" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.navLinks.about}</a></li>
                <li><a href="index.html#featured" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.navLinks.news}</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.3em] mb-4 sm:mb-6 text-gray-500">{translations.support}</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm">
                <li><button onClick={() => window.dispatchEvent(new CustomEvent('openContact'))} className="hover:text-gray-400 transition-colors cursor-pointer text-left">{translations.supportLinks.contact}</button></li>
                <li><a href="shipping.html" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.supportLinks.shipping}</a></li>
                <li><a href="shipping.html" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.supportLinks.payment}</a></li>
                <li><a href="shipping.html" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.supportLinks.returns}</a></li>
                <li><a href="faq.html" className="hover:text-gray-400 transition-colors cursor-pointer">{translations.supportLinks.faq || 'FAQ'}</a></li>
                <li><a href="privacy.html" className="hover:text-gray-400 transition-colors cursor-pointer">Политика конфиденциальности</a></li>
                <li><a href="terms.html" className="hover:text-gray-400 transition-colors cursor-pointer">Пользовательское соглашение</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="text-xs uppercase tracking-[0.3em] mb-6 text-gray-500">{translations.newsletterTitle}</h4>
              <p className="text-sm text-gray-400 mb-4">
                {translations.newsletterDescription}
              </p>
              {submitted ? (
                <div className="py-4 text-center">
                  <div className="inline-flex items-center gap-2 text-green-400">
                    <div className="icon-check text-lg"></div>
                    <span className="text-sm">{translations.newsletterTitle === 'Newsletter' ? 'Subscribed successfully!' : 'Подписка оформлена!'}</span>
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex border-b border-white/30 mb-6">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={translations.emailPlaceholder} 
                      required
                      className="bg-transparent py-3 flex-1 focus:outline-none text-sm" 
                    />
                    <button type="submit" className="text-lg hover:text-gray-400 transition-colors">
                      <div className="icon-arrow-right"></div>
                    </button>
                  </form>
                  <p className="text-xs text-gray-500">
                    {translations.privacyNote}
                  </p>
                </>
              )}
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© 2025 ANDERS. {translations.copyright.split('2025 ')[1] || 'All rights reserved.'}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-400 transition-colors">
                <div className="icon-instagram text-lg"></div>
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                <div className="icon-facebook text-lg"></div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer error:', error);
    return null;
  }
}