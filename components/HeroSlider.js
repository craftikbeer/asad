function HeroSlider({ products, onContactClick, translations }) {
  try {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % products.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [products.length]);

    const goToSlide = (index) => setCurrentSlide(index);

    return (
      <section className="relative h-screen mt-16 sm:mt-20 overflow-hidden" data-name="hero-slider" data-file="components/HeroSlider.js">
        {products.map((product, index) => (
          <div 
            key={product.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img 
              src={index === 0 ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80' : product.image} 
              alt={`${product.name} - коллекция ANDERS AW 2025, премиум ${product.category}`}
              title={`${product.name} - ${product.description}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-20">
              <div className="max-w-screen-2xl mx-auto">
                <div className="max-w-2xl space-y-4 sm:space-y-6">
                  <p className="text-white/80 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{translations.season}</p>
                  <h2 className="text-white text-3xl sm:text-5xl lg:text-7xl font-light leading-tight tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-lg lg:text-xl line-clamp-2">{product.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                      onClick={() => onContactClick(product)}
                      className="bg-white text-black px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto active:scale-95"
                    >
                      {translations.contactManager}
                    </button>
                    <button 
                      onClick={() => document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' })}
                      className="border-2 border-white text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto active:scale-95"
                    >
                      {translations.explore}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-6 sm:bottom-12 right-6 sm:right-12 lg:right-20 flex gap-2 sm:gap-3 z-10">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-12 sm:w-16' : 'bg-white/40 w-8 sm:w-12'
              }`}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('HeroSlider error:', error);
    return null;
  }
}