'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronRight, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProjectById, getSimilarProjects, UPSELL_OPTIONS } from '@/lib/projects';
import { saveCheckoutBasket, clearCheckoutBasket } from '@/lib/checkout-state';
import { formatPrice } from '@/lib/utils';
import type { HouseDesign } from '@/types';

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [project, setProject] = useState<HouseDesign | null>(null);
  const [similarProjects, setSimilarProjects] = useState<HouseDesign[]>([]);
  const [step, setStep] = useState<Step>(1);
  const [upsellIds, setUpsellIds] = useState<string[]>([]);
  const [crossSellIds, setCrossSellIds] = useState<string[]>([]);
  const [form, setForm] = useState({ ime: '', email: '', telefon: '' });

  useEffect(() => {
    const p = getProjectById(id);
    if (!p) {
      router.push('/');
      return;
    }
    setProject(p);
    setSimilarProjects(getSimilarProjects(p, 3));
  }, [id, router]);

  if (!project) return null;

  const upsellTotal = UPSELL_OPTIONS.filter(o => upsellIds.includes(o.id)).reduce((s, o) => s + o.price, 0);
  const crossSellTotal = similarProjects.filter(p => crossSellIds.includes(p.id)).reduce((s, p) => s + p.price, 0);
  const total = project.price + upsellTotal + crossSellTotal;

  const toggleUpsell = (id: string) =>
    setUpsellIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleCrossSell = (id: string) =>
    setCrossSellIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleFinish = () => {
    saveCheckoutBasket({ projectId: project.id, upsellIds, crossSellIds });
    const dodaci = UPSELL_OPTIONS.filter(o => upsellIds.includes(o.id)).map(o => o.label);
    const crossSell = similarProjects.filter(p => crossSellIds.includes(p.id)).map(p => p.title);
    alert(
      `✅ Hvala, ${form.ime}!\n\nNarudžba primljena:\n• ${project.title}\n` +
      (dodaci.length ? `• Dodaci: ${dodaci.join(', ')}\n` : '') +
      (crossSell.length ? `• Dodatni projekti: ${crossSell.join(', ')}\n` : '') +
      `\nUkupno: ${formatPrice(total)}\n\nPotvrda će biti poslana na ${form.email}.`
    );
    clearCheckoutBasket();
    router.push('/');
  };

  const stepLabels = ['Tvoj projekat', 'Slični projekti', 'Tvoji podaci'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link href={`/projekat/${project.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={14} />
          Nazad na projekat
        </Link>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {stepLabels.map((label, i) => {
            const n = (i + 1) as Step;
            const active = step === n;
            const done = step > n;
            return (
              <div key={n} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                    ${done ? 'bg-green-500 text-white' : active ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                    {done ? <Check size={14} /> : n}
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block ${active ? 'text-orange-400' : 'text-muted-foreground'}`}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`w-16 sm:w-24 h-px mx-2 mb-4 ${done ? 'bg-green-500' : 'bg-border'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* KORAK 1 */}
            {step === 1 && (
              <>
                <h1 className="text-2xl font-bold">Tvoj projekat + dodaci</h1>

                {/* Selected project card */}
                <div className="flex gap-4 p-4 rounded-xl border border-border bg-muted/20">
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.category} • {project.sqMeters} m²</p>
                    <p className="text-lg font-bold text-primary mt-1">{formatPrice(project.price)}</p>
                  </div>
                </div>

                {/* Upsell options */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">Opcijski dodaci</h2>
                  <div className="space-y-2">
                    {UPSELL_OPTIONS.map(opt => {
                      const sel = upsellIds.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleUpsell(opt.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all
                            ${sel ? 'border-orange-500 bg-orange-500/10 ring-1 ring-orange-500' : 'border-border bg-muted/20 hover:border-orange-400/50'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                                ${sel ? 'bg-orange-500 border-orange-500' : 'border-muted-foreground'}`}>
                                {sel && <Check size={12} className="text-white" />}
                              </div>
                              <span className="font-medium">{opt.label}</span>
                            </div>
                            <span className="font-bold text-orange-400">+{formatPrice(opt.price)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 ml-8">{opt.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
                >
                  Nastavi <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* KORAK 2 */}
            {step === 2 && (
              <>
                <h1 className="text-2xl font-bold">Možda te zanima i...</h1>
                <p className="text-muted-foreground text-sm">Projekti iz iste kategorije koje možeš dodati uz odabrani.</p>

                {similarProjects.length === 0 ? (
                  <p className="text-muted-foreground">Nema sličnih projekata.</p>
                ) : (
                  <div className="space-y-3">
                    {similarProjects.map(sp => {
                      const sel = crossSellIds.includes(sp.id);
                      return (
                        <div key={sp.id} className={`flex gap-4 p-4 rounded-xl border transition-all
                          ${sel ? 'border-orange-500 bg-orange-500/10 ring-1 ring-orange-500' : 'border-border bg-muted/20'}`}>
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                            <Image src={sp.imageUrl} alt={sp.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{sp.title}</p>
                            <p className="text-sm text-muted-foreground">{sp.sqMeters} m² • {sp.bedrooms} sobe</p>
                            <p className="font-bold text-primary">{formatPrice(sp.price)}</p>
                          </div>
                          <button
                            onClick={() => toggleCrossSell(sp.id)}
                            className={`self-center shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                              ${sel ? 'bg-orange-500 text-white' : 'border border-border hover:border-orange-400 text-foreground'}`}
                          >
                            {sel ? 'Dodano ✓' : 'Dodaj'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-6 rounded-xl border border-border hover:border-foreground/40 font-semibold transition-colors"
                  >
                    Nazad
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
                  >
                    {crossSellIds.length > 0 ? 'Nastavi' : 'Preskoči'} <ChevronRight size={18} />
                  </button>
                </div>
              </>
            )}

            {/* KORAK 3 */}
            {step === 3 && (
              <>
                <h1 className="text-2xl font-bold">Tvoji podaci</h1>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ime i prezime *</label>
                    <input
                      type="text"
                      value={form.ime}
                      onChange={e => setForm(f => ({ ...f, ime: e.target.value }))}
                      placeholder="npr. Amar Hodžić"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email adresa *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="npr. amar@email.ba"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefon <span className="text-muted-foreground">(opciono)</span></label>
                    <input
                      type="tel"
                      value={form.telefon}
                      onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
                      placeholder="+387 61 ..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 px-6 rounded-xl border border-border hover:border-foreground/40 font-semibold transition-colors"
                  >
                    Nazad
                  </button>
                  <button
                    onClick={handleFinish}
                    disabled={!form.ime || !form.email}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                  >
                    <ShoppingCart size={18} />
                    Završi kupovinu
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-5 rounded-2xl border border-border bg-muted/10 space-y-4">
              <h3 className="font-semibold text-base">Pregled narudžbe</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground truncate mr-2">{project.title}</span>
                  <span className="shrink-0 font-medium">{formatPrice(project.price)}</span>
                </div>

                {UPSELL_OPTIONS.filter(o => upsellIds.includes(o.id)).map(o => (
                  <div key={o.id} className="flex justify-between text-orange-400">
                    <span className="truncate mr-2">{o.label}</span>
                    <span className="shrink-0">+{o.price} €</span>
                  </div>
                ))}

                {similarProjects.filter(p => crossSellIds.includes(p.id)).map(p => (
                  <div key={p.id} className="flex justify-between text-orange-400">
                    <span className="truncate mr-2">{p.title}</span>
                    <span className="shrink-0">+{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ukupno</span>
                <span className="text-2xl font-extrabold text-primary">{formatPrice(total)}</span>
              </div>

              {/* Mobile CTA */}
              {step < 3 && (
                <button
                  onClick={() => setStep(s => (s < 3 ? (s + 1) as Step : s))}
                  className="w-full lg:hidden flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
                >
                  Nastavi <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
