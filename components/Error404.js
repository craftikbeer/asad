function Error404() {
  try {
    const [messageIndex, setMessageIndex] = React.useState(0);
    const [rotation, setRotation] = React.useState(0);

    const messages = [
      "Этой страницы не существует",
      "Здесь ничего нет",
      "Вы заблудились",
      "Куда вы попали?",
      "404. Очевидно же",
      "Страница в отпуске"
    ];

    React.useEffect(() => {
      const interval = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        setRotation(x);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" data-name="error-404" data-file="components/Error404.js">
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-9xl font-bold"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              404
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <div 
            className="mb-8 transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter">
              404
            </h1>
          </div>

          <div className="h-20 mb-12">
            <p className="text-2xl md:text-4xl font-light tracking-wide transition-opacity duration-500">
              {messages[messageIndex]}
            </p>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Возможно, вы ошиблись адресом.<br/>
              Или страница переехала.<br/>
              А может, её никогда и не было.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="index.html"
              className="bg-white text-black px-10 py-4 text-base font-medium tracking-wide hover:bg-gray-200 transition-colors inline-flex items-center gap-3 active:scale-95"
            >
              <div className="icon-home text-xl"></div>
              На главную
            </a>
            <button 
              onClick={() => window.history.back()}
              className="border-2 border-white text-white px-10 py-4 text-base font-medium tracking-wide hover:bg-white hover:text-black transition-all inline-flex items-center gap-3 active:scale-95"
            >
              <div className="icon-arrow-left text-xl"></div>
              Назад
            </button>
          </div>

          <div className="mt-20 pt-12 border-t border-white/20">
            <p className="text-sm text-gray-500 italic">
              «Не все страницы заслуживают существования» — ANDERS, 2025
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 opacity-20">
          <div className="text-9xl font-bold">×</div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error404 error:', error);
    return null;
  }
}