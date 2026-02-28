import { useState } from 'react'
import ApiKeyInput from './components/ApiKeyInput'
import QuizForm from './components/QuizForm'
import AnswerChoices from './components/AnswerChoices'
import ResultBanner from './components/ResultBanner'
import { generateQuiz } from './utils/claudeApi'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [apiKey, setApiKey] = useState('')
  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [choices, setChoices] = useState(null)   // shuffled array of 5 strings
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleGenerate() {
    setError(null)
    setLoading(true)
    setChoices(null)
    setSelected(null)
    setCorrectAnswer(null)
    try {
      const { correct_answer, wrong_answers } = await generateQuiz(apiKey, question)
      const shuffled = shuffle([correct_answer, ...wrong_answers])
      setCorrectAnswer(correct_answer)
      setChoices(shuffled)
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Check your API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setQuestion('')
    setChoices(null)
    setSelected(null)
    setCorrectAnswer(null)
    setError(null)
  }

  return (
    <div className="app">
      <h1>AI Quiz Generator</h1>
      <ApiKeyInput apiKey={apiKey} onChange={setApiKey} />
      {error && <p className="error-msg">{error}</p>}
      {!choices && (
        <QuizForm
          question={question}
          onChange={setQuestion}
          onSubmit={handleGenerate}
          loading={loading}
          disabled={!apiKey.trim()}
        />
      )}
      {choices && selected === null && (
        <AnswerChoices choices={choices} onSelect={setSelected} selected={selected} />
      )}
      {choices && selected !== null && (
        <ResultBanner selected={selected} correctAnswer={correctAnswer} onReset={handleReset} />
      )}
    </div>
  )
}
