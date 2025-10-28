function QuickViewGallery({ images, alt }) {
  try {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const imageArray = Array.isArray(images) ? images : [images];

    return (
      <div data-name="quickview-gallery" data-file="components/QuickViewGallery.js">
        <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
          <img 
            src={imageArray[selectedIndex]} 
            alt={alt}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {imageArray.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {imageArray.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-square overflow-hidden border-2 transition-all ${
                  idx === selectedIndex ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={img} alt={`${alt} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('QuickViewGallery error:', error);
    return null;
  }
}