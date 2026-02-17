'use client';

import { useState } from 'react';
import { useAdmin } from '../../../lib/admin-context';

function formatDatum(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' u ' + d.toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage() {
  const { chatSesije } = useAdmin();
  const [aktivna, setAktivna] = useState<string>(chatSesije[0]?.id ?? '');

  const sesija = chatSesije.find((s) => s.id === aktivna);
  const ukupnoPoruka = chatSesije.reduce((sum, s) => sum + s.poruke.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chat historija</h1>
        <p className="text-gray-500 text-sm mt-1">{chatSesije.length} sesija · {ukupnoPoruka} poruka ukupno</p>
      </div>

      <div className="flex gap-5 h-[600px]">
        {/* Sidebar sesija */}
        <div className="w-72 flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sesije</p>
          </div>
          {chatSesije.map((s) => (
            <button
              key={s.id}
              onClick={() => setAktivna(s.id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                aktivna === s.id ? 'bg-amber-50 border-l-2 border-l-amber-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-gray-400">{formatDatum(s.datum)}</span>
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-1.5 py-0.5">{s.poruke.length}</span>
              </div>
              {s.projekat && (
                <p className="text-xs font-medium text-amber-600">{s.projekat}</p>
              )}
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {s.poruke[0]?.content ?? '—'}
              </p>
            </button>
          ))}
        </div>

        {/* Prikaz poruka */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          {sesija ? (
            <>
              {/* Header sesije */}
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {sesija.projekat ? `Sesija o: ${sesija.projekat}` : 'Opći upit'}
                  </p>
                  <p className="text-xs text-gray-400">{formatDatum(sesija.datum)} · {sesija.poruke.length} poruka</p>
                </div>
              </div>

              {/* Poruke */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {sesija.poruke.map((p) => (
                  <div key={p.id} className={`flex ${p.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                      p.role === 'user'
                        ? 'bg-amber-500 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      <p>{p.content}</p>
                      <p className={`text-xs mt-1 ${p.role === 'user' ? 'text-amber-200' : 'text-gray-400'}`}>
                        {p.role === 'user' ? 'Posjetilac' : 'AI Asistent'} · {p.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Odaberi sesiju sa lijeve strane</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
