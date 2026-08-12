function EmptyState({ title = 'No tasks match your search', description = 'Try a different keyword or clear the active filters.' }) {
  return (
    <div className="empty-panel">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default EmptyState
