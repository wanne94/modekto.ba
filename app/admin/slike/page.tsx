'use client';

import { useState } from 'react';
import { useAdmin } from '../../../lib/admin-context';
import { HouseDesign } from '../../../types';

type FilterTip = 'sve' | 'glavne' | 'galerija' | 'tlocrti';

interface SlikaItem {
  url: string;
  tip: 'glavna' | 'galerija' | 'tlocrt';
  projekat: string;
  kategorija: HouseDesign['category'];
  projektId: string;
}

export default function SlikePage() {
  const { projects } = useAdmin();
  const [filter, setFilter] = useState<FilterTip>('sve');
  const [odabrana, setOdabrana] = useState<SlikaItem | null>(null);
  const [filterKat, setFilterKat] = useState<HouseDesign['category'] | 'Sve'>('Sve');

  const sve: SlikaItem[] = [];
  for (const p of projects) {
    sve.push({ url: p.imageUrl, tip: 'glavna', projekat: p.title, kategorija: p.category, projektId: p.id });
    for (const img of p.images ?? []) {
      sve.push({ url: img, tip: 'galerija', projekat: p.title, kategorija: p.category, projektId: p.id });
    }
    if (p.floorPlanUrl) {
      sve.push({ url: p.floorPlanUrl, tip: 'tlocrt', projekat: p.title, kategorija: p.category, projektId: p.id });
    }
  }

  const prikazane = sve.filter((s) => {
    const tipOk = filter === 'sve' || (filter === 'glavne' && s.tip === 'glavna') ||
      (filter === 'galerija' && s.tip === 'galerija') || (filter === 'tlocrti' && s.tip === 'tlocrt');
    const katOk = filterKat === 'Sve' || s.kategorija === filterKat;
    return tipOk && katOk;
  });

  const brGlavnih = sve.filter((s) => s.tip === 'glavna').length;
  const brGalerija = sve.filter((s) => s.tip === 'galerija').length;
  const brTlocrta = sve.filter((s) => s.tip === 'tlocrt').length;

  const TIP_BADGE: Record<string, string> = {
    glavna: 'bg-amber-100 text-amber-700',
    galerija: 'bg-blue-100 text-blue-700',
    tlocrt: 'bg-purple-100 text-purple-700',
  };
  const TIP_LABEL: Record<string, string> = {
    glavna: 'Glavna',
    galerija: 'Galerija',
    tlocrt: 'Tlocrt',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Slike</h1>
        <p className="text-gray-500 text-sm mt-1">
          {sve.length} ukupno · {brGlavnih} glavnih · {brGalerija} galerija · {brTlocrta} tlocrta
        </p>
      </div>

      {/* Filteri */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          {([
            ['sve', `Sve (${sve.length})`],
            ['glavne', `Glavne (${brGlavnih})`],
            ['galerija', `Galerija (${brGalerija})`],
            ['tlocrti', `Tlocrti (${brTlocrta})`],
          ] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === val ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['Sve', 'Moderni', 'Alpski', 'Mediteranski', 'Mala Kuća'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilterKat(k)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filterKat === k ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Grid slika */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {prikazane.map((s, i) => (
          <div
            key={i}
            className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square cursor-pointer"
            onClick={() => setOdabrana(s)}
          >
            <img
              src={s.url}
              alt={s.projekat}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
              <p className="text-white text-xs font-medium truncate">{s.projekat}</p>
            </div>
            <div className="absolute top-2 left-2">
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${TIP_BADGE[s.tip]}`}>
                {TIP_LABEL[s.tip]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {prikazane.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 py-12 text-center">
          <p className="text-gray-400">Nema slika za odabrane filtere.</p>
        </div>
      )}

      {/* Lightbox */}
      {odabrana && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setOdabrana(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={odabrana.url}
                alt={odabrana.projekat}
                className="w-full max-h-[60vh] object-contain bg-gray-900"
              />
              <button
                onClick={() => setOdabrana(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{odabrana.projekat}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TIP_BADGE[odabrana.tip]}`}>
                    {TIP_LABEL[odabrana.tip]}
                  </span>
                  <span className="text-xs text-gray-400">{odabrana.kategorija}</span>
                </div>
              </div>
              <a
                href={odabrana.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                Otvori ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
