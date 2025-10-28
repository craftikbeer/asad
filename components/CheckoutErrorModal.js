function CheckoutErrorModal({ isOpen, onClose }) {
  try {
    if (!isOpen) return null;

    const telegramLink = 'https://t.me/andersdenim';

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-name="checkout-error-modal" data-file="components/CheckoutErrorModal.js">
        <div className="absolute inset-0 bg-black/70 modal-backdrop" onClick={onClose}></div>
        
        <div className="relative bg-white max-w-md w-full p-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-60">
            <div className="icon-x text-2xl"></div>
          </button>

          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-4">
              <img 
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80" 
                alt="Sad cat"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-light mb-3">К сожалению...</h3>
            <p className="text-gray-600 mb-2">
              Мы столкнулись с трудностями сервера
            </p>
            <p className="text-sm text-gray-500">
              Но мы уже работаем над этим
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <p className="text-gray-700 mb-4">
              Для быстрого оформления заказа свяжитесь с нашим менеджером
            </p>
            <a 
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full bg-blue-500 text-white py-4 rounded hover:bg-blue-600 transition-colors"
            >
              <div className="icon-send text-xl"></div>
              <span className="text-sm font-medium">Написать в Telegram</span>
            </a>
          </div>

          <p className="text-xs text-gray-500">
            Спасибо за понимание!
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CheckoutErrorModal error:', error);
    return null;
  }
}