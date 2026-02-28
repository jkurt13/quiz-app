export default function ApiKeyInput({ apiKey, onChange }) {
  return (
    <div className="api-key-section">
      <label htmlFor="api-key">Anthropic API Key</label>
      <input
        id="api-key"
        type="password"
        placeholder="sk-ant-..."
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      <p className="api-key-note">Your key is never stored — it lives only in memory for this session.</p>
    </div>
  )
}
