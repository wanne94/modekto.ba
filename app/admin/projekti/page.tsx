'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '../../../lib/admin-context';
import { ProjectsTable } from '../../../components/admin/ProjectsTable';
import { HouseDesign } from '../../../types';

const CATEGORIES: (HouseDesign['category'] | 'Sve')[] = ['Sve', 'Moderni', 'Alpski', 'Mediteranski', 'Mala Kuća'];

export default function ProjektiPage() {
  const { projects } = useAdmin();
  const [activeCategory, setActiveCategory] = useState<HouseDesign['category'] | 'Sve'>('Sve');

  const filtered = activeCategory === 'Sve'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projekti</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} ukupno</p>
        </div>
        <Link
          href="/admin/projekti/novi"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg text-sm transition-colors"
        >
          + Dodaj projekt
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
            {cat !== 'Sve' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({projects.filter((p) => p.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <ProjectsTable projects={filtered} />
      </div>
    </div>
  );
}
