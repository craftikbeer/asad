function ContactModal({ isOpen, onClose, product, translations }) {
  try {
    const [formData, setFormData] = React.useState({ name: '', phone: '', email: '', message: '' });
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await trickleCreateObject('contact_message', {
          ...formData,
          product: product ? product.name : 'General inquiry',
          timestamp: new Date().toISOString()
        });
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({ name: '', phone: '', email: '', message: '' });
        }, 2000);
      } catch (error) {
        console.error('Error saving contact:', error);
        alert('Ошибка отправки. Попробуйте позже.');
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-name="contact-modal" data-file="components/ContactModal.js">
        <div className="absolute inset-0 bg-black/70 modal-backdrop" onClick={onClose}></div>
        
        <div className="relative bg-white max-w-lg w-full p-10">
          <button onClick={onClose} className="absolute top-6 right-6 hover:opacity-60">
            <div className="icon-x text-2xl"></div>
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="icon-check text-2xl text-white"></div>
              </div>
              <h3 className="text-2xl font-light mb-3">{translations.thankYou}</h3>
              <p className="text-gray-600">{translations.contactSoon}</p>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-light tracking-tight mb-2">{translations.title}</h3>
              {product && <p className="text-sm text-gray-500 mb-6">{translations.about} {product.name}</p>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={translations.namePlaceholder}
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b-2 border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="tel"
                  placeholder={translations.phonePlaceholder}
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border-b-2 border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="email"
                  placeholder={translations.emailPlaceholder}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border-b-2 border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                />
                <textarea
                  placeholder={translations.messagePlaceholder}
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border-2 border-gray-300 p-3 focus:outline-none focus:border-black transition-colors resize-none"
                />
                <div className="bg-green-50 border-2 border-green-500 p-4 rounded">
                  <div className="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
                    <div className="icon-gift text-lg"></div>
                    <span>Первый заказ? Используйте промокод:</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-green-900">FIRST10</div>
                  <div className="text-xs text-green-700 mt-1">Скидка 10% на заказ от 15,000₽</div>
                </div>
                <div className="g-recaptcha mb-4" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
                <button type="submit" className="w-full bg-black text-white py-4 text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors active:scale-95">
                  {translations.sendButton}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ContactModal error:', error);
    return null;
  }
}