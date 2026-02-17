import { Resend } from 'resend';

interface PurchaseEmailParams {
  to: string;
  projectName: string;
  downloadUrl: string;
  upsells: string[];
}

export async function sendPurchaseConfirmationEmail({
  to,
  projectName,
  downloadUrl,
  upsells,
}: PurchaseEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const upsellList = upsells.length > 0
    ? `<ul style="margin:8px 0;padding-left:20px;">${upsells.map(u => `<li>${u}</li>`).join('')}</ul>`
    : '<p style="color:#666;">Bez dodatnih opcija</p>';

  await resend.emails.send({
    from: 'Modekto.ba <noreply@modekto.ba>',
    to,
    subject: `Vaša narudžba – ${projectName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
        <div style="background:#111;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Modekto.ba</h1>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="margin-top:0;">Hvala na kupovini!</h2>
          <p>Vaš projekt <strong>${projectName}</strong> je spreman za preuzimanje.</p>

          <h3>Što ste kupili:</h3>
          <ul style="padding-left:20px;">
            <li>Idejno arhitektonsko rješenje – ${projectName}</li>
          </ul>

          <h3>Dodaci:</h3>
          ${upsellList}

          <div style="text-align:center;margin:32px 0;">
            <a href="${downloadUrl}" style="background:#111;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">
              Preuzmi projekt
            </a>
          </div>

          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin-top:24px;">
            <p style="margin:0 0 8px;font-weight:bold;">Napomena:</p>
            <p style="margin:0;font-size:14px;color:#555;">
              Ovo je idejno arhitektonsko rješenje i ne može se koristiti kao zamjena za glavni projekt.
              Za dobivanje građevinske dozvole potrebno je angažirati ovlaštenog arhitektu koji će izraditi glavni projekt.
            </p>
          </div>

          <h3>Naredni koraci:</h3>
          <ol style="color:#444;line-height:1.8;">
            <li>Pregledajte dokumentaciju projekta</li>
            <li>Kontaktirajte lokalnog arhitektu za izradu glavnog projekta</li>
            <li>Prilagodite projekt prema vašem terenu i potrebama</li>
          </ol>

          <p>Za sva pitanja kontaktirajte nas na <a href="mailto:info@modekto.ba">info@modekto.ba</a></p>
        </div>
        <div style="background:#f0f0f0;padding:16px;text-align:center;font-size:12px;color:#888;">
          © ${new Date().getFullYear()} Modekto.ba – Sva prava pridržana
        </div>
      </div>
    `,
  });
}

interface KontaktEmailParams {
  ime: string;
  email: string;
  poruka: string;
}

export async function sendKontaktEmail({ ime, email, poruka }: KontaktEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Modekto.ba <noreply@modekto.ba>',
    to: process.env.ADMIN_EMAIL!,
    replyTo: email,
    subject: `Nova poruka od ${ime}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2>Nova kontakt poruka</h2>
        <p><strong>Ime:</strong> ${ime}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Poruka:</strong></p>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;">${poruka}</div>
      </div>
    `,
  });
}
