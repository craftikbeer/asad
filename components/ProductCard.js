function ProductCard({ product, onQuickView, wishlist, onToggleWishlist }) {
  try {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <div 
        className="group product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-name="product-card"
        data-file="components/ProductCard.js"
      >
        <div className="relative aspect-[3/4] overflow-hidden mb-3 sm:mb-4 bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } md:group-hover:opacity-100`}>
            <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3">
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
                <div className={`icon-heart text-lg sm:text-xl ${wishlist?.includes(product.id) ? 'text-red-500' : 'text-black'}`}></div>
              </button>
            </div>
          </div>
          
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-black text-white text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-1 sm:px-3 sm:py-1.5">
                New
              </span>
            )}
            <span className="bg-white/90 text-black text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-1 sm:px-3 sm:py-1.5">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
          <h3 className="text-xs sm:text-sm font-medium tracking-wide line-clamp-1">{product.name}</h3>
          <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 mb-1">{product.description}</p>
          <p className="text-sm sm:text-base lg:text-lg font-light">{product.price.toLocaleString()} ₽</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProductCard error:', error);
    return null;
  }
}