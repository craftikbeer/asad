function NewsletterPopup({ isOpen, onClose, translations }) {
  try {
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await trickleCreateObject('newsletter_subscriber', {
          email: email,
          subscribedAt: new Date().toISOString()
        });
        localStorage.setItem('subscriber_email', email);
        localStorage.removeItem('welcome_email_sent');
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setEmail('');
        }, 2000);
      } catch (error) {
        console.error('Error saving subscription:', error);
        alert('Ошибка подписки. Попробуйте позже.');
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-name="newsletter-popup" data-file="components/NewsletterPopup.js">
        <div className="absolute inset-0 bg-black/60 modal-backdrop" onClick={onClose}></div>
        
        <div className="relative bg-white max-w-2xl w-full">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 hover:opacity-60"
          >
            <div className="icon-x text-2xl"></div>
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto overflow-hidden bg-gray-900 hidden md:block">
              <img 
                src="https://i.imgur.com/D70H73v.png" 
                alt="Newsletter"
                className="w-full h-full object-cover opacity-60"
              />
            </div>

            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
              {submitted ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="icon-check text-2xl text-white"></div>
                  </div>
                  <h3 className="text-2xl font-light mb-3">{translations.thankYou}</h3>
                  <p className="text-gray-600">{translations.subscribed}</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="text-xs tracking-[0.3em] uppercase mb-4 text-gray-500">{translations.subtitle}</p>
                    <h3 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
                      {translations.title}
                    </h3>
                    <p className="text-gray-600">
                      {translations.description}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={translations.emailPlaceholder}
                      required
                      className="w-full border-b-2 border-black py-3 focus:outline-none text-lg"
                    />
                    <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-4 text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors active:scale-95"
                    >
                      {translations.subscribeButton}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      {translations.privacy}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('NewsletterPopup error:', error);
    return null;
  }
}