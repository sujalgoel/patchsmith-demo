// Email the customer a receipt when their ticket is resolved.
export async function sendReceipt(to: string, subject: string, html: string) {
  const res = await fetch('https://api.sendgrid.com/api/mail.send.json', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_KEY}`,
      'X-SMTPAPI': JSON.stringify({ category: ['ticket-receipt'] }),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      to,
      subject,
      html,
      from: 'support@acme.test',
    }),
  })
  return res.status
}
