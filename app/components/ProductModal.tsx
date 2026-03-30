'use client';

import { useState, useEffect } from 'react';
import { MenuItemData } from './MenuItem';
import FallbackImage from './FallbackImage';

interface ProductModalProps {
  item: MenuItemData | null;
  onClose: () => void;
}

// Generate up to 3 "carousel" images from the same src (in a real project, the JSON would have an images[] array)
function getCarouselImages(item: MenuItemData): string[] {
  return [item.image, item.image, item.image];
}

export default function ProductModal({ item, onClose }: ProductModalProps) {
  const [slide, setSlide] = useState(0);

  // Reset slide when item changes
  useEffect(() => {
    setSlide(0);
  }, [item]);

  // Close on ESC
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  if (!item) return null;

  const images = getCarouselImages(item);
  const total = images.length;

  const prev = () => setSlide((s) => (s - 1 + total) % total);
  const next = () => setSlide((s) => (s + 1) % total);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-200"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="fixed z-201 left-1/2 top-1/2"
        style={{
          transform: 'translate(-50%, -50%)',
          width: 'min(640px, 94vw)',
          maxHeight: '90vh',
          background: 'var(--color-bg)',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        }}
      >
        {/* Carousel */}
        <div className="relative shrink-0" style={{ height: 'clamp(200px, 45vw, 320px)', background: '#f0ece4' }}>
          {/* Image */}
          <div className="w-full h-full">
            <FallbackImage
              src={images[slide]}
              alt={`${item.name} ${slide + 1}`}
              className="w-full h-full object-cover"
              style={{ height: '100%' }}
              fallback="🍕"
            />
          </div>

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 flex items-center justify-center transition-opacity hover:opacity-100"
                style={{
                  transform: 'translateY(-50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none', cursor: 'pointer', fontSize: 16,
                  opacity: 0.8,
                }}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 flex items-center justify-center transition-opacity hover:opacity-100"
                style={{
                  transform: 'translateY(-50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none', cursor: 'pointer', fontSize: 16,
                  opacity: 0.8,
                }}
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 flex gap-1.5" style={{ transform: 'translateX(-50%)' }}>
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSlide(i); }}
                  style={{
                    width: i === slide ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === slide ? 'var(--color-white)' : 'rgba(255,255,255,0.5)',
                    border: 'none', cursor: 'pointer',
                    transition: 'width 0.2s ease',
                    padding: 0,
                  }}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex items-center justify-center"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)',
              border: 'none', cursor: 'pointer',
              color: 'white', fontSize: 14,
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2
              className="text-xl leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {item.name}
            </h2>
            <span
              className="shrink-0 text-xl font-semibold"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {item.price.toFixed(1).replace('.', ',')} €
            </span>
          </div>

          <div
            className="mb-4"
            style={{ height: 1, background: 'var(--color-border)' }}
          />

          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
          >
            {item.description}
          </p>

          {/* Allergens placeholder */}
          <div
            className="mt-5 px-4 py-3 rounded-lg"
            style={{ background: '#faf8f4', border: '1px solid var(--color-border)' }}
          >
            <p
              className="text-xs font-semibold tracking-widest mb-1"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              ALÉRGENOS
            </p>
            <p
              className="text-xs"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              Gluten, Lácteos. Consulta con nuestro equipo si tienes otras alergias.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
