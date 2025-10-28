function AdminPanel({ onLogout }) {
  try {
    const [products, setProducts] = React.useState([]);
    const [editingProduct, setEditingProduct] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);
    const [maintenanceMode, setMaintenanceMode] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadProducts();
      const savedMode = localStorage.getItem('maintenance_mode');
      setMaintenanceMode(savedMode === 'true');
    }, []);
    
    const loadProducts = async () => {
      try {
        const result = await trickleListObjects('anders_product', 100, true);
        const loadedProducts = result.items.map(item => ({
          id: item.objectId,
          ...item.objectData
        }));
        setProducts(loadedProducts);
        localStorage.setItem('anders_products', JSON.stringify(loadedProducts));
      } catch (error) {
        console.error('Error loading products:', error);
        const saved = localStorage.getItem('anders_products');
        if (saved) setProducts(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    };
    
    const toggleMaintenance = () => {
      const newMode = !maintenanceMode;
      localStorage.setItem('maintenance_mode', newMode.toString());
      setMaintenanceMode(newMode);
      alert(newMode ? 'Режим тех. работ ВКЛЮЧЕН для всех посетителей домена' : 'Режим тех. работ ВЫКЛЮЧЕН для всех посетителей домена');
    };

    const saveProducts = async (newProducts) => {
      setProducts(newProducts);
      localStorage.setItem('anders_products', JSON.stringify(newProducts));
    };

    const handleExport = () => {
      const dataStr = JSON.stringify(products, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'anders_products.json';
      link.click();
    };

    const handleImport = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            saveProducts(imported);
            alert('Товары успешно импортированы!');
          } catch (error) {
            alert('Ошибка импорта: ' + error.message);
          }
        };
        reader.readAsText(file);
      }
    };

    const handleDelete = async (id) => {
      if (confirm('Удалить товар?')) {
        try {
          await trickleDeleteObject('anders_product', id);
          const newProducts = products.filter(p => p.id !== id);
          saveProducts(newProducts);
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('Ошибка удаления товара');
        }
      }
    };

    const handleEdit = (product) => {
      setEditingProduct(product);
      setShowForm(true);
    };

    const handleAdd = () => {
      setEditingProduct(null);
      setShowForm(true);
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="admin-panel" data-file="components/AdminPanel.js">
        <header className="bg-black text-white p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-light">ANDERS Admin</h1>
            <div className="flex items-center gap-4">
              <a href="index.html" className="text-sm hover:opacity-70">← На сайт</a>
              <button onClick={onLogout} className="text-sm hover:opacity-70 border-l border-white/30 pl-4">
                Выйти
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex gap-4 flex-wrap items-center">
              <button onClick={handleAdd} className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors active:scale-95">
                + Добавить товар
              </button>
              <button onClick={handleExport} className="border-2 border-black px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors active:scale-95">
                Экспорт JSON
              </button>
              <label className="border-2 border-black px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer active:scale-95">
                Импорт JSON
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm text-gray-600">Режим тех. работ:</span>
                <button 
                  onClick={toggleMaintenance}
                  className={`px-6 py-3 text-sm font-bold tracking-wider transition-all active:scale-95 ${
                    maintenanceMode 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {maintenanceMode ? 'ВКЛЮЧЕН' : 'ВЫКЛЮЧЕН'}
                </button>
              </div>
            </div>
          </div>

          {showForm && (
            <ProductForm
              product={editingProduct}
              onSave={async (product) => {
                try {
                  if (editingProduct) {
                    await trickleUpdateObject('anders_product', product.id, product);
                    saveProducts(products.map(p => p.id === product.id ? product : p));
                  } else {
                    const created = await trickleCreateObject('anders_product', product);
                    saveProducts([...products, { id: created.objectId, ...product }]);
                  }
                  setShowForm(false);
                } catch (error) {
                  console.error('Error saving product:', error);
                  alert('Ошибка сохранения товара');
                }
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Загрузка товаров...</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-2xl font-light mb-6 flex items-center gap-3">
                  <div className="icon-star text-2xl"></div>
                  Featured Collection (до 4 товаров)
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.filter(p => p.isFeatured).slice(0, 4).map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
                {products.filter(p => p.isFeatured).length === 0 && (
                  <p className="text-gray-500 text-center py-8">Нет товаров в Featured Collection</p>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-light mb-6 flex items-center gap-3">
                  <div className="icon-grid text-2xl"></div>
                  AW 2025 Collection (все товары)
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminPanel error:', error);
    return null;
  }
}

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = React.useState(product || {
    name: '', category: '', price: '', images: [''], image: '', description: '', isNew: false, isFeatured: false, material: '', sizes: ['S', 'M', 'L'], details: ['Made in Italy', 'Handcrafted by artisans', 'Limited collection', 'Classic fit']
  });

  const imageUrls = form.images && form.images.length > 0 ? form.images : [form.image || ''];

  const handleImageChange = (index, value) => {
    const newImages = [...imageUrls];
    newImages[index] = value;
    setForm({...form, images: newImages.filter(img => img), image: newImages[0] || ''});
  };

  const addImageField = () => {
    if (imageUrls.length < 4) {
      setForm({...form, images: [...imageUrls, '']});
    }
  };

  const removeImageField = (index) => {
    if (imageUrls.length > 1) {
      const newImages = imageUrls.filter((_, i) => i !== index);
      setForm({...form, images: newImages, image: newImages[0] || ''});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-medium mb-4">{product ? 'Редактировать' : 'Добавить'} товар</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Название"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
          className="w-full border-2 border-gray-300 p-3"
        />
        <input
          type="text"
          placeholder="Категория"
          value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}
          required
          className="w-full border-2 border-gray-300 p-3"
        />
        <input
          type="number"
          placeholder="Цена"
          value={form.price}
          onChange={(e) => setForm({...form, price: e.target.value})}
          required
          className="w-full border-2 border-gray-300 p-3"
        />
        <div className="space-y-3">
          <label className="block text-sm font-medium">Изображения (от 1 до 4)</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                placeholder={`URL изображения ${index + 1}${index === 0 ? ' (главное)' : ''}`}
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                required={index === 0}
                className="flex-1 border-2 border-gray-300 p-3"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-4 border-2 border-red-500 text-red-500 hover:bg-red-50"
                >
                  <div className="icon-trash-2 text-lg"></div>
                </button>
              )}
            </div>
          ))}
          {imageUrls.length < 4 && (
            <button
              type="button"
              onClick={addImageField}
              className="w-full border-2 border-dashed border-gray-300 p-3 text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50"
            >
              + Добавить изображение
            </button>
          )}
        </div>
        <textarea
          placeholder="Детали (каждая с новой строки):
• Made in Italy
• Handcrafted by artisans
• Limited collection
• Classic fit"
          value={(form.details || []).join('\n')}
          onChange={(e) => setForm({...form, details: e.target.value.split('\n').filter(d => d.trim())})}
          rows="5"
          className="w-full border-2 border-gray-300 p-3 text-sm"
        />
        <input
          type="text"
          placeholder="Материал (например: 100% премиум кашемир)"
          value={form.material || ''}
          onChange={(e) => setForm({...form, material: e.target.value})}
          className="w-full border-2 border-gray-300 p-3"
        />
        <textarea
          placeholder="Детали (каждая с новой строки, например:&#10;Произведено в Италии&#10;Ручная работа мастеров&#10;Лимитированная коллекция)"
          value={(form.details || []).join('\n')}
          onChange={(e) => setForm({...form, details: e.target.value.split('\n').filter(d => d.trim())})}
          rows="4"
          className="w-full border-2 border-gray-300 p-3"
        />
        <div className="border-2 border-gray-300 p-4">
          <p className="text-sm font-medium mb-3">Доступные размеры:</p>
          <div className="flex flex-wrap gap-3">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <label key={size} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(form.sizes || []).includes(size)}
                  onChange={(e) => {
                    const newSizes = e.target.checked 
                      ? [...(form.sizes || []), size]
                      : (form.sizes || []).filter(s => s !== size);
                    setForm({...form, sizes: newSizes});
                  }}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">{size}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => setForm({...form, isNew: e.target.checked})}
              className="w-5 h-5"
            />
            <span>Новинка</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({...form, isFeatured: e.target.checked})}
              className="w-5 h-5"
            />
            <span>Featured Collection</span>
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-black text-white px-6 py-3 hover:bg-gray-800">
            Сохранить
          </button>
          <button type="button" onClick={onCancel} className="border-2 border-gray-300 px-6 py-3 hover:bg-gray-100">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

function ProductCard({ product, onEdit, onDelete }) {
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : product.image;
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative">
        <img src={mainImage} alt={product.name} className="w-full h-64 object-cover" />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isFeatured && (
            <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-medium">
              Featured
            </div>
          )}
          {product.images && product.images.length > 1 && (
            <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
              +{product.images.length - 1} фото
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-lg font-light mb-3">{product.price.toLocaleString()} ₽</p>
        <div className="flex gap-2">
          <button onClick={() => onEdit(product)} className="flex-1 bg-black text-white py-2 text-sm hover:bg-gray-800">
            Изменить
          </button>
          <button onClick={() => onDelete(product.id)} className="flex-1 border-2 border-red-500 text-red-500 py-2 text-sm hover:bg-red-50">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}