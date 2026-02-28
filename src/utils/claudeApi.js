import Anthropic from '@anthropic-ai/sdk'

export async function generateQuiz(apiKey, question) {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a quiz generator. Given a question, return ONLY valid JSON in this format:
{
  "correct_answer": "...",
  "wrong_answers": ["...", "...", "...", "..."]
}
Generate 1 correct answer and 4 plausible but incorrect answers.
Question: ${question}`,
      },
    ],
  })

  const text = message.content[0].text.trim()
  // Strip markdown code fences if present
  const jsonText = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  const parsed = JSON.parse(jsonText)
  return {
    correct_answer: parsed.correct_answer,
    wrong_answers: parsed.wrong_answers,
  }
}
