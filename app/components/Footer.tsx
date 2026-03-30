'use client';

import Link from 'next/link';

const WHATSAPP = 'https://api.whatsapp.com/send/?phone=573192661179&text=Hola%21+Vengo+de+https%3A%2F%2Feuropan.netlify.app%2F%0AMi+pedido+es%3A&type=phone_number&app_absent=0';
const INSTAGRAM = 'https://www.instagram.com/europan.vdl/';
const MAPS = 'https://maps.app.goo.gl/ykw4PTStZSHWTsVGA';

export default function Footer() {
  return (
    <footer
      className="py-12 px-6 md:px-16"
      style={{ background: 'var(--color-dark)', color: 'var(--color-white)' }}
    >
      <div
        className="max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6"
        style={{ margin: 'auto 55px', padding: '40px 0' }}
      >
        {/* Brand + quote */}
        <div className="md:col-span-1">
          <h2
            className="text-2xl leading-[0.8]"
            style={{ fontFamily: 'var(--font-heading)', marginBottom: '10px' }}
          >
            EUROPAN<br />Cocina Artesanal
          </h2>
          <p
            className="text-sm leading-relaxed italic mb-3"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.75)' }}
          >
            «La pizza esce dalle mani tue, ogni pizzaiolo ha la sua pizza. Se tu prendi un altro pizzaiolo, non facciamo mai la stessa pizza. La mia è una cosa. La tua è un'altra.»
          </p>
          <p
            className="text-xs tracking-wide"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)', marginTop: '10px' }}
          >
            — Jeshua Moreno e Maestro Pizzaiolo
          </p>
        </div>

        {/* Horario */}
        <div>
          <h3
            className="text-sm tracking-[0.2em] font-semibold"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
          >
            HORARIO
          </h3>
          <p
            className="text-sm mb-2"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.85)' }}
          >
            Viernes, Sabados &amp; Domingos
          </p>
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.85)' }}
          >
            9:00 AM - 7:00 PM
          </p>
        </div>

        {/* Dirección */}
        <div>
          <h3
            className="text-sm tracking-[0.2em] font-semibold"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
          >
            NUESTRA DIRECCIÓN
          </h3>
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm mb-2 flex gap-2 transition-opacity hover:opacity-60"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
          >
            Cra. 8 #10-196, Villa de Leyva, Boyacá, Colombia
          </a>
          <p
            className="text-sm flex gap-2 mt-2"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.85)' }}
          >
            <span>✉</span>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              319 2661179
            </a>
          </p>
        </div>

        {/* Reserva */}
        <div>
          <h3
            className="text-sm tracking-[0.2em] font-semibold"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
          >
            RESERVA
          </h3>
          <Link
            href="/reserva"
            className="inline-block text-xs tracking-[0.15em] font-semibold transition-all duration-200"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-white)',
              border: '1px solid rgba(255,255,255,0.7)',
              padding: '12px 24px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = 'black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-white)';
            }}
          >
            RESERVA TU MESA
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 12px' }}
      >
        <p
          className="text-xs"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.3)' }}
        >
          © {new Date().getFullYear()} EUROPAN. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-opacity hover:opacity-60"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)' }}
          >
            Instagram
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-opacity hover:opacity-60"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)' }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
