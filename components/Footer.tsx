import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">Modekto.ba</h3>
          <p className="text-sm">
            Vaš partner u kreiranju savršenog utočišta. Nudimo moderna arhitektonska rješenja spremna za realizaciju.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-4">Linkovi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#kolekcija" className="hover:text-primary transition-colors">Kolekcija</Link></li>
            <li><Link href="/kontakt" className="hover:text-primary transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Pravno</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/uvjeti-koristenja" className="hover:text-primary transition-colors">Uvjeti korištenja</Link></li>
            <li><Link href="/politika-privatnosti" className="hover:text-primary transition-colors">Politika privatnosti</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Prijavite se za novosti i posebne ponude.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email adresa" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              OK
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Modekto.ba. Sva prava pridržana.</p>
      </div>
    </footer>
  );
};