import { useEffect, useState } from 'react'

const allowedTypes = ['Assignment', 'Quiz', 'Exam', 'Project', 'Study']
const allowedPriorities = ['Low', 'Medium', 'High']

const emptyValues = {
  title: '',
  description: '',
  subject: '',
  type: 'Assignment',
  priority: 'Medium',
  dueDate: '',
}

function TaskForm({ mode = 'create', initialValues = {}, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState({ ...emptyValues, ...initialValues })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setFormValues({ ...emptyValues, ...initialValues })
    setErrors({})
  }, [initialValues, mode])

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim() ? '' : 'Title is required.'
      case 'subject':
        return value.trim() ? '' : 'Subject is required.'
      case 'type':
        return allowedTypes.includes(value) ? '' : 'Select a valid task type.'
      case 'priority':
        return allowedPriorities.includes(value) ? '' : 'Select a valid priority.'
      case 'dueDate':
        return value ? '' : 'Due date is required.'
      default:
        return ''
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }))
  }

  const validateForm = () => {
    const nextErrors = {
      title: validateField('title', formValues.title),
      subject: validateField('subject', formValues.subject),
      type: validateField('type', formValues.type),
      priority: validateField('priority', formValues.priority),
      dueDate: validateField('dueDate', formValues.dueDate),
    }

    setErrors(nextErrors)
    return Object.values(nextErrors).every((message) => !message)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit?.({
      ...formValues,
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      subject: formValues.subject.trim(),
      dueDate: formValues.dueDate,
    })
  }

  return (
    <aside className="task-form-panel">
      <div className="panel-header panel-header--compact">
        <div>
          <p className="eyebrow">{mode === 'edit' ? 'Edit task' : 'Add task'}</p>
          <h2>{mode === 'edit' ? 'Update study plan' : 'New task'}</h2>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'task-title-error' : undefined}
            placeholder="e.g. Database assignment"
            className={errors.title ? 'field-input field-input--error' : 'field-input'}
          />
          {errors.title ? (
            <span id="task-title-error" className="field-error" role="alert">
              {errors.title}
            </span>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            rows="4"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Add task details or study notes..."
            className="field-input"
          />
        </div>

        <div className="task-form__row">
          <div className="form-field">
            <label htmlFor="task-subject">Subject</label>
            <input
              id="task-subject"
              type="text"
              name="subject"
              value={formValues.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'task-subject-error' : undefined}
              className={errors.subject ? 'field-input field-input--error' : 'field-input'}
            />
            {errors.subject ? (
              <span id="task-subject-error" className="field-error" role="alert">
                {errors.subject}
              </span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="task-type">Type</label>
            <select
              id="task-type"
              name="type"
              value={formValues.type}
              onChange={handleChange}
              aria-invalid={Boolean(errors.type)}
              aria-describedby={errors.type ? 'task-type-error' : undefined}
              className={errors.type ? 'field-input field-input--error' : 'field-input'}
            >
              {allowedTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type ? (
              <span id="task-type-error" className="field-error" role="alert">
                {errors.type}
              </span>
            ) : null}
          </div>
        </div>

        <div className="task-form__row">
          <div className="form-field">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              name="priority"
              value={formValues.priority}
              onChange={handleChange}
              aria-invalid={Boolean(errors.priority)}
              aria-describedby={errors.priority ? 'task-priority-error' : undefined}
              className={errors.priority ? 'field-input field-input--error' : 'field-input'}
            >
              {allowedPriorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority ? (
              <span id="task-priority-error" className="field-error" role="alert">
                {errors.priority}
              </span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="task-due-date">Due date</label>
            <input
              id="task-due-date"
              type="date"
              name="dueDate"
              value={formValues.dueDate}
              onChange={handleChange}
              aria-invalid={Boolean(errors.dueDate)}
              aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined}
              className={errors.dueDate ? 'field-input field-input--error' : 'field-input'}
            />
            {errors.dueDate ? (
              <span id="task-due-date-error" className="field-error" role="alert">
                {errors.dueDate}
              </span>
            ) : null}
          </div>
        </div>

        <div className="task-form__actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            {mode === 'edit' ? 'Update Task' : 'Save Task'}
          </button>
        </div>
      </form>
    </aside>
  )
}

export default TaskForm
