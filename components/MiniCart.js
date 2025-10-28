function MiniCart({ items, isOpen, onClose, onRemove, translations, onCheckout }) {
  try {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
      <>
        <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-light tracking-tight">{translations.title} ({items.length})</h3>
              <button onClick={onClose} className="hover:opacity-60">
                <div className="icon-x text-2xl"></div>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="icon-shopping-bag text-5xl text-gray-300 mb-4 mx-auto"></div>
                  <p className="text-gray-500">{translations.empty}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.cartId} className="flex gap-4 pb-4 border-b border-gray-100">
                      <img src={item.image} alt={item.name} className="w-20 h-28 object-cover" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{translations.size} {item.size}</p>
                        <p className="font-light mb-2">{item.price.toLocaleString()} ₽</p>
                        <button
                          onClick={() => onRemove(item.cartId)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          {translations.remove}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-light">{translations.total}</span>
                  <span className="font-medium">{total.toLocaleString()} ₽</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-black text-white py-4 text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors active:scale-95"
                >
                  {translations.checkout}
                </button>
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
        )}
      </>
    );
  } catch (error) {
    console.error('MiniCart error:', error);
    return null;
  }
}