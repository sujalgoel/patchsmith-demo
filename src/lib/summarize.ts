import OpenAI from 'openai'

const client = new OpenAI()

/** Summarize a support ticket thread for the agent view. */
export async function summarizeTicket(thread: string) {
  const res = await client.chat.completions.create({
    model: 'o1-preview',
    max_tokens: 400,
    messages: [
      { role: 'system', content: 'Summarize this support thread in 3 bullet points.' },
      { role: 'user', content: thread },
    ],
  })
  return res.choices[0]?.message?.content ?? ''
}

/** Extract sentiment for the dashboard widget. */
export async function ticketSentiment(text: string) {
  const res = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 10,
    messages: [{ role: 'user', content: `Sentiment (positive/neutral/negative): ${text}` }],
  })
  return res.choices[0]?.message?.content?.trim().toLowerCase() ?? 'neutral'
}
