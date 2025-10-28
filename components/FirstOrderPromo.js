function FirstOrderPromo({ isOpen, onClose }) {
  try {
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
      localStorage.setItem('promo_popup_shown', 'true');
      onClose();
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-name="first-order-promo" data-file="components/FirstOrderPromo.js">
        <div className="absolute inset-0 bg-black/70 modal-backdrop" onClick={handleClose}></div>
        
        <div className="relative bg-white max-w-md w-full p-8 text-center">
          <button onClick={handleClose} className="absolute top-4 right-4 hover:opacity-60">
            <div className="icon-x text-2xl"></div>
          </button>

          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-gift text-4xl text-green-600"></div>
            </div>
            <h3 className="text-3xl font-light mb-3">Специальное предложение!</h3>
            <p className="text-gray-600 mb-4">Первый заказ со скидкой</p>
          </div>

          <div className="bg-black text-white p-6 mb-6">
            <p className="text-sm mb-2 opacity-80">Промокод на скидку 10%</p>
            <p className="text-4xl font-mono font-bold tracking-wider">FIRST10</p>
            <p className="text-xs mt-2 opacity-80">На заказ от 15,000₽</p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Используйте промокод при оформлении заказа и получите скидку 10%
          </p>

          <button
            onClick={handleClose}
            className="w-full bg-black text-white py-4 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
          >
            Отлично, спасибо!
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('FirstOrderPromo error:', error);
    return null;
  }
}