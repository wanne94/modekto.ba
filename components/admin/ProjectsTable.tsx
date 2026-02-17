'use client';

import Link from 'next/link';
import { HouseDesign } from '../../types';
import { useAdmin } from '../../lib/admin-context';
import { formatPrice } from '../../lib/utils';

interface ProjectsTableProps {
  projects: HouseDesign[];
  limit?: number;
}

export function ProjectsTable({ projects, limit }: ProjectsTableProps) {
  const { deleteProject } = useAdmin();
  const displayed = limit ? projects.slice(0, limit) : projects;

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Obrisati projekat "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="pb-3 pr-4 font-medium">Naslov</th>
            <th className="pb-3 pr-4 font-medium">Kategorija</th>
            <th className="pb-3 pr-4 font-medium">Cijena/m²</th>
            <th className="pb-3 pr-4 font-medium">m²</th>
            <th className="pb-3 pr-4 font-medium">Featured</th>
            <th className="pb-3 font-medium">Akcije</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {displayed.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 pr-4 font-medium text-gray-900 max-w-[180px] truncate">{p.title}</td>
              <td className="py-3 pr-4">
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">{p.category}</span>
              </td>
              <td className="py-3 pr-4">{formatPrice(p.price)}</td>
              <td className="py-3 pr-4">{p.sqMeters} m²</td>
              <td className="py-3 pr-4">
                {p.featured ? (
                  <span className="text-amber-500 font-semibold text-xs">★ Da</span>
                ) : (
                  <span className="text-gray-400 text-xs">Ne</span>
                )}
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projekti/${p.id}`}
                    className="text-xs px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    Uredi
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="text-xs px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  >
                    Obriši
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {displayed.length === 0 && (
        <p className="py-8 text-center text-gray-400 text-sm">Nema projekata.</p>
      )}
    </div>
  );
}
