import Link from 'next/link';

export default function PolitikaPrivatnosti() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block">
          ← Nazad na početnu
        </Link>
        <h1 className="text-4xl font-bold mb-2">Politika privatnosti</h1>
        <p className="text-muted-foreground mb-10">Zadnje ažuriranje: {new Date().toLocaleDateString('bs-BA')}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground">

          <section>
            <h2 className="text-xl font-bold mb-3">1. Rukovalac podacima</h2>
            <p className="text-muted-foreground leading-relaxed">
              Modekto.ba je odgovoran za obradu vaših osobnih podataka. Za sva pitanja vezana za privatnost možete nas kontaktirati putem forme na stranici ili na email: info@modekto.ba.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Koje podatke prikupljamo</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Podaci pri kupovini:</strong> ime, email adresa, podaci o plaćanju (obrađuje Stripe – mi ih ne pohranjujemo)</li>
              <li><strong>Kontakt forma:</strong> ime, email adresa i sadržaj poruke</li>
              <li><strong>Tehnički podaci:</strong> IP adresa, tip preglednika, stranice koje posjećujete (anonimno putem analytics alata)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Svrha obrade podataka</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Isporuka kupljenih projekata putem emaila</li>
              <li>Odgovaranje na vaše upite i kontakt poruke</li>
              <li>Poboljšanje našeg servisa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Pravna osnova obrade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Obrada podataka vrši se na osnovu: izvršenja ugovora (kupovina), legitimnih interesa (poboljšanje servisa) i vašeg pristanka (kontakt forma).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Dijeljenje podataka s trećim stranama</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vaše podatke ne prodajemo niti dijelimo s trećim stranama, osim s neophodnim servisnim provajderima:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
              <li><strong>Stripe</strong> – obrada plaćanja (vlastita politika privatnosti)</li>
              <li><strong>Resend</strong> – slanje transakcijskih emailova</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Vaša prava (GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Imate pravo:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Pristupa vašim osobnim podacima</li>
              <li>Ispravke netačnih podataka</li>
              <li>Brisanja podataka ("pravo na zaborav")</li>
              <li>Ograničenja obrade</li>
              <li>Prenosivosti podataka</li>
              <li>Prigovora na obradu</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Za ostvarivanje prava kontaktirajte nas na info@modekto.ba.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Čuvanje podataka</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podatke čuvamo onoliko dugo koliko je neophodno za svrhu prikupljanja, ili onoliko dugo koliko zahtijevaju zakonske obveze (najdulje 5 godina za računovodstvene svrhe).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Kolačići (Cookies)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Koristimo isključivo tehničke kolačiće neophodne za funkcionisanje stranice. Ne koristimo kolačiće za praćenje ili reklame.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
