const priorityOrder = {
  High: 3,
  Medium: 2,
  Low: 1,
}

const toValidDate = (value) => {
  if (!value) {
    return Number.POSITIVE_INFINITY
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? Number.POSITIVE_INFINITY : parsed.getTime()
}

export function sortTasks(tasks = [], sortBy = 'dueDateAsc') {
  const sorted = [...tasks]

  switch (sortBy) {
    case 'dueDateLatest':
      return sorted.sort((a, b) => toValidDate(b.dueDate) - toValidDate(a.dueDate))
    case 'priorityHighToLow':
      return sorted.sort((a, b) => {
        const aPriority = priorityOrder[a?.priority] ?? 0
        const bPriority = priorityOrder[b?.priority] ?? 0
        return bPriority - aPriority
      })
    case 'recentlyAdded':
      return sorted.sort((a, b) => {
        const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0
        const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0
        return bTime - aTime
      })
    case 'dueDateAsc':
    default:
      return sorted.sort((a, b) => toValidDate(a.dueDate) - toValidDate(b.dueDate))
  }
}
