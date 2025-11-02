/* eslint-env node */
// /api/contact.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Portfolio <noreply@your-domain.com>',
      to: 'angelmonoestereo@gmail.com',
      reply_to: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Email send failed' });
  }
}

// // /api/contact.js
// import { Resend } from 'resend';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

//   const { name, email, message } = req.body || {};
//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'Missing fields' });
//   }

//   try {
//     const resend = new Resend(process.env.RESEND_API_KEY);

//     await resend.emails.send({
//       from: 'Portfolio <noreply@your-domain.com>', // mejor con dominio verificado
//       to: 'angelmonoestereo@gmail.com',            // tu correo
//       reply_to: email,
//       subject: `New message from ${name}`,
//       text: `From: ${name} <${email}>\n\n${message}`,
//     });

//     return res.status(200).json({ ok: true });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ error: 'Email send failed' });
//   }
// }
