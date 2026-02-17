'use client';

import Link from 'next/link';
import { useAdmin } from '../../lib/admin-context';
import { StatsCard } from '../../components/admin/StatsCard';
import { formatPrice } from '../../lib/utils';
import { ProjectsTable } from '../../components/admin/ProjectsTable';

const CATEGORIES = ['Moderni', 'Alpski', 'Mediteranski', 'Mala Kuća'] as const;

export default function AdminDashboard() {
  const { projects, upiti, chatSesije } = useAdmin();

  const total = projects.length;
  const featured = projects.filter((p) => p.featured).length;
  const avgPrice = total > 0
    ? Math.round(projects.reduce((sum, p) => sum + p.price, 0) / total)
    : 0;

  const byCategory = CATEGORIES.map((cat) => ({
    cat,
    count: projects.filter((p) => p.category === cat).length,
  }));

  const noviUpiti = upiti.filter((u) => u.status === 'novi').length;
  const ukupnoUpita = upiti.length;
  const ukupnoChatPoruka = chatSesije.reduce((sum, s) => sum + s.poruke.length, 0);

  const recent = [...projects].slice(0, 5);
  const recentUpiti = [...upiti].slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Pregled projekata i statistike</p>
      </div>

      {/* Projekti stats */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Projekti</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard icon="🏠" label="Ukupno projekata" value={total} />
          <StatsCard icon="★" label="Featured" value={featured} />
          <StatsCard icon="💰" label="Prosječna cijena" value={formatPrice(avgPrice)} />
          {byCategory.map(({ cat, count }) => (
            <StatsCard key={cat} label={cat} value={count} sub="projekata" />
          ))}
        </div>
      </div>

      {/* Upiti + Chat stats */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Komunikacija</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard icon="📩" label="Novi upiti" value={noviUpiti} sub="čekaju odgovor" />
          <StatsCard icon="📋" label="Ukupno upita" value={ukupnoUpita} />
          <StatsCard icon="💬" label="Chat sesija" value={chatSesije.length} />
          <StatsCard icon="🗨️" label="Chat poruka" value={ukupnoChatPoruka} sub="ukupno" />
        </div>
      </div>

      {/* Tabele */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Nedavni projekti</h2>
            <Link href="/admin/projekti" className="text-sm text-amber-600 hover:underline">
              Vidi sve →
            </Link>
          </div>
          <ProjectsTable projects={recent} limit={5} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Nedavni upiti</h2>
            <Link href="/admin/upiti" className="text-sm text-amber-600 hover:underline">
              Vidi sve →
            </Link>
          </div>
          <div className="space-y-3">
            {recentUpiti.map((u) => (
              <div key={u.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs flex-shrink-0">
                  {u.ime.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-900">{u.ime}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                      u.status === 'novi' ? 'bg-amber-100 text-amber-800' :
                      u.status === 'odgovoreno' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {u.status === 'novi' ? 'Novi' : u.status === 'odgovoreno' ? 'Odgovoreno' : 'Arhivirano'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{u.poruka}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
