'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Send, CheckCircle } from 'lucide-react';

export function KontaktForma() {
  const [form, setForm] = useState({ ime: '', email: '', poruka: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ ime: '', email: '', poruka: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle size={48} className="text-primary" />
        <h3 className="text-xl font-bold">Poruka poslana!</h3>
        <p className="text-muted-foreground">Odgovoriti ćemo vam u najkraćem mogućem roku.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-primary underline underline-offset-4"
        >
          Pošalji novu poruku
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Ime i prezime</label>
          <input
            type="text"
            required
            placeholder="Vaše ime"
            value={form.ime}
            onChange={e => setForm(p => ({ ...p, ime: e.target.value }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Email adresa</label>
          <input
            type="email"
            required
            placeholder="vas@email.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Poruka</label>
        <textarea
          required
          rows={5}
          placeholder="Opišite vaš projekt ili pitanje..."
          value={form.poruka}
          onChange={e => setForm(p => ({ ...p, poruka: e.target.value }))}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-destructive">Slanje nije uspjelo. Pokušajte ponovo.</p>
      )}
      <Button type="submit" size="lg" className="gap-2" disabled={status === 'loading'}>
        <Send size={16} />
        {status === 'loading' ? 'Slanje...' : 'Pošalji poruku'}
      </Button>
    </form>
  );
}
