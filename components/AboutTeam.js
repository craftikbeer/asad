function AboutTeam({ translations }) {
  try {
    const team = [
      {
        name: translations.team1.name,
        role: translations.team1.role,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
      },
      {
        name: translations.team2.name,
        role: translations.team2.role,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
      },
      {
        name: translations.team3.name,
        role: translations.team3.role,
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
      }
    ];

    return (
      <section className="py-16 sm:py-24 bg-gray-50" data-name="about-team" data-file="components/AboutTeam.js">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4 text-gray-500">{translations.subtitle}</p>
            <h2 className="text-4xl sm:text-5xl font-light mb-6">{translations.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{translations.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                <p className="text-sm text-gray-600 uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('AboutTeam error:', error);
    return null;
  }
}