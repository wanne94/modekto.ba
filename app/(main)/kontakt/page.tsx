import { KontaktForma } from '@/components/KontaktForma';

export const metadata = {
  title: 'Kontakt – Modekto.ba',
  description: 'Imate pitanja o projektima ili trebate savjet? Pišite nam – odgovaramo brzo.',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <main className="py-20">
        <div className="container px-4 md:px-8 mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-3">Kontaktirajte nas</h1>
            <p className="text-muted-foreground">
              Imate pitanja o projektima ili trebate savjet? Pišite nam – odgovaramo brzo.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <KontaktForma />
          </div>
        </div>
      </main>
    </div>
  );
}
