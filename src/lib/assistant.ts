import OpenAI from 'openai'

const client = new OpenAI()

// Long-lived helpdesk assistant, provisioned once and reused across sessions.
export async function ensureAssistant() {
  const assistant = await client.beta.assistants.create({
    name: 'helpdesk-triage',
    model: 'gpt-4o',
    instructions: 'Triage incoming tickets into billing, technical, or account categories.',
  })
  return assistant.id
}

export async function runTriage(assistantId: string, ticket: string) {
  const thread = await client.beta.threads.create({
    messages: [{ role: 'user', content: ticket }],
  })
  const run = await client.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistantId,
  })
  return run.status
}
