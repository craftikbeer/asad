function AboutPhilosophy({ translations }) {
  try {
    return (
      <section className="py-16 sm:py-24 lg:py-32" data-name="about-philosophy" data-file="components/AboutPhilosophy.js">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] mb-6 text-gray-500">{translations.manifesto}</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-8 leading-tight">
                {translations.title}
              </h2>
              <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{translations.paragraph1}</p>
                <p>{translations.paragraph2}</p>
                <p>{translations.paragraph3}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-8 text-center">
                <div className="text-5xl font-light mb-3">2019</div>
                <div className="text-sm text-gray-600">{translations.stats.founded}</div>
              </div>
              <div className="bg-gray-50 p-8 text-center">
                <div className="text-5xl font-light mb-3">12</div>
                <div className="text-sm text-gray-600">{translations.stats.collections}</div>
              </div>
              <div className="bg-gray-50 p-8 text-center">
                <div className="text-5xl font-light mb-3">5000+</div>
                <div className="text-sm text-gray-600">{translations.stats.clients}</div>
              </div>
              <div className="bg-gray-50 p-8 text-center">
                <div className="text-5xl font-light mb-3">15</div>
                <div className="text-sm text-gray-600">{translations.stats.countries}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-16">
            <h3 className="text-2xl sm:text-3xl font-light mb-12 text-center">{translations.values.title}</h3>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="icon-heart text-2xl text-white"></div>
                </div>
                <h4 className="text-lg font-medium mb-3">{translations.values.value1.title}</h4>
                <p className="text-gray-600 text-sm">{translations.values.value1.description}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="icon-sparkles text-2xl text-white"></div>
                </div>
                <h4 className="text-lg font-medium mb-3">{translations.values.value2.title}</h4>
                <p className="text-gray-600 text-sm">{translations.values.value2.description}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="icon-globe text-2xl text-white"></div>
                </div>
                <h4 className="text-lg font-medium mb-3">{translations.values.value3.title}</h4>
                <p className="text-gray-600 text-sm">{translations.values.value3.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('AboutPhilosophy error:', error);
    return null;
  }
}