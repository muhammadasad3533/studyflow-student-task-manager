const normalizeText = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '')

export function matchesSearchTerm(task, searchTerm = '') {
  const term = normalizeText(searchTerm)

  if (!term) {
    return true
  }

  const searchableText = [task?.title, task?.description, task?.subject]
    .join(' ')
    .toLowerCase()

  return searchableText.includes(term)
}

export function matchesSection(task, activeSection = 'dashboard') {
  switch (activeSection) {
    case 'assignments':
      return task?.type === 'Assignment'
    case 'exams':
      return task?.type === 'Exam'
    case 'projects':
      return task?.type === 'Project'
    case 'completed':
      return task?.completed === true
    case 'tasks':
    case 'dashboard':
    default:
      return true
  }
}

export function matchesStatusFilter(task, status = 'All') {
  if (status === 'All') {
    return true
  }

  return status === 'Completed' ? task?.completed === true : task?.completed !== true
}

export function matchesPriorityFilter(task, priority = 'All') {
  if (priority === 'All') {
    return true
  }

  return task?.priority === priority
}

export function matchesTypeFilter(task, type = 'All') {
  if (type === 'All') {
    return true
  }

  return task?.type === type
}

export function matchesSubjectFilter(task, subject = 'All subjects') {
  if (!subject || subject === 'All subjects') {
    return true
  }

  return task?.subject === subject
}

export function filterTasks(
  tasks = [],
  {
    searchTerm = '',
    activeSection = 'dashboard',
    filters = {},
  } = {},
) {
  const status = filters.status || 'All'
  const priority = filters.priority || 'All'
  const type = filters.type || 'All'
  const subject = filters.subject || 'All subjects'

  return tasks.filter((task) => {
    return (
      matchesSearchTerm(task, searchTerm) &&
      matchesSection(task, activeSection) &&
      matchesStatusFilter(task, status) &&
      matchesPriorityFilter(task, priority) &&
      matchesTypeFilter(task, type) &&
      matchesSubjectFilter(task, subject)
    )
  })
}
