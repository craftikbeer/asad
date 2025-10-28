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

function App() {
  try {
    const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'en');
    const [quickViewProduct, setQuickViewProduct] = React.useState(null);
    const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [wishlist, setWishlist] = React.useState(() => {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    });
    const [cart, setCart] = React.useState([]);
    const [showNewsletter, setShowNewsletter] = React.useState(false);
    const [cartOpen, setCartOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({ category: 'all', priceRange: 'all', size: 'all', sortBy: 'newest' });
    const [filteredProducts, setFilteredProducts] = React.useState(PRODUCTS);
    const [notification, setNotification] = React.useState(null);
    const [viewedProducts, setViewedProducts] = React.useState([]);
    const [showPromoPopup, setShowPromoPopup] = React.useState(false);
    const [showCheckoutError, setShowCheckoutError] = React.useState(false);

    const changeLanguage = (lang) => {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      
      const t = TRANSLATIONS[lang].meta;
      document.getElementById('page-title').textContent = t.title;
      document.getElementById('page-description').content = t.description;
      document.getElementById('og-title').content = t.title;
      document.getElementById('og-description').content = t.description;
      document.getElementById('twitter-title').content = t.title;
      document.getElementById('twitter-description').content = t.description;
    };

    React.useEffect(() => {
      let hasShown = false;
      
      const handleMouseLeave = (e) => {
        if (!hasShown && e.clientY <= 0) {
          setShowNewsletter(true);
          hasShown = true;
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, []);

    React.useEffect(() => {
      const handleContactEvent = () => {
        setIsContactModalOpen(true);
        setSelectedProduct(null);
      };
      window.addEventListener('openContact', handleContactEvent);
      return () => window.removeEventListener('openContact', handleContactEvent);
    }, []);

    React.useEffect(() => {
      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      let filtered = [...PRODUCTS];
      
      if (filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      }
      
      if (filters.size !== 'all') {
        filtered = filtered.filter(p => p.sizes && p.sizes.includes(filters.size));
      }
      
      if (filters.sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'newest') {
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }
      
      setFilteredProducts(filtered);
    }, [filters]);

    const handleQuickView = (product) => {
      setQuickViewProduct(product);
      const viewed = JSON.parse(localStorage.getItem('viewed_products') || '[]');
      if (!viewed.includes(product.id)) {
        const newViewed = [...viewed, product.id].slice(-10);
        localStorage.setItem('viewed_products', JSON.stringify(newViewed));
        setViewedProducts(newViewed);
      }
    };

    const handleContactClick = (product = null) => {
      setSelectedProduct(product);
      setIsContactModalOpen(true);
    };

    const toggleWishlist = (productId) => {
      const isAdding = !wishlist.includes(productId);
      const newWishlist = isAdding 
        ? [...wishlist, productId]
        : wishlist.filter(id => id !== productId);
      
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      
      setNotification({
        message: isAdding ? 'Добавлено в избранное' : 'Удалено из избранного',
        type: 'success'
      });
      
      if (isAdding) {
        const hasSeenPromo = localStorage.getItem('promo_popup_shown');
        if (!hasSeenPromo) {
          setTimeout(() => {
            setShowPromoPopup(true);
          }, 1000);
        }
      }
    };

    const addToCart = (product) => {
      setCart(prev => [...prev, { ...product, cartId: Date.now() }]);
      setNotification({
        message: 'Товар добавлен в корзину',
        type: 'success'
      });
    };

    const t = TRANSLATIONS[language];

    return (
      <div className="min-h-screen bg-white" data-name="app" data-file="app.js">
        <ScrollProgress />
        <Header 
          cartCount={cart.length} 
          language={language} 
          onLanguageChange={changeLanguage}
          onCartClick={() => setCartOpen(true)}
          translations={t.header}
        />
        <HeroSlider 
          products={PRODUCTS.slice(0, 3)} 
          onContactClick={handleContactClick}
          translations={t.hero}
        />
        <FeaturedCollection 
          products={PRODUCTS.filter(p => p.isFeatured).slice(0, 4)} 
          onQuickView={handleQuickView}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          translations={t.featured}
        />
        <ProductGrid 
          products={filteredProducts}
          onQuickView={handleQuickView}
          onContactClick={handleContactClick}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          translations={t.productGrid}
          onFilterChange={setFilters}
        />
        <Footer translations={t.footer} />
        
        {quickViewProduct && (
          <ProductQuickView 
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={addToCart}
            isWishlisted={wishlist.includes(quickViewProduct.id)}
            onToggleWishlist={() => toggleWishlist(quickViewProduct.id)}
            translations={t.quickView}
          />
        )}
        
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)}
          product={selectedProduct}
          translations={t.contact}
        />
        
        <NewsletterPopup 
          isOpen={showNewsletter}
          onClose={() => setShowNewsletter(false)}
          translations={t.newsletter}
        />
        
        <Wishlist 
          products={PRODUCTS.filter(p => wishlist.includes(p.id))}
          onRemove={toggleWishlist}
          translations={t.wishlist}
        />
        
        <MiniCart 
          items={cart}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onRemove={(cartId) => setCart(prev => prev.filter(item => item.cartId !== cartId))}
          onCheckout={() => setShowCheckoutError(true)}
          translations={t.cart}
        />
        
        <CookieConsent />
        <AIChatBot translations={t.chatbot} />
        <EmailMarketing />
        <CartAbandonmentReminder cart={cart} />
        <FirstOrderPromo 
          isOpen={showPromoPopup}
          onClose={() => setShowPromoPopup(false)}
        />
        
        <CheckoutErrorModal
          isOpen={showCheckoutError}
          onClose={() => setShowCheckoutError(false)}
        />
        
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('App error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);