export default function ResultBanner({ selected, correctAnswer, onReset }) {
  const isCorrect = selected === correctAnswer

  return (
    <div className={`result-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
      {isCorrect ? (
        <p>Correct!</p>
      ) : (
        <p>Incorrect — the right answer was: <strong>{correctAnswer}</strong></p>
      )}
      <button className="reset-btn" onClick={onReset}>
        Try another question
      </button>
    </div>
  )
}
