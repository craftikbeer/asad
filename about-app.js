class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-black text-white">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AboutApp() {
  try {
    const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'en');
    const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

    const changeLanguage = (lang) => {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      
      const t = TRANSLATIONS[lang].aboutMeta;
      document.getElementById('page-title').textContent = t.title;
      document.getElementById('page-description').content = t.description;
      document.getElementById('og-title').content = t.title;
      document.getElementById('og-description').content = t.description;
      document.getElementById('twitter-title').content = t.title;
      document.getElementById('twitter-description').content = t.description;
    };

    React.useEffect(() => {
      const handleContactEvent = () => {
        setIsContactModalOpen(true);
      };
      window.addEventListener('openContact', handleContactEvent);
      return () => window.removeEventListener('openContact', handleContactEvent);
    }, []);

    const t = TRANSLATIONS[language];

    return (
      <div className="min-h-screen bg-white" data-name="about-app" data-file="about-app.js">
        <Header 
          cartCount={0} 
          language={language} 
          onLanguageChange={changeLanguage}
          translations={t.header}
        />
        <AboutHero translations={t.aboutHero} />
        <AboutPhilosophy translations={t.aboutPhilosophy} />
        <AboutTeam translations={t.aboutTeam} />
        <Footer translations={t.footer} />
        
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)}
          product={null}
          translations={t.contact}
        />
        <AIChatBot translations={t.chatbot} />
      </div>
    );
  } catch (error) {
    console.error('AboutApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <AboutApp />
  </ErrorBoundary>
);