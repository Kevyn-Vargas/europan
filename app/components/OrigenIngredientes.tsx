import partnersData from '@/data/partners.json';
import FallbackImage from './FallbackImage';

export default function OrigenIngredientes() {
  const { partners, events } = partnersData;

  return (
    <section className="max-w-4/5" style={{ margin: '40px auto' }}>
      <style>{`
        @keyframes scroll-partners {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partners-track {
          display: flex;
          width: max-content;
          animation: scroll-partners 20s linear infinite;
        }
        .partners-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section header */}
      <div className="my-auto px-4 md:px-8">
        <div className="flex items-center gap-4" style={{ margin: '30px 0' }}>
          <div className="flex-1" style={{ height: 1, background: 'var(--color-border)' }} />
          <h2
            className="text-xs tracking-[0.35em] font-semibold shrink-0"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            ORIGEN E INGREDIENTES
          </h2>
          <div className="flex-1" style={{ height: 1, background: 'var(--color-border)' }} />
        </div>
      </div>

      {/* Desktop: carrusel */}
      <div className="hidden md:block mb-16 overflow-hidden">
        <div className="partners-track">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 shrink-0"
              style={{ width: 150, marginRight: '3rem' }}
            >
              <div className="flex items-center justify-center w-full" style={{ height: 120 }}>
                <FallbackImage
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full content-center object-contain"
                  fallback=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: carrusel */}
      <div className="md:hidden mb-16 overflow-hidden">
        <div className="partners-track">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 shrink-0"
              style={{ width: 120, marginRight: '1.5rem' }}
            >
              <div className="flex items-center justify-center w-full" style={{ height: 120 }}>
                <FallbackImage
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full content-center object-contain"
                  fallback=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      {/* <div className="px-4 md:px-8">
        <div style={{ height: 1, marginBottom: '2rem' }} />
      </div>

      Events header
      <div className="px-4 md:px-8">
        <div className="flex items-center gap-4" style={{ margin: '30px 0' }}>
          <div className="flex-1" style={{ height: 1, background: 'var(--color-border)' }} />
          <h2
            className="text-xs tracking-[0.35em] font-semibold shrink-0"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            EVENTOS
          </h2>
          <div className="flex-1" style={{ height: 1, background: 'var(--color-border)' }} />
        </div>

        Events grid
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-3 p-5 rounded-lg"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-dark)',
                    color: 'var(--color-white)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {event.badge}
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                >
                  {event.year}
                </span>
              </div>

              <h3
                className="text-sm leading-snug"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                {event.name}
              </h3>

              <p
                className="text-xs"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
              >
                📍 {event.location}
              </p>

              <p
                className="text-xs leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
              >
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
