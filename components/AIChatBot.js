function AIChatBot({ translations }) {
  try {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
      { role: 'bot', text: translations?.welcome || 'Здравствуйте! Я AI-ассистент ANDERS. Могу помочь с выбором товаров, размерами, доставкой и другими вопросами.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const telegramLink = 'https://t.me/andersdenim';

    const handleSend = async () => {
      if (!input.trim()) return;

      const userMessage = input.trim();
      setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
      setInput('');
      setIsTyping(true);

      try {
        const systemPrompt = `Ты — AI-ассистент премиального модного дома ANDERS. 
Отвечай вежливо, профессионально и по делу.

Информация о магазине:
- Продаём премиальный деним и нижнее бельё
- Цены: от 12,000 до 45,000 ₽
- Доставка: Москва 1-2 дня (бесплатно от 10,000₽), СПб 2-3 дня, регионы 3-7 дней
- Размеры: XS, S, M, L, XL
- Возврат: 14 дней при сохранении вида
- Оплата: карта онлайн, наличные при получении (Москва), безнал для юрлиц
- Telegram: ${telegramLink}
- Телефон: +7 (495) 123-45-67
- Email: info@anders.fashion

Товары в каталоге:
1. Classic Denim Jacket - 45,000₽ (деним, S-XL)
2. Lace Bralette Set - 18,000₽ (белье, XS-L)
3. Denim Shirt - 22,000₽ (деним, S-XL)
4. Slim Fit Jeans - 32,000₽ (деним, XS-L)
5. Silk Bodysuit - 25,000₽ (белье, XS-M)
6. Denim Dress - 38,000₽ (деним, S-L)
7. Cotton Basics Set - 12,000₽ (белье, XS-XL)
8. Wide Leg Jeans - 35,000₽ (деним, S-XL)

Если вопрос сложный или нужна персональная консультация - предложи связаться с менеджером через Telegram или телефон.`;

        const apiKey = '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';
        const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 1024
          })
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0]?.message?.content || 'Извините, не удалось получить ответ.';
        
        setMessages(prev => [...prev, { role: 'bot', text: botMessage }]);
      } catch (error) {
        console.error('Chat error:', error);
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: 'Извините, произошла ошибка. Пожалуйста, свяжитесь с нами напрямую через Telegram или телефон.' 
        }]);
      } finally {
        setIsTyping(false);
      }
    };

    return (
      <>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed right-6 bottom-6 z-[80] w-16 h-16 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          data-name="chat-toggle"
          data-file="components/AIChatBot.js"
        >
          {isOpen ? (
            <div className="icon-x text-2xl"></div>
          ) : (
            <div className="icon-message-circle text-2xl"></div>
          )}
        </button>

        {isOpen && (
          <div className="fixed right-6 bottom-24 z-[80] w-[90vw] sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden animate-slide-up">
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="icon-sparkles text-xl text-black"></div>
                </div>
                <div>
                  <h3 className="font-medium">ANDERS AI</h3>
                  <p className="text-xs text-gray-300">{translations?.online || 'Онлайн'}</p>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-br-none' 
                      : 'bg-white text-black rounded-bl-none shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-3 bg-white">
              <a 
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2 rounded-lg mb-3 hover:bg-blue-600 transition-colors text-sm"
              >
                <div className="icon-send text-base"></div>
                <span>{translations?.telegram || 'Написать в Telegram'}</span>
              </a>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={translations?.placeholder || 'Задайте вопрос...'}
                  className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="icon-send text-base"></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('AIChatBot error:', error);
    return null;
  }
}