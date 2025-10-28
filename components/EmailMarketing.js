function EmailMarketing() {
  try {
    React.useEffect(() => {
      handleNewSubscriber();
      handleCartAbandonment();
    }, []);

    const handleNewSubscriber = () => {
      const hasReceivedWelcome = localStorage.getItem('welcome_email_sent');
      const subscriberEmail = localStorage.getItem('subscriber_email');
      
      if (subscriberEmail && !hasReceivedWelcome) {
        sendWelcomeEmail(subscriberEmail);
        localStorage.setItem('welcome_email_sent', 'true');
      }
    };

    const handleCartAbandonment = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const lastCartUpdate = localStorage.getItem('last_cart_update');
      const abandonmentEmailSent = localStorage.getItem('abandonment_email_sent');
      
      if (cart.length > 0 && lastCartUpdate && !abandonmentEmailSent) {
        const timeSinceUpdate = Date.now() - parseInt(lastCartUpdate);
        const oneHour = 60 * 60 * 1000;
        
        if (timeSinceUpdate > oneHour) {
          const subscriberEmail = localStorage.getItem('subscriber_email');
          if (subscriberEmail) {
            sendAbandonmentEmail(subscriberEmail, cart);
            localStorage.setItem('abandonment_email_sent', 'true');
          }
        }
      }
    };

    const sendWelcomeEmail = async (email) => {
      try {
        await trickleCreateObject('email_campaign', {
          type: 'welcome',
          recipient: email,
          subject: '🎁 Добро пожаловать в ANDERS! Ваша скидка 10%',
          promoCode: 'FIRST10',
          discount: 10,
          sentAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error sending welcome email:', error);
      }
    };

    const sendAbandonmentEmail = async (email, cart) => {
      try {
        await trickleCreateObject('email_campaign', {
          type: 'cart_abandonment',
          recipient: email,
          subject: '🛍️ Ваша корзина ждёт вас! + Бонус',
          cart: cart,
          promoCode: 'COMEBACK10',
          discount: 10,
          sentAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error sending abandonment email:', error);
      }
    };

    return null;
  } catch (error) {
    console.error('EmailMarketing error:', error);
    return null;
  }
}