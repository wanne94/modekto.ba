import Link from 'next/link';

export default function UvjetiKoristenja() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block">
          ← Nazad na početnu
        </Link>
        <h1 className="text-4xl font-bold mb-2">Uvjeti korištenja</h1>
        <p className="text-muted-foreground mb-10">Zadnje ažuriranje: {new Date().toLocaleDateString('bs-BA')}</p>

        <div className="space-y-8 text-foreground">

          <section>
            <h2 className="text-xl font-bold mb-3">1. O servisu</h2>
            <p className="text-muted-foreground leading-relaxed">
              Modekto.ba je platforma za prodaju idejnih arhitektonskih rješenja. Korištenjem naše stranice prihvatate ove uvjete.
            </p>
          </section>

          <section className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3 text-yellow-800 dark:text-yellow-200">Važan disclaimer – idejno rješenje</h2>
            <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
              Svi projekti na Modekto.ba su <strong>idejna arhitektonska rješenja</strong> i <strong>ne mogu se direktno koristiti za ishodovanje građevinske dozvole</strong>. Idejno rješenje je početna faza projektiranja koja daje viziju objekta, ali nije zamjena za:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-yellow-700 dark:text-yellow-300">
              <li>Idejni projekt (prema lokalnom zakonu o prostornom uređenju)</li>
              <li>Glavni projekt s geotehničkim elaboratom</li>
              <li>Stručni nadzor ovlaštenog arhitekte</li>
            </ul>
            <p className="text-yellow-700 dark:text-yellow-300 mt-3">
              Za realizaciju gradnje obavezno angažirajte ovlaštenog arhitektu koji će prilagoditi projekt vašem terenu i lokalnim propisima.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Što je uključeno u kupovinu</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Kupovinom projekta dobivate:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>PDF dokumentaciju idejnog rješenja</li>
              <li>Tehničke crteže u DWG i PDF formatu</li>
              <li>Energetsku analizu i procjenu</li>
              <li>Besplatnu konzultaciju s arhitektom (30 minuta, online)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Licenca i prava korištenja</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kupovinom projekta dobivate <strong>osobnu, neprenosivu licencu</strong> za korištenje projekta za izgradnju jednog objekta. Zabranjeno je preprodavanje, distribuiranje ili dijeljenje projekta s trećim stranama.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Plaćanje i isporuka</h2>
            <p className="text-muted-foreground leading-relaxed">
              Plaćanje se vrši putem sigurnog Stripe gateway-a. Nakon uspješnog plaćanja, link za preuzimanje šalje se na upisanu email adresu odmah (automatski). Zadržavamo pravo odbiti narudžbu u izuzetnim slučajevima, uz puni povrat sredstava.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Politika povrata</h2>
            <p className="text-muted-foreground leading-relaxed">
              S obzirom na digitalnu prirodu proizvoda, <strong>povrat sredstava nije moguć</strong> nakon preuzimanja projekta, osim u slučaju tehničke greške (dokumenti nisu isporučeni ili su nečitljivi). Zahtjeve za povrat šaljite na info@modekto.ba u roku od 7 dana od kupovine.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Odgovornost</h2>
            <p className="text-muted-foreground leading-relaxed">
              Modekto.ba ne snosi odgovornost za troškove gradnje, greške nastale nepravilnom primjenom projekta, neusklađenost s lokalnim propisima ili štetu nastalu korištenjem projekta bez stručnog nadzora. Korisnik je odgovoran za angažovanje ovlaštenih stručnjaka.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Izmjene uvjeta</h2>
            <p className="text-muted-foreground leading-relaxed">
              Zadržavamo pravo izmjene ovih uvjeta. Značajne izmjene biti će objavljene na ovoj stranici. Nastavak korištenja servisa podrazumijeva prihvatanje izmijenjenih uvjeta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Kontakt</h2>
            <p className="text-muted-foreground leading-relaxed">
              Za sva pitanja: <a href="mailto:info@modekto.ba" className="text-primary underline underline-offset-4">info@modekto.ba</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
