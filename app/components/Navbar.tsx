'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'La Carta' },
  { href: '/reserva', label: 'Reserva' },
  { href: '/contacto', label: 'Contacto' },
];

const WHATSAPP = 'https://api.whatsapp.com/send/?phone=573192661179&text=Hola%21+Vengo+de+https%3A%2F%2Feuropan.netlify.app%2F%0AMi+pedido+es%3A&type=phone_number&app_absent=0';
const WHATSAPP_CLEAN = 'https://wa.me/573192661179';
const INSTAGRAM = 'https://www.instagram.com/europan.vdl/';
const MAPS = 'https://maps.app.goo.gl/ykw4PTStZSHWTsVGA';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledDesktop, setScrolledDesktop] = useState(false);
  const [scrolledMobile, setScrolledMobile] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 768) {
        setScrolledDesktop(window.scrollY > window.innerHeight * 0.5);
      } else {
        setScrolledMobile(window.scrollY > window.innerHeight * 0.6);
      }
    };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Top info bar — desktop only */}
      <div
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-between items-center transition-all duration-1000"
        style={{
          background: 'transparent',
          color: 'var(--color-white)',
          height: '55px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          opacity: scrolledDesktop ? 0 : 1,
          transform: scrolledDesktop ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: scrolledDesktop ? 'none' : 'auto',
          paddingLeft: 'clamp(2rem, 5vw, 6rem)',
          paddingRight: 'clamp(2rem, 5vw, 6rem)',
          fontSize: '13px',
          fontFamily: 'var(--font-body)',
        }}
      >
        <a
          href={MAPS}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-white)', textDecoration: 'none' }}
        >
          📍 Cra. 8 #10-196, Villa de Leyva, Boyacá
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-white)', textDecoration: 'none' }}
        >
          Whatsapp 319 2661179
        </a>
      </div>

      {/* Main navbar */}
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          top: 'var(--top-bar-height)',
          height: 'var(--nav-height)',
          paddingLeft: 'clamp(1rem, 5vw, 5rem)',
          paddingRight: 'clamp(1rem, 5vw, 5rem)',
          opacity: scrolledDesktop ? 0 : 1,
          transform: scrolledDesktop ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: scrolledDesktop ? 'none' : 'auto',
          background: scrolledMobile ? 'var(--color-dark)' : 'transparent',
          borderBottom: 'none',
          boxShadow: 'none',
        }}
      >
        {/* OPCIÓN A — Logo texto */}
        <Link href="/" className="flex flex-col">
          <span
            className="text-5xl"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-white)',
              transition: 'color 0.5s',
            }}
          >
            EuroPan
          </span>
          <span
            className="hidden md:block text-xxs tracking-widest text-center"
            style={{
              color: 'var(--color-white)',
              fontFamily: 'var(--font-heading)',
              transition: 'color 0.5s',
            }}
          >
            COCINA ARTESANAL
          </span>
        </Link>

        {/* OPCIÓN B — Logo imagen */}
        {/* <Link href="/" className="flex items-center">
          <img src="/foods/logo.jpg" alt="EuroPan"
            style={{ height: 48, width: 'auto', objectFit: 'contain' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </Link> */}

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isHovered = hoveredLink === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs tracking-widest pb-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-white)',
                }}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label.toUpperCase()}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '2px',
                    background: 'var(--color-accent)',
                    transform: isActive || isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5" style={{ background: 'white' }} />
          <span className="block w-6 h-0.5" style={{ background: 'white' }} />
          <span className="block w-4 h-0.5" style={{ background: 'white' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setMenuOpen(false)}
          style={{ background: 'rgba(0,0,0,0.5)' }}
        />
      )}

      {/* Mobile slide-in panel */}
      <div
        className="fixed top-0 right-0 h-full z-101 flex flex-col"
        style={{
          width: 'min(320px, 85vw)',
          background: 'var(--color-dark)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          overflowY: 'auto',
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-col">
            <span
              className="text-4xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-white)' }}
            >
              EuroPan
            </span>
            <span
              className="text-xxs tracking-widest"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-heading)' }}
            >
              COCINA ARTESANAL
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-2xl w-9 h-9 flex items-center justify-center"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col flex-1" style={{ padding: '32px 24px 24px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-2xl transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-heading)',
                color: pathname === link.href ? 'var(--color-accent)' : 'var(--color-white)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón Pide a domicilio */}
        <div style={{ padding: '0 24px 16px' }}>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full text-xs tracking-widest font-semibold transition-all duration-200"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-white)',
              border: '1px solid rgba(255,255,255,0.7)',
              padding: '12px 24px',
              textDecoration: 'none',
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
            PIDE A DOMICILIO
          </a>
        </div>

        {/* Social icons */}
        <div
          className="flex gap-4 shrink-0"
          style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Instagram */}
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full w-10 h-10 transition-opacity hover:opacity-80"
            style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            aria-label="Instagram"
          >
            <img 
              src="/redes/insta-theme-white.svg" 
              alt="Instagram" 
              style={{ width: '20px', height: '20px' }} 
            />
          </a>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_CLEAN}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full w-10 h-10 transition-opacity hover:opacity-80"
            style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            aria-label="WhatsApp"
          >
            <img 
              src="/redes/whats-theme-white.svg" 
              alt="WhatsApp" 
              style={{ width: '20px', height: '20px' }} 
            />
          </a>

          {/* Ubicación */}
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full w-10 h-10 transition-opacity hover:opacity-80"
            style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            aria-label="Ubicación"
          >
            <img 
              src="/redes/location.svg" 
              alt="Ubicación" 
              style={{ width: '20px', height: '20px' }} 
            />
          </a>
        </div>

        {/* Address + hours */}
        <div
          className="shrink-0"
          style={{
            padding: '20px 24px 32px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 mb-4"
            style={{ textDecoration: 'none' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>📍</span>
            <span
              className="text-xs leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}
            >
              Cra. 8 #10-196, Villa de Leyva, Boyacá
            </span>
          </a>

          <div className="flex items-start gap-2">
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>🕐</span>
            <div>
              <p
                className="text-xs font-semibold mb-0.5"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}
              >
                HORARIO
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)' }}
              >
                Jueves a Domingo
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)' }}
              >
                12:00 - 9:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
