import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ListingGrid } from './components/ListingGrid';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Header />
      <main>
        <Hero />
<ListingGrid />
        
        {/* Features/Trust Section */}
        <section id="o-nama" className="py-16 bg-muted/20">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Trenutna Dostava</h3>
                <p className="text-muted-foreground">Preuzmite kompletnu dokumentaciju (DWG, PDF) odmah nakon kupnje.</p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Profesionalni Dizajn</h3>
                <p className="text-muted-foreground">Svi projekti su izrađeni od strane ovlaštenih arhitekata s godinama iskustva.</p>
              </div>
              <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Fleksibilnost</h3>
                <p className="text-muted-foreground">Uz svaki projekt dobivate i savjete za moguće modifikacije prema vašem terenu.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;