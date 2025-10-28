function AboutHero({ translations }) {
  try {
    return (
      <section className="relative h-screen mt-16 sm:mt-20 overflow-hidden" data-name="about-hero" data-file="components/AboutHero.js">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" 
          alt="ANDERS модный дом - история бренда премиальной одежды из Италии и Франции с 2019 года"
          title="История модного дома ANDERS"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="max-w-3xl space-y-4 sm:space-y-6">
              <p className="text-white/80 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{translations.subtitle}</p>
              <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-light leading-tight tracking-tight">
                {translations.title}
              </h1>
              <p className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-2xl">
                {translations.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('AboutHero error:', error);
    return null;
  }
}