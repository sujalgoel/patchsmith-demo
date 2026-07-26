// Send an SMS alert to the on-call agent when a P1 ticket lands.
// Uses Twilio Notify to fan out to whatever device the agent registered.
export async function alertOnCall(identity: string, body: string) {
  const res = await fetch(
    `https://notify.twilio.com/v1/Services/${process.env.NOTIFY_SID}/Notifications`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.TWILIO_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ Identity: identity, Body: body }),
    },
  )
  return res.json()
}
