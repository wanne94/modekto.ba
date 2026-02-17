'use client';

import React, { useState } from 'react';
import { Menu, X, Home, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8 mx-auto">
        <a href="/" className="flex items-center gap-2 mr-4">
          <Home className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            Modekto.ba
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Početna</a>
          <a href="/#kolekcija" className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-white text-gray-900 hover:bg-white/90 transition-colors">Idejni projekti</a>
          <a href="/#faq" className="transition-colors hover:text-foreground/80 text-foreground/60">Najčešća pitanja</a>
          <a href="/#ai-preporuka" className="transition-colors hover:text-primary text-primary/80 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Preporuka
          </a>
          <a href="/kontakt" className="transition-colors hover:text-foreground/80 text-foreground/60">Kontakt</a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
             <a href="/admin" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 text-foreground/60 hover:text-foreground/80 hover:bg-accent transition-colors">
               Admin
             </a>
          </div>
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <a href="/#kolekcija" className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold bg-white text-gray-900 hover:bg-white/90 transition-colors w-fit" onClick={() => setIsMenuOpen(false)}>Idejni projekti</a>
            <a href="/#faq" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Najčešća pitanja</a>
            <a href="/#ai-preporuka" className="text-sm font-semibold text-primary flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
              <Sparkles className="w-3.5 h-3.5" />
              AI Preporuka
            </a>
            <a href="/kontakt" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Kontakt</a>
          </nav>
        </div>
      )}
    </header>
  );
};