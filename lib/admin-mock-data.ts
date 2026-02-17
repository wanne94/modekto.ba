export interface Upit {
  id: string;
  ime: string;
  email: string;
  poruka: string;
  projekat?: string;
  datum: string;
  status: 'novi' | 'odgovoreno' | 'arhivirano';
}

export interface ChatPoruka {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSesija {
  id: string;
  datum: string;
  poruke: ChatPoruka[];
  projekat?: string;
}

export const MOCK_UPITI: Upit[] = [
  {
    id: '1',
    ime: 'Mirsad Hodžić',
    email: 'mirsad.hodzic@gmail.com',
    poruka: 'Zainteresovan sam za projekat Forest Frame A1. Možete li mi dati više informacija o mogućnostima prilagodbe tlocrta?',
    projekat: 'Forest Frame A1',
    datum: '2026-02-15T10:23:00',
    status: 'novi',
  },
  {
    id: '2',
    ime: 'Ana Petrović',
    email: 'ana.petrovic@hotmail.com',
    poruka: 'Htjela bih naručiti projekat Glass Haven. Da li je moguće dodati još jednu spavaću sobu?',
    projekat: 'Glass Haven',
    datum: '2026-02-14T14:45:00',
    status: 'odgovoreno',
  },
  {
    id: '3',
    ime: 'Dino Karić',
    email: 'dino.karic@bih.net',
    poruka: 'Koje su opcije finansiranja dostupne za projekte u kategoriji Mediteranski?',
    datum: '2026-02-13T09:10:00',
    status: 'odgovoreno',
  },
  {
    id: '4',
    ime: 'Jelena Marković',
    email: 'jelena.markovic@yahoo.com',
    poruka: 'Trebam projekt za manju parcelu od oko 500m². Možete li preporučiti nešto iz Mala Kuća kategorije?',
    datum: '2026-02-12T16:30:00',
    status: 'arhivirano',
  },
  {
    id: '5',
    ime: 'Emir Bajramović',
    email: 'emir.b@gmail.com',
    poruka: 'Koliko traje proces od narudžbe do isporuke finalnih crteža?',
    datum: '2026-02-17T08:55:00',
    status: 'novi',
  },
  {
    id: '6',
    ime: 'Sanja Kovačević',
    email: 'sanja.kovacevic@gmail.com',
    poruka: 'Da li nudite projekte prilagođene za gradnju u planinskom terenu? Imam parcelu na 900m nadmorske visine.',
    projekat: 'Alpine Lodge',
    datum: '2026-02-16T11:20:00',
    status: 'novi',
  },
  {
    id: '7',
    ime: 'Haris Zukić',
    email: 'haris.zukic@bih.net',
    poruka: 'Koje su energetske karakteristike projekata sa oznakom A+? Zanimaju me troškovi grijanja.',
    datum: '2026-02-11T13:40:00',
    status: 'arhivirano',
  },
];

export const MOCK_CHAT_SESIJE: ChatSesija[] = [
  {
    id: '1',
    datum: '2026-02-17T09:15:00',
    projekat: 'Forest Frame A1',
    poruke: [
      { id: '1', role: 'user', content: 'Zdravo! Zanima me Forest Frame A1. Kolika je površina?', timestamp: '09:15' },
      { id: '2', role: 'assistant', content: 'Zdravo! Forest Frame A1 je A-Frame kuća površine 85m² sa 2 spavaće sobe i 1 kupatilom. Cijena je 85 KM/m². Da li vas zanima nešto specifično?', timestamp: '09:15' },
      { id: '3', role: 'user', content: 'Može li se dodati garaža?', timestamp: '09:16' },
      { id: '4', role: 'assistant', content: 'Naravno! Svaki projekt je moguće prilagoditi vašim potrebama. Prilagodbu tlocrta, uključujući dodavanje garaže, nudimo kao dodatnu uslugu. Kontaktirajte nas direktno za detalje.', timestamp: '09:16' },
    ],
  },
  {
    id: '2',
    datum: '2026-02-16T14:30:00',
    poruke: [
      { id: '1', role: 'user', content: 'Koji projekti imaju bazen?', timestamp: '14:30' },
      { id: '2', role: 'assistant', content: 'Trenutno u našoj kolekciji projekti nemaju ugrađen bazen u standardnoj verziji, ali za mediteranske projekte kao što su Adriatic Dream ili Mediteran Lux moguće je dodati bazen kroz prilagodbu projekta.', timestamp: '14:30' },
      { id: '3', role: 'user', content: 'Hvala! A koji su najpovoljniji projekti?', timestamp: '14:32' },
      { id: '4', role: 'assistant', content: 'Najpovoljniji projekti su u kategoriji Mala Kuća, s cijenama od 50 KM/m². Tiny Escape (42m²) i Micro Haven su odlična opcija za budžetsku gradnju bez kompromisa u kvaliteti.', timestamp: '14:33' },
    ],
  },
  {
    id: '3',
    datum: '2026-02-15T11:00:00',
    projekat: 'Nordic Cube',
    poruke: [
      { id: '1', role: 'user', content: 'Zanima me Nordic Cube. Šta je uključeno u paket?', timestamp: '11:00' },
      { id: '2', role: 'assistant', content: 'Nordic Cube je minimalistički moderni projekt 65m² s energetskom klasom A+. Paket uključuje arhitektonske nacrte, 3D vizualizacije eksterijera i interijera, te tehničku dokumentaciju za građevinsku dozvolu.', timestamp: '11:01' },
    ],
  },
  {
    id: '4',
    datum: '2026-02-14T16:45:00',
    poruke: [
      { id: '1', role: 'user', content: 'Koji projekat bi preporučili za porodicu s 3 djece?', timestamp: '16:45' },
      { id: '2', role: 'assistant', content: 'Za porodicu s troje djece preporučujem projekte s 4+ spavaće sobe. Odlični izbori su: Alpine Lodge (3 sobe, 110m²), Moderni Farmhouse 4 Sobe (4 sobe, 223m²) ili Mediterranean Villa (4 sobe). Koji stil vam više odgovara?', timestamp: '16:46' },
      { id: '3', role: 'user', content: 'Moderan stil. Koje su opcije?', timestamp: '16:47' },
      { id: '4', role: 'assistant', content: 'U modernom stilu s 4+ sobe: Glass Haven (140m², A klasa), Black Box (4 sobe, 155m²) i Urban Retreat. Svi imaju suvremeni dizajn s otvorenim tlocrtom i velikim ostakljenim površinama.', timestamp: '16:48' },
    ],
  },
];
