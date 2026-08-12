import { Check, PencilLine, Trash2 } from 'lucide-react'

function TaskCard({ task, onToggleComplete, onEdit, onDelete, cardRef }) {
  const isCompleted = Boolean(task.completed)
  const statusLabel = isCompleted ? 'Completed' : 'Pending'

  return (
    <article
      ref={cardRef}
      tabIndex={-1}
      className={`task-card ${isCompleted ? 'task-card--done' : ''}`}
    >
      <button
        type="button"
        className={`task-card__check ${isCompleted ? 'task-card__check--done' : ''}`}
        onClick={() => onToggleComplete?.(task.id)}
        aria-label={isCompleted ? 'Mark task as incomplete' : 'Mark task as complete'}
      >
        {isCompleted ? <Check size={14} /> : null}
      </button>

      <div className="task-card__content">
        <div className="task-card__header">
          <h4>{task.title}</h4>
          <span className={`badge badge--${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>

        <div className="task-card__meta">
          <span>{task.subject}</span>
          <span>•</span>
          <span>{task.type}</span>
          <span>•</span>
          <span>{task.dueDate}</span>
        </div>

        <p className="task-card__notes">{task.description}</p>
      </div>

      <div className="task-card__actions">
        <span className={`status-pill status-pill--${statusLabel.toLowerCase().replace(/\s+/g, '-')}`}>
          {statusLabel}
        </span>

        <button type="button" className="mini-button" aria-label="Edit task" onClick={() => onEdit?.(task)}>
          <PencilLine size={14} />
        </button>

        <button type="button" className="mini-button mini-button--danger" aria-label="Delete task" onClick={() => onDelete?.(task.id)}>
          <Trash2 size={14} />
        </button>
      </div>
    </article>
  )
}

export default TaskCard
