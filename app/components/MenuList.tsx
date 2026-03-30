'use client';

import { useState } from 'react';
import MenuItem, { MenuItemData } from './MenuItem';
import ProductModal from './ProductModal';

interface Category {
  id: string;
  label: string;
  items: MenuItemData[];
}

interface MenuListProps {
  categories: Category[];
}

export default function MenuList({ categories }: MenuListProps) {
  const [selected, setSelected] = useState<MenuItemData | null>(null);

  return (
    <>
      {/* All categories in a single scrollable column */}
      <div className="max-w-4/5" style={{ margin: 'auto' }}>
        {categories.map((cat, ci) => (
          <section
            key={cat.id}
            style={{ marginTop: '50px', marginBottom: '50px' }}
          >
            {/* Section heading */}
            <div
              className="flex items-center gap-4 mb-6"
            >
              <h2
                className="text-xs tracking-[0.3em] shrink-0"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', margin: ' 30px 0' }}
              >
                {cat.label}
              </h2>
              <div
                className="flex-1"
                style={{ height: 1, background: 'var(--color-border)' }}
              />
            </div>

            {/* 2-column grid, centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
              {cat.items.filter(item => item.active !== false).map((item) => (
                <MenuItem key={item.id} item={item} onSelect={() => { /* setSelected(item) */ }} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Product modal */}
      <ProductModal
        item={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
