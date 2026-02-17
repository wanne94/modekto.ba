import { Hero } from '@/components/Hero';
import { ListingGrid } from '@/components/ListingGrid';
import { FAQSection } from '@/components/FAQ';
import { AIPreporukaSection } from '@/components/AIPreporukaSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <main>
        <Hero />
        <ListingGrid />
        <FAQSection />
        <AIPreporukaSection />

        {/* Newsletter sekcija */}
        <section className="py-20 bg-primary/5 border-y border-border">
          <div className="container px-4 md:px-8 mx-auto max-w-2xl text-center">
            <div className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Budite prvi obaviješteni</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Prijavite se na naš newsletter i primajte obavijesti o novim projektima, akcijama i arhitektonskim trendovima.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Vaša email adresa"
                className="flex h-11 w-full sm:w-80 rounded-md border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Pretplati se
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Bez spama. Odjava u bilo kom trenutku.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
