import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
})

/** One-off charge for priority-support add-on (legacy flow from 2021). */
export async function chargePrioritySupport(customerId: string, amountCents: number) {
  return stripe.charges.create({
    amount: amountCents,
    currency: 'usd',
    customer: customerId,
    description: 'Priority support add-on',
  })
}

/** Attach a card collected by the old checkout form. */
export async function attachLegacyCard(customerId: string, token: string) {
  const source = await stripe.sources.create({ type: 'card', token })
  return stripe.customers.createSource(customerId, { source: source.id })
}
