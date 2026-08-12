const priorityRank = { High: 3, Medium: 2, Low: 1 }

const daysUntil = (taskDate) => {
  if (!taskDate) {
    return Number.POSITIVE_INFINITY
  }

  const date = new Date(taskDate)
  if (Number.isNaN(date.getTime())) {
    return Number.POSITIVE_INFINITY
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const differenceInMs = date.getTime() - today.getTime()
  return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24))
}

export function calculateDashboardStats(tasks = []) {
  const total = tasks.length
  const completed = tasks.filter((task) => task?.completed === true).length
  const pending = tasks.filter((task) => task?.completed !== true).length
  const highPriority = tasks.filter((task) => task?.priority === 'High').length
  const dueWithinSevenDays = tasks.filter((task) => {
    const daysRemaining = daysUntil(task?.dueDate)
    return daysRemaining >= 0 && daysRemaining <= 7
  }).length

  return [
    { label: 'Total Tasks', value: total, detail: 'Across all subjects', accent: 'blue' },
    { label: 'Completed', value: completed, detail: 'Finished tasks', accent: 'green' },
    { label: 'Pending', value: pending, detail: 'Need attention', accent: 'orange' },
    { label: 'High Priority', value: highPriority, detail: 'Urgent tasks', accent: 'purple' },
    { label: 'Due in 7 Days', value: dueWithinSevenDays, detail: 'Next week', accent: 'blue' },
  ]
}

export function calculateDueSoonTasks(tasks = []) {
  return [...tasks]
    .filter((task) => task?.completed !== true)
    .filter((task) => {
      const daysRemaining = daysUntil(task?.dueDate)
      return Number.isFinite(daysRemaining) && daysRemaining >= 0
    })
    .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate))
    .slice(0, 3)
}

export function calculatePrioritySummary(tasks = []) {
  const total = tasks.length || 1
  const completed = tasks.filter((task) => task?.completed === true).length
  return Math.max(0, Math.min(100, Math.round((completed / total) * 100)))
}

export function calculateProgressByType(tasks = []) {
  const types = ['Assignment', 'Project', 'Study']
  return types.map((type) => {
    const matchingTasks = tasks.filter((task) => task?.type === type)
    const total = matchingTasks.length || 1
    const completed = matchingTasks.filter((task) => task?.completed === true).length
    const percent = Math.max(0, Math.min(100, Math.round((completed / total) * 100)))

    return {
      type,
      percent,
    }
  })
}

export function getPriorityRank(priority) {
  return priorityRank[priority] ?? 0
}
