export const STORAGE_KEY = 'studyflow.tasks'

const isTaskLike = (value) => {
  return value && typeof value === 'object' && 'id' in value
}

export function loadTasks(fallbackTasks = []) {
  if (typeof window === 'undefined') {
    return fallbackTasks
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
      return fallbackTasks
    }

    const parsed = JSON.parse(rawValue)

    if (!Array.isArray(parsed)) {
      return fallbackTasks
    }

    const validTasks = parsed.filter(isTaskLike)
    return validTasks.length > 0 ? validTasks : fallbackTasks
  } catch (error) {
    console.warn('StudyFlow: Unable to read tasks from localStorage.', error)
    return fallbackTasks
  }
}

export function saveTasks(tasks) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const serialized = JSON.stringify(tasks)
    const previousValue = window.localStorage.getItem(STORAGE_KEY)

    if (previousValue === serialized) {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, serialized)
  } catch (error) {
    console.warn('StudyFlow: Unable to save tasks to localStorage.', error)
  }
}
