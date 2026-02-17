'use client';

import { useAdmin } from '../../../lib/admin-context';
import { HouseDesign } from '../../../types';
import { formatPrice } from '../../../lib/utils';

const CATEGORIES: HouseDesign['category'][] = ['Moderni', 'Alpski', 'Mediteranski', 'Mala Kuća'];

const CATEGORY_ICONS: Record<string, string> = {
  Moderni: '🏙️',
  Alpski: '🏔️',
  Mediteranski: '🌊',
  'Mala Kuća': '🏡',
};

export default function KategorijaPage() {
  const { projects } = useAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kategorije</h1>
        <p className="text-gray-500 text-sm mt-1">Pregled projekata po kategorijama</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => {
          const catProjects = projects.filter((p) => p.category === cat);
          const featured = catProjects.filter((p) => p.featured);
          const prices = catProjects.map((p) => p.price);
          const min = prices.length ? Math.min(...prices) : 0;
          const max = prices.length ? Math.max(...prices) : 0;

          return (
            <div key={cat} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                <div>
                  <h2 className="font-bold text-gray-900">{cat}</h2>
                  <p className="text-sm text-gray-500">{catProjects.length} projekata</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Ukupno</p>
                  <p className="font-bold text-gray-900">{catProjects.length}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Min cijena</p>
                  <p className="font-bold text-gray-900">{formatPrice(min)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Max cijena</p>
                  <p className="font-bold text-gray-900">{formatPrice(max)}</p>
                </div>
              </div>

              {featured.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Featured projekti</p>
                  <div className="space-y-2">
                    {featured.slice(0, 3).map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                          <p className="text-xs text-gray-500">{formatPrice(p.price)} · {p.sqMeters} m²</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
