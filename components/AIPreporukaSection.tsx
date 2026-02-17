'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const pitanja = [
  {
    id: 1,
    tekst: 'Kolika je površina parcele?',
    opcije: ['Do 500 m²', '500–1000 m²', '1000–2000 m²', 'Više od 2000 m²'],
  },
  {
    id: 2,
    tekst: 'Koji stil vam se najviše sviđa?',
    opcije: ['Alpski / planinarski', 'Moderni / minimalistički', 'Mediteranski', 'Tradicional'],
  },
  {
    id: 3,
    tekst: 'Broj korisnika vikendice?',
    opcije: ['1–2 osobe', '3–4 osobe', '5–6 osoba', '7+ osoba'],
  },
  {
    id: 4,
    tekst: 'Budžet za projekat?',
    opcije: ['Do 50€', '50–70€', '70–100€', 'Fleksibilan'],
  },
];

const stilMap: Record<string, string> = {
  'Alpski / planinarski': 'Alpski',
  'Moderni / minimalistički': 'Moderni',
  'Mediteranski': 'Mediteranski',
  'Tradicional': 'Mala Kuća',
};

export const AIPreporukaSection: React.FC = () => {
  const [trenutniKorak, setTrenutniKorak] = useState(0);
  const [odgovori, setOdgovori] = useState<string[]>([]);
  const [zavrsen, setZavrsen] = useState(false);

  const handleOdgovor = (opcija: string) => {
    const noviOdgovori = [...odgovori, opcija];
    setOdgovori(noviOdgovori);

    if (trenutniKorak + 1 < pitanja.length) {
      setTrenutniKorak(trenutniKorak + 1);
    } else {
      setZavrsen(true);
    }
  };

  const preporuceniStil = stilMap[odgovori[1]] ?? 'Moderni';
  const napredak = zavrsen ? 100 : (trenutniKorak / pitanja.length) * 100;

  const resetuj = () => {
    setTrenutniKorak(0);
    setOdgovori([]);
    setZavrsen(false);
  };

  return (
    <section id="ai-preporuka" className="py-24 bg-background border-y border-border">
      <div className="container px-4 md:px-8 mx-auto max-w-3xl">
        {/* Naslov */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Preporuka
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Pronađite projekt za vas
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Odgovorite na 4 pitanja i naš AI će preporučiti idealno arhitektonsko rješenje za vašu vikendicu.
          </p>
        </div>

        {/* Kviz kartica */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{zavrsen ? 'Završeno' : `Korak ${trenutniKorak + 1} od ${pitanja.length}`}</span>
              <span>{Math.round(napredak)}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${napredak}%` }}
              />
            </div>
          </div>

          {!zavrsen ? (
            <div>
              <h3 className="text-xl font-semibold mb-6">
                {pitanja[trenutniKorak].tekst}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pitanja[trenutniKorak].opcije.map((opcija) => (
                  <button
                    key={opcija}
                    onClick={() => handleOdgovor(opcija)}
                    className="text-left px-5 py-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium group"
                  >
                    <span className="flex items-center justify-between">
                      {opcija}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Vaša preporuka je spremna!</h3>
              <p className="text-muted-foreground mb-2">
                Na osnovu vaših odgovora preporučujemo:
              </p>
              <p className="text-primary font-semibold text-lg mb-6">
                {preporuceniStil} stil vikendice
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={`/?stil=${encodeURIComponent(preporuceniStil)}`}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Pogledaj projekte <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" onClick={resetuj} className="w-full sm:w-auto">
                  Ponovi kviz
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
