'use client';

import { useState } from 'react';

export interface MenuItemData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  active?: boolean;
}

interface MenuItemProps {
  item: MenuItemData;
  onSelect: (item: MenuItemData) => void;
}

export default function MenuItem({ item, onSelect }: MenuItemProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = item.image && !imgFailed;

  return (
    <div
      className="flex items-start gap-4 py-5 cursor-pointer group"
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
    >
      {/* Thumbnail — solo si hay imagen y cargó bien */}
      {showImage && (
        <div
          className="shrink-0 rounded overflow-hidden transition-transform duration-200 group-hover:scale-105"
          style={{ width: 120, height: 120, marginTop: '20px' }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
            onError={() => setImgFailed(true)}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-2xl tracking-wide leading-tight transition-opacity group-hover:opacity-60"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {item.name}
          </h3>
          <span
            className="shrink-0 text-base"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
          >
            ${item.price / 1000}
          </span>
        </div>
        <div
          className="my-1.5"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, var(--color-border-dark), transparent)',
          }}
        />
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', marginTop: '10px' }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
