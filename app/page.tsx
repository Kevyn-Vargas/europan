import menuData from '@/data/menu.json';
import MenuList from '@/app/components/MenuList';
import Gallery from '@/app/components/Gallery';
import FallbackImage from '@/app/components/FallbackImage';
import OrigenIngredientes from '@/app/components/OrigenIngredientes';

export const metadata = {
  title: 'La Carta — EuroPan Pizzeria Napolitana',
  description: 'Nuestra carta de pizzas napolitanas artesanales',
};

export default function LaCarta() {
  return (
    <main>
      {/* Hero — cubre toda la pantalla incluyendo el navbar */}
      <section
        className="relative flex items-center justify-center"
        style={{
          height: '79vh',
          minHeight: 500,
          background: '#1a1a1a',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0">
          <FallbackImage
            src="/logos/portada.jpg"
            alt="Pizzeria Napolitana"
            className="w-full h-full object-cover"
            style={{ opacity: 0.75, height: '100%' }}
            fallback=""
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'var(--color-overlay)' }}
        />
        <h1
          className="relative z-10 text-5xl md:text-7xl text-center md:text-left"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-white)' }}
        >
          PIZZERIA NAPOLITANA
        </h1>
      </section>

      {/* Origen e Ingredientes + Eventos */}
      <OrigenIngredientes />

      {/* Menu */}
      <section className="py-12 md:py-16">
        <MenuList categories={menuData.categories} />
      </section>

      {/* Gallery */}
      <Gallery />
    </main>
  );
}
