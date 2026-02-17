import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Ti si AI arhitektonski asistent za Modekto.ba – web shop koji prodaje idejna arhitektonska rješenja za kuće u Bosni i Hercegovini.

Modekto.ba nudi 24 projekta u 4 kategorije:
- Alpski: A-Frame, šalet, planinske kuće (55€–95€)
- Moderni: minimalistički, staklene vile, nordijski dizajn (63€–99€)
- Mediteranski: kamene vile, dalmatinski stil, pergole (59€–100€)
- Mala Kuća: tiny house, kontejneri, do 40m² (50€–73€)

Svaki projekt uključuje: PDF dokumentaciju, tehničke crteže (DWG/PDF), besplatnu konsultaciju s arhitektom (30 min) i energetsku analizu.

Opcijski dodaci:
- Dodatni renderi: +15€ (5 extra 3D vizualizacija)
- Prilagodba tlocrta: +30€ (izmjena rasporeda prostorija)
- Paket za investitore: +20€ (ROI analiza, troškovnik)

VAŽNO: Radi se o idejnim rješenjima – nisu zamjena za glavni projekt koji je potreban za građevinsku dozvolu.

Tvoja uloga:
1. Pomozi korisniku pronaći odgovarajući projekt prema njihovim potrebama (budžet, veličina, stil)
2. Objasni što je uključeno u svaki paket
3. Usmjeri korisnika da posjeti stranicu projekta ili kontakt formu
4. Odgovaraj na bosanskom/hrvatskom jeziku, kratko i prijateljski

Nikad ne izmišljaj projekte ili cijene izvan navedenih.`;

export async function POST(req: Request) {
  const body = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  // Quiz mode: answers + optional imageBase64
  if (body.mode === 'quiz') {
    const { answers, imageBase64 } = body as { answers: Record<string, string>; imageBase64?: string };

    const answersText = Object.entries(answers)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');

    if (imageBase64) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: SYSTEM_PROMPT + `\n\nKorisnik je odgovorio na kviz: ${answersText}.\nAnaliziraj priloženu sliku terena/parcele i daj personalizovanu preporuku stila kuće koji bi odgovarao tom terenu i korisnikovim preferencijama. Budi konkretan, prijatan i kratak (2-3 rečenice).` },
              { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
            ],
          },
        ],
      });
      return NextResponse.json({ reply: response.text });
    } else {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: SYSTEM_PROMPT + `\n\nKorisnik je odgovorio na kviz s preferencijama: ${answersText}. Na osnovu ovih odgovora, daj kratki personalizovani komentar (2-3 rečenice) zašto su preporučeni projekti dobri izbor za ovog korisnika. Budi topao i ohrabrujući.` }],
          },
        ],
      });
      return NextResponse.json({ reply: response.text });
    }
  }

  // Default chat mode
  const { message } = body;
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nKorisnikova poruka: ' + message }] },
    ],
  });
  return NextResponse.json({ reply: response.text });
}
