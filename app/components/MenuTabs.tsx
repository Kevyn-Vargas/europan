'use client';

import { useState } from 'react';
import MenuItem, { MenuItemData } from './MenuItem';
import ProductModal from './ProductModal';

interface Category {
  id: string;
  label: string;
  items: MenuItemData[];
}

interface MenuTabsProps {
  categories: Category[];
}

export default function MenuTabs({ categories }: MenuTabsProps) {
  const [active, setActive] = useState(categories[0]?.id ?? '');
  const [selected, setSelected] = useState<MenuItemData | null>(null);

  const current = categories.find((c) => c.id === active);

  return (
    <>
      <div>
        {/* Tab bar */}
        <div
          className="flex gap-0 overflow-x-auto mb-10 sticky top-var(--nav-height) z-40 bg-white"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="relative px-5 py-4 text-xs tracking-[0.18em] font-semibold whitespace-nowrap transition-colors duration-200 shrink-0"
              style={{
                fontFamily: 'var(--font-body)',
                color: active === cat.id ? 'var(--color-text)' : 'var(--color-text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {cat.label}
              {active === cat.id && (
                <span
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: 2, background: 'var(--color-text)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {current && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {current.items
              .filter((item: any) => item.active !== false)
              .map((item) => (
                <MenuItem key={item.id} item={item} onSelect={() => { /* setSelected(item) */ }} />
              ))}
          </div>
        )}
      </div>

      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}