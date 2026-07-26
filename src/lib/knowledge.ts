import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Answer a support question from our internal knowledge base.
export async function answerFromDocs(question: string, context: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  const res = await model.generateContent(
    `Use the following docs to answer the agent's question.\n\nDOCS:\n${context}\n\nQUESTION: ${question}`,
  )
  return res.response.text()
}

// Embed a knowledge-base chunk so we can retrieve it later by similarity.
export async function embedChunk(text: string) {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })
  const r = await model.embedContent(text)
  return r.embedding.values
}
