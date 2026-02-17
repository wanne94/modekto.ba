import { NextResponse } from 'next/server';
import { sendKontaktEmail } from '../../../lib/email';

export async function POST(req: Request) {
  const { ime, email, poruka } = await req.json();

  if (!ime || !email || !poruka) {
    return NextResponse.json({ error: 'Sva polja su obavezna.' }, { status: 400 });
  }

  try {
    await sendKontaktEmail({ ime, email, poruka });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Kontakt email greška:', err);
    return NextResponse.json({ error: 'Slanje nije uspjelo.' }, { status: 500 });
  }
}
