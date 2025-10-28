function ProductImageGallery({ images, alt, className = '' }) {
  try {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const imageArray = Array.isArray(images) ? images : [images];
    const hasMultiple = imageArray.length > 1;

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % imageArray.length);
    };

    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    };

    React.useEffect(() => {
      if (!hasMultiple) return;
      let startX = 0;
      let isSwiping = false;

      const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
      };

      const handleTouchEnd = (e) => {
        if (!isSwiping) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) nextImage();
          else prevImage();
        }
        isSwiping = false;
      };

      const container = document.getElementById(`gallery-${alt}`);
      if (container) {
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        return () => {
          container.removeEventListener('touchstart', handleTouchStart);
          container.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }, [hasMultiple]);

    return (
      <div 
        id={`gallery-${alt}`}
        className={`relative ${className}`}
        data-name="product-image-gallery"
        data-file="components/ProductImageGallery.js"
        onMouseEnter={() => hasMultiple && setCurrentIndex((prev) => (prev + 1) % imageArray.length)}
      >
        <img 
          src={imageArray[currentIndex]} 
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
        
        {hasMultiple && (
          <>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {imageArray.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error('ProductImageGallery error:', error);
    return null;
  }
}