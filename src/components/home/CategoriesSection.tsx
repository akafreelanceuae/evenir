import React from 'react';
import { VENDOR_CATEGORIES } from '../../constants';

interface CategoriesSectionProps {
  onSelectCategory?: (categoryId: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => (
  <section>
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Browse by service</h2>
      {onSelectCategory && (
        <button
          className="text-sm text-teal-300"
          onClick={() => onSelectCategory('ALL')}
        >
          View all
        </button>
      )}
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {VENDOR_CATEGORIES.map(category => (
        <button
          key={category.id}
          className="rounded-2xl border border-white/15 bg-white/5 p-6 text-left transition hover:border-teal-300 hover:bg-white/10"
          onClick={() => onSelectCategory?.(category.id)}
        >
          <p className="text-sm uppercase tracking-wide text-white/60">{category.label}</p>
          <p className="mt-2 text-lg font-semibold">{category.description}</p>
        </button>
      ))}
    </div>
  </section>
);

export default CategoriesSection;
