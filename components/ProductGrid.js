function ProductGrid({ products, onQuickView, onContactClick, wishlist, onToggleWishlist, translations, onFilterChange }) {
  try {
    const [hoveredId, setHoveredId] = React.useState(null);

    return (
      <section id="lookbook" className="py-16 sm:py-24 lg:py-32 bg-white" data-name="product-grid" data-file="components/ProductGrid.js">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { name: 'Главная', href: 'index.html' },
            { name: 'Каталог', href: null }
          ]} />
          
          <div className="mb-10 sm:mb-16 reveal text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4 text-gray-500">{translations.subtitle}</p>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight mb-4 sm:mb-6 px-4">{translations.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              {translations.description}
            </p>
          </div>
          
          <div className="mb-8 flex justify-center">
            <ProductFilters onFilterChange={onFilterChange} translations={translations} />
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{translations.noProducts || 'Товары не найдены'}</p>
            </div>
          ) : null}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="group reveal"
                style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                  <ProductImageGallery
                    images={product.images || [product.image]}
                    alt={`${product.name} - ${product.category} ANDERS, ${product.price.toLocaleString()} ₽`}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  } md:group-hover:opacity-100`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button 
                          onClick={() => onQuickView(product)}
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                        >
                          <div className="icon-eye text-lg sm:text-xl text-black"></div>
                        </button>
                        <button 
                          onClick={() => onToggleWishlist(product.id)}
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                        >
                          <div className={`icon-heart text-lg sm:text-xl ${wishlist.includes(product.id) ? 'text-red-500' : 'text-black'}`}></div>
                        </button>
                      </div>
                      <div className="hidden sm:block">
                        <SocialShare product={product} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-black text-white text-[10px] tracking-wider uppercase px-3 py-1.5">
                        New
                      </span>
                    )}
                    <span className="bg-white/90 text-black text-[10px] tracking-wider uppercase px-3 py-1.5">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
                  <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                  <p className="text-lg font-light">{product.price.toLocaleString()} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('ProductGrid error:', error);
    return null;
  }
}
