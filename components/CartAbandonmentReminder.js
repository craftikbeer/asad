function CartAbandonmentReminder({ cart }) {
  try {
    React.useEffect(() => {
      if (cart && cart.length > 0) {
        localStorage.setItem('last_cart_update', Date.now().toString());
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.removeItem('abandonment_email_sent');
      }
    }, [cart]);

    React.useEffect(() => {
      const checkAbandonment = setInterval(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const lastUpdate = localStorage.getItem('last_cart_update');
        const emailSent = localStorage.getItem('abandonment_email_sent');
        
        if (savedCart.length > 0 && lastUpdate && !emailSent) {
          const timeSince = Date.now() - parseInt(lastUpdate);
          const oneHour = 60 * 60 * 1000;
          
          if (timeSince > oneHour) {
            showAbandonmentNotification();
          }
        }
      }, 5 * 60 * 1000);

      return () => clearInterval(checkAbandonment);
    }, []);

    const showAbandonmentNotification = () => {
      const subscriberEmail = localStorage.getItem('subscriber_email');
      if (subscriberEmail) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-24 right-6 bg-black text-white p-4 rounded-lg shadow-2xl z-50 max-w-sm animate-slide-up';
        notification.innerHTML = `
          <div class="flex items-start gap-3">
            <div class="icon-shopping-bag text-2xl"></div>
            <div class="flex-1">
              <h4 class="font-medium mb-1">Ваша корзина ждёт!</h4>
              <p class="text-sm text-gray-300">Завершите заказ и получите скидку 10% с промокодом COMEBACK10</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="hover:opacity-70">
              <div class="icon-x text-lg"></div>
            </button>
          </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 10000);
        localStorage.setItem('abandonment_email_sent', 'true');
      }
    };

    return null;
  } catch (error) {
    console.error('CartAbandonmentReminder error:', error);
    return null;
  }
}