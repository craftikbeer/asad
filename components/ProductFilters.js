function ProductFilters({ onFilterChange, translations }) {
  try {
    const [isOpen, setIsOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({
      category: 'all',
      priceRange: 'all',
      size: 'all',
      sortBy: 'newest'
    });

    const handleFilterChange = (key, value) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onFilterChange(newFilters);
    };

    return (
      <>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-all"
          data-name="filter-toggle"
          data-file="components/ProductFilters.js"
        >
          <div className="icon-sliders text-lg"></div>
          <span className="text-sm tracking-wider">{translations?.filters || 'ФИЛЬТРЫ'}</span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
            
            <div className="relative bg-white w-full max-w-2xl p-8 max-h-[80vh] overflow-y-auto">
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6">
                <div className="icon-x text-2xl"></div>
              </button>

              <h3 className="text-2xl font-light mb-8">{translations?.filters || 'Фильтры'}</h3>

              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-3">{translations?.category || 'Категория'}</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full border-2 border-gray-300 p-3"
                  >
                    <option value="all">{translations?.all || 'Все'}</option>
                    <option value="Denim">{translations?.denim || 'Джинсовые изделия'}</option>
                    <option value="Lingerie">{translations?.lingerie || 'Нижнее бельё'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-3">{translations?.price || 'Цена'}</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full border-2 border-gray-300 p-3"
                  >
                    <option value="all">{translations?.all || 'Все'}</option>
                    <option value="0-20000">{translations?.under20k || 'До 20,000 ₽'}</option>
                    <option value="20000-35000">20,000 - 35,000 ₽</option>
                    <option value="35000-100000">{translations?.over35k || 'От 35,000 ₽'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-3">{translations?.size || 'Размер'}</label>
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="w-full border-2 border-gray-300 p-3"
                  >
                    <option value="all">{translations?.all || 'Все'}</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-3">{translations?.sort || 'Сортировка'}</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full border-2 border-gray-300 p-3"
                  >
                    <option value="newest">{translations?.newest || 'Новинки'}</option>
                    <option value="price-asc">{translations?.priceLow || 'Цена: по возрастанию'}</option>
                    <option value="price-desc">{translations?.priceHigh || 'Цена: по убыванию'}</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setFilters({ category: 'all', priceRange: 'all', size: 'all', sortBy: 'newest' });
                    onFilterChange({ category: 'all', priceRange: 'all', size: 'all', sortBy: 'newest' });
                  }}
                  className="w-full border-2 border-gray-300 py-3 text-sm tracking-wider hover:bg-gray-100"
                >
                  {translations?.reset || 'Сбросить фильтры'}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('ProductFilters error:', error);
    return null;
  }
}