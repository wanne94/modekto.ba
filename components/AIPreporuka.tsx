'use client';

import React, { useState, useRef } from 'react';
import { MOCK_HOUSES } from '@/lib/projects';
import { HouseDesign } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Sparkles, Upload, X, Home, Loader2 } from 'lucide-react';

type Answers = {
  materijal: string;
  stil: string;
  osobe: string;
  terasa: string;
  grijanje: string;
  jacuzzi: string;
};

const INITIAL_ANSWERS: Answers = {
  materijal: '',
  stil: '',
  osobe: '',
  terasa: '',
  grijanje: '',
  jacuzzi: '',
};

const QUESTIONS = [
  {
    key: 'materijal',
    pitanje: 'Kakav materijal preferujete?',
    opcije: ['Sve od drveta', 'Kamen i drvo', 'Beton i staklo', 'Svejedno mi je'],
  },
  {
    key: 'stil',
    pitanje: 'Kakav vam je stil bliži?',
    opcije: ['Klasičan / rustikalan', 'Moderan / minimalistički', 'Mediteranski / topao', 'Nije bitno'],
  },
  {
    key: 'osobe',
    pitanje: 'Koliko osoba planira boraviti u kući?',
    opcije: ['1–2 osobe', '3–4 osobe', '5–6 osoba', '7+ osoba'],
  },
  {
    key: 'terasa',
    pitanje: 'Kakva vam je terasa potrebna?',
    opcije: ['Velika terasa za roštilj i druženje', 'Manja terasa za jutarnju kafu', 'Nije mi važna'],
  },
  {
    key: 'grijanje',
    pitanje: 'Kako planirate grijati / hladiti kuću?',
    opcije: ['Kamin ili peć na drva', 'Toplinska pumpa / klima', 'Solarna energija', 'Još nisam odlučio'],
  },
  {
    key: 'jacuzzi',
    pitanje: 'Želite li jacuzzi na terasi?',
    opcije: ['Da, obavezno!', 'Bilo bi lijepo', 'Ne treba mi'],
  },
] as const;

// Mapiranje odgovora na kategorije/features za filtriranje
const DRVO_FEATURES = ['Drvena fasada', 'Drveni elementi', 'Visoki stropovi', 'Kamin'];
const KAMEN_FEATURES = ['Kamena fasada', 'Kameni lukovi', 'Arkade'];
const MODERN_FEATURES = ['Ravni krov', 'Minimalistički dizajn', 'Automatizacija doma', 'Toplinska pumpa'];
const SOLAR_FEATURES = ['Solarna energija', 'Rekuperacija zraka'];
const TERASA_VELIKA = 20; // m²
const TERASA_MALA = 5;

function filterHouses(answers: Answers): HouseDesign[] {
  // Scoring umjesto hard filtriranja – dajemo bodove pa sortiramo
  const scored = MOCK_HOUSES.map(h => {
    let score = 0;

    // Materijal
    if (answers.materijal === 'Sve od drveta') {
      if (h.features?.some(f => DRVO_FEATURES.includes(f))) score += 3;
      if (['Alpski', 'Mala Kuća'].includes(h.category)) score += 1;
    } else if (answers.materijal === 'Kamen i drvo') {
      if (h.features?.some(f => KAMEN_FEATURES.includes(f))) score += 3;
      if (h.category === 'Mediteranski') score += 2;
    } else if (answers.materijal === 'Beton i staklo') {
      if (h.features?.some(f => MODERN_FEATURES.includes(f))) score += 3;
      if (h.category === 'Moderni') score += 2;
    } else {
      score += 1; // svejedno – svi dobijaju bod
    }

    // Stil
    if (answers.stil === 'Klasičan / rustikalan') {
      if (['Alpski'].includes(h.category)) score += 3;
      if (h.features?.some(f => ['Kamin', 'Kamenska peć', 'Rustikalni stil'].includes(f))) score += 2;
    } else if (answers.stil === 'Moderan / minimalistički') {
      if (h.category === 'Moderni') score += 3;
      if (h.features?.some(f => MODERN_FEATURES.includes(f))) score += 2;
    } else if (answers.stil === 'Mediteranski / topao') {
      if (h.category === 'Mediteranski') score += 4;
    } else {
      score += 1;
    }

    // Broj osoba → spavaće sobe
    if (answers.osobe === '1–2 osobe') {
      if (h.bedrooms <= 2) score += 3;
    } else if (answers.osobe === '3–4 osobe') {
      if (h.bedrooms === 2 || h.bedrooms === 3) score += 3;
      else if (h.bedrooms === 4) score += 1;
    } else if (answers.osobe === '5–6 osoba') {
      if (h.bedrooms >= 3) score += 3;
    } else if (answers.osobe === '7+ osoba') {
      if (h.bedrooms >= 4) score += 4;
    }

    // Terasa
    if (answers.terasa === 'Velika terasa za roštilj i druženje') {
      if ((h.terraceArea ?? 0) >= TERASA_VELIKA) score += 4;
      else if ((h.terraceArea ?? 0) >= TERASA_MALA) score += 1;
      else score -= 2;
    } else if (answers.terasa === 'Manja terasa za jutarnju kafu') {
      if ((h.terraceArea ?? 0) >= TERASA_MALA) score += 2;
    }
    // "Nije mi važna" – neutral

    // Grijanje
    if (answers.grijanje === 'Kamin ili peć na drva') {
      if (h.features?.some(f => ['Kamin', 'Drvo-pelet kotlovnica', 'Drvo-pelet grijanje', 'Kaminska peć'].includes(f))) score += 3;
    } else if (answers.grijanje === 'Toplinska pumpa / klima') {
      if (h.features?.some(f => ['Toplinska pumpa', 'Automatizacija doma'].includes(f))) score += 3;
      if (h.category === 'Moderni') score += 1;
    } else if (answers.grijanje === 'Solarna energija') {
      if (h.features?.some(f => SOLAR_FEATURES.includes(f))) score += 3;
    }

    // Jacuzzi – svi koji imaju veliku terasu su dobri kandidati
    if (answers.jacuzzi === 'Da, obavezno!' || answers.jacuzzi === 'Bilo bi lijepo') {
      if ((h.terraceArea ?? 0) >= 25) score += answers.jacuzzi === 'Da, obavezno!' ? 4 : 2;
      else if ((h.terraceArea ?? 0) >= 15) score += 1;
      else if (answers.jacuzzi === 'Da, obavezno!') score -= 1;
    }

    return { house: h, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(s => s.house);
}

export function AIPreporuka() {
  const [step, setStep] = useState(0); // 0 = intro, 1–6 = pitanja, 7 = upload, 8 = rezultati
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [aiKomentar, setAiKomentar] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HouseDesign[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const totalSteps = QUESTIONS.length + 1; // 6 pitanja + 1 upload

  function handleAnswer(key: keyof Answers, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setStep(s => s + 1);
  }

  function handleBack() {
    setStep(s => Math.max(0, s - 1));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = ev => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImage(null);
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function handleFinish() {
    setStep(8);
    const filtered = filterHouses(answers);
    setResults(filtered);
    setLoading(true);

    try {
      const imageBase64 = image ? image.split(',')[1] : undefined;
      const payload: Record<string, unknown> = {
        answers,
        imageBase64,
        mode: 'quiz',
      };
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setAiKomentar(data.reply || '');
    } catch {
      setAiKomentar('Nije moguće učitati AI komentar trenutno.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setStep(0);
    setAnswers(INITIAL_ANSWERS);
    setImage(null);
    setImageFile(null);
    setAiKomentar('');
    setResults([]);
  }

  const progress = step === 0 ? 0 : step === 8 ? 100 : Math.round(((step) / totalSteps) * 100);

  return (
    <section id="ai-preporuka" className="relative py-20 overflow-hidden bg-[#0f1117]">
      {/* Dekorativni blur krugovi u pozadini */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative container px-4 md:px-8 mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            AI Preporuka
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Neodlučni ste?</h2>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            Odgovorite na nekoliko pitanja i naš AI će vam pronaći projekte koji odgovaraju vašim potrebama.
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-white">
          {/* Progress bar */}
          {step > 0 && step < 8 && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Korak {step} od {totalSteps}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Intro */}
          {step === 0 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Pronađite pravi projekt za vas</h3>
              <p className="text-white/60 mb-8 max-w-sm mx-auto">
                Kroz 7 kratkih pitanja naš AI će analizirati vaše potrebe i preporučiti projekte koji odgovaraju vašem ukusu i budžetu.
              </p>
              <Button size="lg" onClick={() => setStep(1)} className="gap-2">
                Počni
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Pitanja 1-6 */}
          {step >= 1 && step <= 6 && (() => {
            const q = QUESTIONS[step - 1];
            const currentAnswer = answers[q.key as keyof Answers];
            return (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">{q.pitanje}</h3>
                <div className="grid gap-3">
                  {q.opcije.map(opcija => (
                    <button
                      key={opcija}
                      onClick={() => handleAnswer(q.key as keyof Answers, opcija)}
                      className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all font-medium text-sm hover:border-primary hover:bg-primary/10 ${
                        currentAnswer === opcija
                          ? 'border-primary bg-primary/20 text-primary'
                          : 'border-white/10 bg-white/5 text-white/80'
                      }`}
                    >
                      {opcija}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-start">
                  <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1 text-white/40 hover:text-white/70">
                    <ChevronLeft className="w-4 h-4" />
                    Nazad
                  </Button>
                </div>
              </div>
            );
          })()}

          {/* Korak 7 – Upload slike */}
          {step === 7 && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">Imate sliku terena? (opcionalno)</h3>
              <p className="text-white/60 text-sm mb-6">
                Uploadajte fotografiju vaše parcele ili terena – AI će je analizirati i dati personalizovanu preporuku.
              </p>

              {!image ? (
                <div
                  className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary/60 hover:bg-muted/30 transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-10 h-10 text-white/40 mx-auto mb-3" />
                  <p className="text-sm text-white/60">Kliknite za upload ili prevucite sliku ovdje</p>
                  <p className="text-xs text-white/30 mt-1">JPG, PNG, WebP do 10MB</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={image} alt="Teren" className="w-full h-48 object-cover rounded-xl" />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full p-1 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1 text-white/40 hover:text-white/70">
                  <ChevronLeft className="w-4 h-4" />
                  Nazad
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleFinish}>
                    Preskoči
                  </Button>
                  <Button onClick={handleFinish} className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Prikaži preporuke
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Rezultati */}
          {step === 8 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-white">Vaše preporuke</h3>
              </div>

              {/* AI komentar */}
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 text-sm text-white/80">
                {loading ? (
                  <div className="flex items-center gap-2 text-white/50">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI analizira vaše odgovore...
                  </div>
                ) : (
                  <p>{aiKomentar}</p>
                )}
              </div>

              {/* Projekti */}
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <Home className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60 mb-2">Nismo pronašli projekte koji tačno odgovaraju svim kriterijima.</p>
                  <p className="text-sm text-white/40">Pokušajte s manje ograničenja ili pregledajte sve projekte.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {results.map(house => (
                    <a
                      key={house.id}
                      href={`/projekt/${house.id}`}
                      className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg transition-all group"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <img
                          src={house.imageUrl}
                          alt={house.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-white/30 text-[9px] font-bold tracking-widest uppercase select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                            MODEKTO.BA
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm text-white group-hover:text-primary transition-colors">{house.title}</h4>
                          <span className="text-primary font-bold text-sm whitespace-nowrap">{house.price}€/m²</span>
                        </div>
                        <p className="text-xs text-white/50 mt-1 line-clamp-2">{house.description}</p>
                        <div className="flex gap-3 mt-2 text-xs text-white/40">
                          <span>{house.bedrooms} sobe</span>
                          <span>·</span>
                          <span>{house.sqMeters}m²</span>
                          <span>·</span>
                          <span>{house.category}</span>
                          {house.garage && <><span>·</span><span>Garaža</span></>}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors self-center flex-shrink-0" />
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  Počni iznova
                </Button>
                <a href="#kolekcija" className="flex-1">
                  <Button className="w-full">Pregledaj sve projekte</Button>
                </a>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
