import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY })

// Re-rank candidate help-center articles for an incoming ticket.
export async function rerankArticles(query: string, docs: string[]) {
  const res = await cohere.rerank({
    model: 'rerank-english-v2.0',
    query,
    documents: docs,
    topN: 3,
  })
  return res.results
}

// Draft a suggested first reply for the agent to edit.
export async function draftReply(prompt: string) {
  const res = await cohere.chat({ model: 'command-r', message: prompt })
  return res.text
}
