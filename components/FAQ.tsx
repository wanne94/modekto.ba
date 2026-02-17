'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'Da li mi treba urbanistička saglasnost za gradnju?',
    answer:
      'Da, urbanistička saglasnost je prvi korak prije bilo kakvog građevinskog zahvata. Naš idejni projekt možete koristiti kao osnovu pri podnošenju zahtjeva nadležnoj općini.',
  },
  {
    question: 'Da li mi treba građevinska dozvola?',
    answer:
      'Da, građevinska dozvola je obavezna za legalnu gradnju. Idejni projekt koji dobijate od nas predstavlja polaznu tačku za izradu glavnog projekta koji je potreban za ishođenje dozvole.',
  },
  {
    question: 'Kakva je procedura kupovine idejnog projekta?',
    answer:
      'Odaberete projekt koji vam se sviđa, kliknete "Naruči projekt" i u roku od nekoliko minuta dobijate PDF s tlocrtima i vizualizacijama na email. Brzo, jednostavno, bez čekanja.',
  },
  {
    question: 'Može li se idejni projekt napraviti posebno za nas?',
    answer: (
      <>
        Naravno! Svaki teren i svaka porodica su jedinstveni.{' '}
        <a href="/kontakt" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
          Kontaktirajte nas
        </a>{' '}
        putem kontakt stranice i dogovorićemo individualni pristup koji odgovara vašim potrebama i lokaciji.
      </>
    ),
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 border-b border-border">
      <div className="container px-4 md:px-8 mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Najčešća pitanja</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ovdje smo odgovorili na pitanja koja nam kupci najčešće postavljaju.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium hover:bg-accent/40 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 ml-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
