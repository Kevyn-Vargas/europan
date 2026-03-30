import FallbackImage from './FallbackImage';

const galleryImages = [
  { src: '/gallery/horno.jpg', alt: 'Pizzaiolo al trabajo' },
  { src: '/gallery/negocio.jpeg', alt: 'Masa artesanal' },
  { src: '/gallery/jean-pizzas.jpeg', alt: 'Flores blancas' },
  { src: '/gallery/masa-pro.jpeg', alt: 'Arte napolitano' },
  { src: '/gallery/negocio-monalisa.jpeg', alt: 'Espolvoreando queso' },
  { src: '/gallery/jean-cooking.jpeg', alt: 'Horno de leña' },
];

export default function Gallery() {
  return (
    <section>
      {/* Desktop layout */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          gap: 10,
          height: 420,
          alignItems: 'stretch',
          marginBottom: 20,
        }}
      >
        {/* Left big */}
        <div className="overflow-hidden">
          <FallbackImage
            src={galleryImages[0].src}
            alt={galleryImages[0].alt}
            className="w-full h-full object-cover object-center"
            style={{ height: '100%' }}
            fallback="📸"
          />
        </div>

        {/* Center 2x2 — cuadradas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 10,
            width: 420,
          }}
        >
          {galleryImages.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{ aspectRatio: '1 / 1', width: '100%' }}
            >
              <FallbackImage
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-center"
                style={{ height: '100%' }}
                fallback="📸"
              />
            </div>
          ))}
        </div>

        {/* Right big */}
        <div className="overflow-hidden">
          <FallbackImage
            src={galleryImages[5].src}
            alt={galleryImages[5].alt}
            className="w-full h-full object-cover object-center"
            style={{ height: '100%' }}
            fallback="📸"
          />
        </div>
      </div>

      {/* Mobile: 3 cols x 2 rows iguales */}
      <div
        className="md:hidden grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 , marginBottom: 10 }}
      >
        {galleryImages.map((img, i) => (
          <div key={i} style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
            <FallbackImage
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover object-center"
              style={{ height: '100%' }}
              fallback="📸"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
