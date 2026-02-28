export default function QuizForm({ question, onChange, onSubmit, loading, disabled }) {
  function handleSubmit(e) {
    e.preventDefault()
    if (!loading && !disabled) onSubmit()
  }

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <label htmlFor="question">Your Question</label>
      <textarea
        id="question"
        rows={4}
        placeholder="e.g. What is the capital of France?"
        value={question}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || disabled || !question.trim()}>
        {loading ? 'Generating…' : 'Generate Quiz'}
      </button>
    </form>
  )
}
