import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

/** Draft a reply suggestion for the agent, with visible reasoning. */
export async function draftReply(ticket: string, history: string) {
  const msg = await client.beta.messages.create(
    {
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      thinking: { type: 'enabled', budget_tokens: 2048 },
      messages: [
        {
          role: 'user',
          content: `Ticket:\n${ticket}\n\nHistory:\n${history}\n\nDraft a friendly reply.`,
        },
      ],
    },
    { headers: { 'anthropic-beta': 'interleaved-thinking-2025-05-14' } },
  )
  return msg
}
