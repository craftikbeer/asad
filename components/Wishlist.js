function Wishlist({ products, onRemove, onAddToCart, onOpenCart, translations }) {
  try {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed right-6 bottom-24 z-40 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          data-name="wishlist-toggle"
          data-file="components/Wishlist.js"
        >
          <div className="icon-heart text-xl"></div>
          {products.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {products.length}
            </span>
          )}
        </button>

        <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-light tracking-tight">{translations.title} ({products.length})</h3>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-60">
                <div className="icon-x text-2xl"></div>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {products.length === 0 ? (
                <div className="text-center py-16">
                  <div className="icon-heart text-5xl text-gray-300 mb-4 mx-auto"></div>
                  <p className="text-gray-500">{translations.empty}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map(product => (
                    <div key={product.id} className="border-b border-gray-100 pb-4 mb-4 last:border-0">
                      <div className="flex gap-4 mb-3">
                        <img src={product.image} alt={product.name} className="w-20 h-28 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1 text-sm">{product.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                          <p className="font-light text-base">{product.price.toLocaleString()} ₽</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onAddToCart({ ...product, size: 'M', quantity: 1 });
                          }}
                          className="flex-1 bg-black text-white py-2 text-xs tracking-wider hover:bg-gray-800 transition-colors active:scale-95"
                        >
                          {translations.addToCart || 'В корзину'}
                        </button>
                        <button
                          onClick={() => {
                            onAddToCart({ ...product, size: 'M', quantity: 1 });
                            onOpenCart();
                          }}
                          className="flex-1 border-2 border-black text-black py-2 text-xs tracking-wider hover:bg-black hover:text-white transition-all active:scale-95"
                        >
                          {translations.goToCart || 'Оформить'}
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="text-xs text-red-500 mt-2 hover:underline w-full text-center"
                      >
                        {translations.remove}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </>
    );
  } catch (error) {
    console.error('Wishlist error:', error);
    return null;
  }
}