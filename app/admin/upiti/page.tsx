'use client';

import { useState } from 'react';
import { useAdmin, Upit } from '../../../lib/admin-context';

const STATUS_LABELS: Record<Upit['status'], string> = {
  novi: 'Novi',
  odgovoreno: 'Odgovoreno',
  arhivirano: 'Arhivirano',
};

const STATUS_COLORS: Record<Upit['status'], string> = {
  novi: 'bg-amber-100 text-amber-800',
  odgovoreno: 'bg-green-100 text-green-800',
  arhivirano: 'bg-gray-100 text-gray-500',
};

function formatDatum(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' u ' + d.toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' });
}

export default function UpitiPage() {
  const { upiti, updateUpit } = useAdmin();
  const [filter, setFilter] = useState<Upit['status'] | 'svi'>('svi');
  const [otvoren, setOtvoren] = useState<string | null>(null);

  const filtered = filter === 'svi' ? upiti : upiti.filter((u) => u.status === filter);
  const counts = {
    svi: upiti.length,
    novi: upiti.filter((u) => u.status === 'novi').length,
    odgovoreno: upiti.filter((u) => u.status === 'odgovoreno').length,
    arhivirano: upiti.filter((u) => u.status === 'arhivirano').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upiti</h1>
        <p className="text-gray-500 text-sm mt-1">{counts.novi} novih upita</p>
      </div>

      {/* Filter tabovi */}
      <div className="flex gap-2 flex-wrap">
        {(['svi', 'novi', 'odgovoreno', 'arhivirano'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === s ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'svi' ? 'Svi' : STATUS_LABELS[s]}
            <span className="ml-1.5 text-xs opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Lista upita */}
      <div className="space-y-3">
        {filtered.map((upit) => (
          <div
            key={upit.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setOtvoren(otvoren === upit.id ? null : upit.id)}
            >
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm flex-shrink-0">
                {upit.ime.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{upit.ime}</span>
                  {upit.projekat && (
                    <span className="text-xs text-gray-400">— {upit.projekat}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{upit.poruka}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[upit.status]}`}>
                  {STATUS_LABELS[upit.status]}
                </span>
                <span className="text-xs text-gray-400">{formatDatum(upit.datum)}</span>
                <span className="text-gray-400 text-sm">{otvoren === upit.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {/* Detalji */}
            {otvoren === upit.id && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <div className="flex gap-8 mb-3 text-sm">
                  <div>
                    <span className="text-gray-400">Email: </span>
                    <a href={`mailto:${upit.email}`} className="text-amber-600 hover:underline">{upit.email}</a>
                  </div>
                  {upit.projekat && (
                    <div>
                      <span className="text-gray-400">Projekat: </span>
                      <span className="text-gray-700">{upit.projekat}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3 mb-4">{upit.poruka}</p>
                <div className="flex gap-2">
                  {upit.status !== 'odgovoreno' && (
                    <button
                      onClick={() => updateUpit(upit.id, 'odgovoreno')}
                      className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs rounded-lg font-medium transition-colors"
                    >
                      ✓ Označi kao odgovoreno
                    </button>
                  )}
                  {upit.status !== 'arhivirano' && (
                    <button
                      onClick={() => updateUpit(upit.id, 'arhivirano')}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-lg font-medium transition-colors"
                    >
                      Arhiviraj
                    </button>
                  )}
                  {upit.status === 'arhivirano' && (
                    <button
                      onClick={() => updateUpit(upit.id, 'novi')}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs rounded-lg font-medium transition-colors"
                    >
                      Vrati u nove
                    </button>
                  )}
                  <a
                    href={`mailto:${upit.email}?subject=Re: Upit sa Modekto.ba`}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded-lg font-medium transition-colors"
                  >
                    Odgovori emailom
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 py-12 text-center">
            <p className="text-gray-400">Nema upita u ovoj kategoriji.</p>
          </div>
        )}
      </div>
    </div>
  );
}
