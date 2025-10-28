function ProductQuickView({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist, translations }) {
  try {
    const availableSizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];
    const [selectedSize, setSelectedSize] = React.useState(availableSizes[0] || 'M');
    const [quantity, setQuantity] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState('details');
    const [showSizeChart, setShowSizeChart] = React.useState(false);
    const allSizes = ['XS', 'S', 'M', 'L', 'XL'];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-name="product-quick-view" data-file="components/ProductQuickView.js">
        <div className="absolute inset-0 bg-black/70 modal-backdrop" onClick={onClose}></div>
        
        <div className="relative bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <div className="icon-x text-2xl"></div>
          </button>
          
          <div className="grid md:grid-cols-2">
            <div className="p-4 md:p-6">
              <QuickViewGallery 
                images={product.images || [product.image]}
                alt={product.name}
              />
            </div>
            
            <div className="p-6 lg:p-8 flex flex-col">
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-1">{product.category}</p>
                  <h2 className="text-2xl lg:text-3xl font-light tracking-tight mb-2">{product.name}</h2>
                  <p className="text-xl font-light mb-3">{product.price.toLocaleString()} ₽</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{product.description}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Поделиться:</span>
                    <SocialShare product={product} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex gap-6 mb-4 border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`pb-2 text-xs tracking-wider transition-colors ${
                        activeTab === 'details' 
                          ? 'border-b-2 border-black text-black' 
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {translations.details || 'ДЕТАЛИ'}
                    </button>
                    <button
                      onClick={() => setActiveTab('materials')}
                      className={`pb-2 text-xs tracking-wider transition-colors ${
                        activeTab === 'materials' 
                          ? 'border-b-2 border-black text-black' 
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {translations.materials || 'МАТЕРИАЛЫ'}
                    </button>
                    <button
                      onClick={() => setActiveTab('care')}
                      className={`pb-2 text-xs tracking-wider transition-colors ${
                        activeTab === 'care' 
                          ? 'border-b-2 border-black text-black' 
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {translations.care || 'УХОД'}
                    </button>
                  </div>

                  <div className="text-xs text-gray-700 leading-relaxed max-h-32 overflow-y-auto">
                    {activeTab === 'details' && (
                      <ul className="space-y-1">
                        {product.details && product.details.length > 0 ? (
                          product.details.map((detail, idx) => (
                            <li key={idx}>• {detail}</li>
                          ))
                        ) : (
                          <>
                            <li>• {translations.madeIn || 'Произведено в Италии'}</li>
                            <li>• {translations.artisan || 'Ручная работа мастеров'}</li>
                            <li>• {translations.limited || 'Лимитированная коллекция'}</li>
                            <li>• {translations.fitting || 'Классическая посадка'}</li>
                          </>
                        )}
                      </ul>
                    )}
                    {activeTab === 'materials' && (
                      <ul className="space-y-1">
                        {product.material ? (
                          <>
                            <li>• Материал: {product.material}</li>
                            <li>• {translations.origin || 'Происхождение волокна: Монголия'}</li>
                            <li>• {translations.lining || 'Подкладка: шёлк'}</li>
                          </>
                        ) : (
                          <>
                            <li>• {translations.composition || 'Состав: 100% кашемир премиум-класса'}</li>
                            <li>• {translations.origin || 'Происхождение волокна: Монголия'}</li>
                            <li>• {translations.lining || 'Подкладка: шёлк'}</li>
                            <li>• {translations.buttons || 'Фурнитура: рог буйвола'}</li>
                          </>
                        )}
                      </ul>
                    )}
                    {activeTab === 'care' && (
                      <ul className="space-y-1">
                        <li>• {translations.dryCleaning || 'Только профессиональная химчистка'}</li>
                        <li>• {translations.ironing || 'Гладить при низкой температуре'}</li>
                        <li>• {translations.storage || 'Хранить в защитном чехле'}</li>
                        <li>• {translations.avoid || 'Избегать контакта с парфюмом'}</li>
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs tracking-wider uppercase text-gray-600">{translations.selectSize}</label>
                    <button
                      onClick={() => setShowSizeChart(true)}
                      className="text-xs underline hover:text-black transition-colors flex items-center gap-1"
                    >
                      <div className="icon-ruler text-sm"></div>
                      Таблица размеров
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {allSizes.map(size => {
                      const isAvailable = availableSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => isAvailable && setSelectedSize(size)}
                          disabled={!isAvailable}
                          className={`w-10 h-10 border-2 transition-all flex items-center justify-center text-sm ${
                            !isAvailable 
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                              : selectedSize === size 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Серые размеры недоступны</p>
                </div>
                
                {showSizeChart && (
                  <SizeChart 
                    isOpen={showSizeChart}
                    onClose={() => setShowSizeChart(false)}
                    category={product.category}
                  />
                )}

                <div>
                  <label className="block text-xs tracking-wider uppercase mb-2 text-gray-600">{translations.quantity}</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                    >
                      <div className="icon-minus text-xs"></div>
                    </button>
                    <span className="text-base font-light w-6 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                    >
                      <div className="icon-plus text-xs"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => onAddToCart({ ...product, size: selectedSize, quantity })}
                  className="flex-1 bg-black text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors flex items-center justify-center active:scale-95"
                >
                  {translations.addToCart}
                </button>
                <button 
                  onClick={onToggleWishlist}
                  className="border-2 border-black px-4 py-4 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                >
                  <div className={`icon-heart text-base ${isWishlisted ? 'text-red-500' : ''}`}></div>
                  <span className="text-xs tracking-wider hidden sm:inline">{isWishlisted ? (translations.removeFromWishlist || 'Удалить') : (translations.addToWishlist || 'В избранное')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProductQuickView error:', error);
    return null;
  }
}
