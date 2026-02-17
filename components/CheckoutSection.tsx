'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { UPSELL_OPTIONS } from '../lib/projects';

interface Props {
  basePrice: number;
  projectTitle: string;
  projectId: string;
}

export function CheckoutSection({ basePrice, projectTitle, projectId }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const upsellTotal = UPSELL_OPTIONS
    .filter(o => selected.includes(o.id))
    .reduce((sum, o) => sum + o.price, 0);

  const total = basePrice + upsellTotal;

  const handleBuy = () => {
    // Placeholder – Stripe checkout ide ovdje
    alert(`Narudžba: ${projectTitle}\nUkupno: ${total} €\nDodaci: ${selected.join(', ') || 'nema'}`);
    setIsModalOpen(false);
  };

  const handleSkip = () => {
    alert(`Narudžba: ${projectTitle}\nUkupno: ${basePrice} €\nDodaci: nema`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 border-t pt-4 mt-2">
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-muted-foreground">Ukupno</span>
        <span className="text-2xl font-extrabold text-primary">{basePrice} €</span>
      </div>

      <Button size="lg" className="w-full gap-2 text-base" onClick={() => setIsModalOpen(true)}>
        <ShoppingCart size={18} />
        Kupi idejno rješenje
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
          <div className="bg-background rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Odaberite opcijske dodatke</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {UPSELL_OPTIONS.map(option => {
                const isSelected = selected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggle(option.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-muted/30 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <Plus size={10} className="text-primary-foreground" style={{ transform: 'rotate(45deg) scale(0.7)' }} />}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                      <span className="font-bold text-primary">+{option.price} €</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">{option.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <span className="text-sm text-muted-foreground">Ukupno</span>
              <div className="text-right">
                {upsellTotal > 0 && (
                  <div className="text-xs text-muted-foreground line-through">{basePrice} €</div>
                )}
                <span className="text-2xl font-extrabold text-primary">{total} €</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleSkip}>
                Preskoči
              </Button>
              <Button className="flex-1" onClick={handleBuy}>
                Potvrdi i kupi
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
