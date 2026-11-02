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

// Agrupa los items por su campo opcional "group", respetando el orden del JSON.
// Si ningún item de la categoría trae "group", devuelve un solo bloque sin subtítulo,
// así que Margheritas, Clásicas y Pasta se ven igual que antes.
function groupItems(items: MenuItemData[]) {
  const groups = new Map<string, MenuItemData[]>();

  items
    .filter((item) => item.active !== false)
    .forEach((item) => {
      const key = item.group ?? '';
      groups.set(key, [...(groups.get(key) ?? []), item]);
    });

  return Array.from(groups, ([label, groupedItems]) => ({
    label,
    items: groupedItems,
  }));
}

export default function MenuList({ categories }: MenuListProps) {
  const [selected, setSelected] = useState<MenuItemData | null>(null);

  return (
    <>
      {/* All categories in a single scrollable column */}
      <div className="max-w-4/5" style={{ margin: 'auto' }}>
        {categories.map((cat) => (
          <section
            key={cat.id}
            style={{ marginTop: '50px', marginBottom: '50px' }}
          >
            {/* Section heading */}
            <div className="flex items-center gap-4 mb-6">
              <h2
                className="text-xs tracking-[0.3em] shrink-0"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-muted)',
                  margin: ' 30px 0',
                }}
              >
                {cat.label}
              </h2>
              <div
                className="flex-1"
                style={{ height: 1, background: 'var(--color-border)' }}
              />
            </div>

            {/* Subsecciones (o un solo bloque si la categoría no usa "group") */}
            {groupItems(cat.items).map((group) => (
              <div
                key={group.label || cat.id}
                style={{ marginBottom: group.label ? '30px' : 0 }}
              >
                {group.label && (
                  <h3
                    className="text-lg tracking-wide"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-accent)',
                      margin: '20px 0 6px',
                    }}
                  >
                    {group.label}
                  </h3>
                )}

                {/* 2-column grid, centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
                  {group.items.map((item) => (
                    <MenuItem key={item.id} item={item} onSelect={setSelected} />
                  ))}
                </div>
              </div>
            ))}
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
