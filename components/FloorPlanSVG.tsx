interface FloorPlanSVGProps {
  floors?: number;
}

export function FloorPlanSVG({ floors = 2 }: FloorPlanSVGProps) {
  return (
    <div className="w-full">
      <div className={`grid gap-6 ${floors >= 2 ? 'md:grid-cols-2' : 'grid-cols-1 max-w-sm mx-auto'}`}>
        {/* Prizemlje */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 text-center">
            Prizemlje
          </p>
          <svg
            viewBox="0 0 220 200"
            className="w-full h-auto"
            role="img"
            aria-label="Tlocrt prizemlja"
          >
            {/* Vanjski zidovi */}
            <rect x="10" y="10" width="200" height="180" fill="none" stroke="currentColor" strokeWidth="3" />

            {/* Vertikalni zid koji dijeli dnevni od kuhinje */}
            <line x1="120" y1="10" x2="120" y2="140" stroke="currentColor" strokeWidth="2" />

            {/* Horizontalni zid koji dijeli kuhinju od kupaonice */}
            <line x1="120" y1="95" x2="210" y2="95" stroke="currentColor" strokeWidth="2" />

            {/* Horizontalni zid – odvaja hodnivk/ulaz od ostatka */}
            <line x1="10" y1="140" x2="210" y2="140" stroke="currentColor" strokeWidth="2" />

            {/* Vrata – prizemlje ulaz (donji zid) */}
            <line x1="90" y1="190" x2="130" y2="190" stroke="var(--background, #fff)" strokeWidth="4" />
            <path d="M90 190 Q90 170 110 170" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />

            {/* Vrata – dnevni boravak → hodnivk */}
            <line x1="55" y1="140" x2="85" y2="140" stroke="var(--background, #fff)" strokeWidth="4" />
            <path d="M55 140 Q55 120 75 120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />

            {/* Vrata – kuhinja → hodnivk */}
            <line x1="130" y1="140" x2="160" y2="140" stroke="var(--background, #fff)" strokeWidth="4" />
            <path d="M130 140 Q130 120 150 120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />

            {/* Vrata – kupaonica */}
            <line x1="120" y1="110" x2="120" y2="135" stroke="var(--background, #fff)" strokeWidth="4" />
            <path d="M120 110 Q140 110 140 130" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />

            {/* Prozori – dnevni boravak (lijevi zid) */}
            <line x1="10" y1="40" x2="10" y2="80" stroke="currentColor" strokeWidth="4" />
            <line x1="10" y1="50" x2="10" y2="70" stroke="var(--background, #fff)" strokeWidth="6" />
            <line x1="10" y1="50" x2="10" y2="70" stroke="currentColor" strokeWidth="1" />

            {/* Prozori – kuhinja (gornji zid) */}
            <line x1="140" y1="10" x2="190" y2="10" stroke="currentColor" strokeWidth="4" />
            <line x1="148" y1="10" x2="182" y2="10" stroke="var(--background, #fff)" strokeWidth="6" />
            <line x1="148" y1="10" x2="182" y2="10" stroke="currentColor" strokeWidth="1" />

            {/* Labele prostorija */}
            {/* Dnevni boravak */}
            <text x="65" y="68" textAnchor="middle" fontSize="8.5" fill="currentColor" fontWeight="600">Dnevni</text>
            <text x="65" y="80" textAnchor="middle" fontSize="8.5" fill="currentColor" fontWeight="600">boravak</text>
            <text x="65" y="92" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">~28 m²</text>

            {/* Kuhinja */}
            <text x="165" y="55" textAnchor="middle" fontSize="8.5" fill="currentColor" fontWeight="600">Kuhinja</text>
            <text x="165" y="67" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">~18 m²</text>

            {/* Kupaonica */}
            <text x="165" y="118" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="600">Kupaonica</text>
            <text x="165" y="130" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">~7 m²</text>

            {/* Hodnivk/Ulaz */}
            <text x="110" y="165" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="600">Ulaz / Hodnik</text>
            <text x="110" y="177" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">~8 m²</text>

            {/* Stube (ako ima sprat) */}
            {floors >= 2 && (
              <>
                <rect x="14" y="143" width="30" height="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                <line x1="14" y1="150" x2="44" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <line x1="14" y1="157" x2="44" y2="157" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <line x1="14" y1="164" x2="44" y2="164" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <line x1="14" y1="171" x2="44" y2="171" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <line x1="14" y1="178" x2="44" y2="178" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <text x="29" y="192" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity="0.5">Stube</text>
              </>
            )}

            {/* Kompas / Sjever */}
            <text x="200" y="195" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.4">N↑</text>
          </svg>
        </div>

        {/* Sprat (samo ako ima 2+ sprata) */}
        {floors >= 2 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 text-center">
              Sprat
            </p>
            <svg
              viewBox="0 0 220 200"
              className="w-full h-auto"
              role="img"
              aria-label="Tlocrt sprata"
            >
              {/* Vanjski zidovi (A-Frame: sužen sprat) */}
              <rect x="10" y="10" width="200" height="160" fill="none" stroke="currentColor" strokeWidth="3" />

              {/* Centralni hodnik */}
              <line x1="10" y1="85" x2="210" y2="85" stroke="currentColor" strokeWidth="2" />

              {/* Vertikalni zid – dijeli 2 sobe */}
              <line x1="110" y1="10" x2="110" y2="85" stroke="currentColor" strokeWidth="2" />

              {/* Stube – dolaze sa prizemlja */}
              <rect x="14" y="88" width="30" height="78" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
              <line x1="14" y1="95" x2="44" y2="95" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="102" x2="44" y2="102" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="109" x2="44" y2="109" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="116" x2="44" y2="116" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="123" x2="44" y2="123" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="130" x2="44" y2="130" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="137" x2="44" y2="137" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="144" x2="44" y2="144" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="151" x2="44" y2="151" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="158" x2="44" y2="158" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <text x="29" y="173" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity="0.5">Stube</text>

              {/* Vrata – Spavaća 1 → hodnik */}
              <line x1="50" y1="85" x2="85" y2="85" stroke="var(--background, #fff)" strokeWidth="4" />
              <path d="M50 85 Q50 65 70 65" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />

              {/* Vrata – Spavaća 2 → hodnik */}
              <line x1="120" y1="85" x2="155" y2="85" stroke="var(--background, #fff)" strokeWidth="4" />
              <path d="M120 85 Q120 65 140 65" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />

              {/* Prozori – Spavaća 1 (lijevi zid) */}
              <line x1="10" y1="30" x2="10" y2="65" stroke="currentColor" strokeWidth="4" />
              <line x1="10" y1="38" x2="10" y2="58" stroke="var(--background, #fff)" strokeWidth="6" />
              <line x1="10" y1="38" x2="10" y2="58" stroke="currentColor" strokeWidth="1" />

              {/* Prozori – Spavaća 2 (desni zid) */}
              <line x1="210" y1="30" x2="210" y2="65" stroke="currentColor" strokeWidth="4" />
              <line x1="210" y1="38" x2="210" y2="58" stroke="var(--background, #fff)" strokeWidth="6" />
              <line x1="210" y1="38" x2="210" y2="58" stroke="currentColor" strokeWidth="1" />

              {/* Labele */}
              {/* Spavaća 1 */}
              <text x="60" y="45" textAnchor="middle" fontSize="8.5" fill="currentColor" fontWeight="600">Spavaća</text>
              <text x="60" y="57" textAnchor="middle" fontSize="8.5" fill="currentColor" fontWeight="600">soba 1</text>
              <text x="60" y="69" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">~18 m²</text>

              {/* Spavaća 2 */}
              <text x="160" y="45" textAnchor="middle" fontSize="8.5" fill="currentColor" fontWeight="600">Spavaća</text>
              <text x="160" y="57" textAnchor="middle" fontSize="8.5" fill="currentColor" fontWeight="600">soba 2</text>
              <text x="160" y="69" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">~16 m²</text>

              {/* Hodnik */}
              <text x="130" y="118" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="600">Hodnik</text>
              <text x="130" y="130" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.6">~8 m²</text>

              {/* Kompas */}
              <text x="200" y="178" textAnchor="middle" fontSize="7" fill="currentColor" opacity="0.4">N↑</text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
