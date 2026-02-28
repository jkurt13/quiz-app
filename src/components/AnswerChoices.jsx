export default function AnswerChoices({ choices, onSelect, selected }) {
  return (
    <div className="answer-choices">
      <p className="choices-label">Choose the correct answer:</p>
      {choices.map((choice, i) => (
        <button
          key={i}
          className={`choice-btn ${selected === choice ? 'selected' : ''}`}
          onClick={() => onSelect(choice)}
          disabled={selected !== null}
        >
          {choice}
        </button>
      ))}
    </div>
  )
}
