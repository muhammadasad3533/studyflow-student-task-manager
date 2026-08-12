import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { loadTasks, saveTasks } from './utils/taskStorage'
import { filterTasks } from './utils/taskFilters'
import { sortTasks } from './utils/taskSort'
import { calculateDashboardStats } from './utils/dashboardStats'
import './App.css'

const THEME_STORAGE_KEY = 'studyflow.theme'

const sectionTitles = {
  dashboard: 'Dashboard',
  tasks: 'Tasks',
  assignments: 'Assignments',
  exams: 'Exams',
  projects: 'Projects',
  completed: 'Completed',
}

const initialTasks = [
  {
    id: 1,
    title: 'Algorithms Assignment',
    description: 'Complete the sorting chapter and submit the final report.',
    subject: 'Algorithms',
    type: 'Assignment',
    priority: 'High',
    dueDate: '2026-08-15',
    completed: false,
    createdAt: '2026-08-12T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'Database Quiz Revision',
    description: 'Review normalization and SQL joins before the quiz.',
    subject: 'Database Systems',
    type: 'Quiz',
    priority: 'Medium',
    dueDate: '2026-08-17',
    completed: false,
    createdAt: '2026-08-12T10:00:00.000Z',
  },
  {
    id: 3,
    title: 'Operating Systems Project',
    description: 'Finalize the process scheduling demo and write-up.',
    subject: 'Operating Systems',
    type: 'Project',
    priority: 'High',
    dueDate: '2026-08-20',
    completed: false,
    createdAt: '2026-08-12T11:00:00.000Z',
  },
  {
    id: 4,
    title: 'Discrete Math Practice',
    description: 'Finish the logic exercises for chapter 4.',
    subject: 'Mathematics',
    type: 'Study',
    priority: 'Low',
    dueDate: '2026-08-22',
    completed: true,
    createdAt: '2026-08-12T12:00:00.000Z',
  },
]

function formatDate(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function App() {
  const taskFormRef = useRef(null)
  const taskListRef = useRef(null)
  const taskCardRefs = useRef({})
  const [tasks, setTasks] = useState(() => loadTasks(initialTasks))
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return savedTheme === 'dark' ? 'dark' : 'light'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sortBy, setSortBy] = useState('dueDateAsc')
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    type: 'All',
    subject: 'All subjects',
  })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('create')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const subjectOptions = useMemo(
    () => ['All subjects', ...new Set(tasks.map((task) => task.subject).sort())],
    [tasks],
  )

  // Search results for dropdown - only filters by search term
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return []
    }

    return filterTasks(tasks, {
      searchTerm,
      activeSection: 'tasks', // Show all tasks regardless of section
      filters: {
        status: 'All',
        priority: 'All',
        type: 'All',
        subject: 'All subjects',
      },
    }).slice(0, 10) // Limit to 10 results for dropdown
  }, [tasks, searchTerm])

  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(tasks, {
      searchTerm,
      activeSection,
      filters,
    })

    return sortTasks(filtered, sortBy)
  }, [tasks, searchTerm, filters, activeSection, sortBy])

  useEffect(() => {
    if (!isFormOpen || !taskFormRef.current) return

    taskFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const firstInput = taskFormRef.current.querySelector('input, select, textarea')
    firstInput?.focus()
  }, [isFormOpen, formMode, editingTask])

  useEffect(() => {
    const trimmedSearch = searchTerm.trim()

    // Only scroll if search is active and we have visible tasks
    if (!trimmedSearch || visibleTasks.length === 0) {
      return
    }

    // Find the target task based on search
    const targetTask = visibleTasks[0]
    
    // Use a small delay and requestAnimationFrame to ensure DOM has been updated
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        const targetCard = taskCardRefs.current[targetTask.id]

        if (targetCard) {
          // Scroll directly to the card with smooth behavior
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
          
          // Focus the card for accessibility
          setTimeout(() => {
            targetCard.focus({ preventScroll: true })
          }, 600)
        }
      })
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, visibleTasks, activeSection])

  const handleTaskSelect = (task) => {
    // Switch to tasks view if not already there
    if (activeSection !== 'tasks') {
      setActiveSection('tasks')
    }

    // Clear search to show all tasks, then scroll to selected task
    setSearchTerm('')
    
    // Use setTimeout to allow state update before scrolling
    setTimeout(() => {
      requestAnimationFrame(() => {
        const targetCard = taskCardRefs.current[task.id]
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
          setTimeout(() => {
            targetCard.focus({ preventScroll: true })
          }, 600)
        }
      })
    }, 50)
  }

  const updateFilter = (field, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      status: 'All',
      priority: 'All',
      type: 'All',
      subject: 'All subjects',
    })
  }

  const selectSection = (sectionId) => {
    setActiveSection(sectionId)
  }

  const stats = useMemo(() => {
    const sourceTasks = activeSection === 'dashboard' ? tasks : visibleTasks
    return calculateDashboardStats(sourceTasks)
  }, [tasks, visibleTasks, activeSection])

  const upcomingTasks = useMemo(
    () =>
      [...(activeSection === 'dashboard' ? tasks : visibleTasks)]
        .filter((task) => task.completed !== true)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3)
        .map((task) => ({
          id: task.id,
          title: task.title,
          subject: task.subject,
          dueDate: formatDate(task.dueDate),
        })),
    [tasks, visibleTasks, activeSection],
  )

  const openCreateForm = () => {
    setFormMode('create')
    setEditingTask(null)
    setIsFormOpen(true)
  }

  const openEditForm = (task) => {
    setFormMode('edit')
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleSubmitTask = (taskData) => {
    if (!taskData.title || !taskData.title.trim()) {
      return
    }

    if (formMode === 'edit' && editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskData,
                completed: task.completed ?? false,
                createdAt: task.createdAt ?? new Date().toISOString(),
              }
            : task,
        ),
      )
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
      }

      setTasks((currentTasks) => [newTask, ...currentTasks])
    }

    setIsFormOpen(false)
    setEditingTask(null)
    setFormMode('create')
  }

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const handleToggleComplete = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task

        return {
          ...task,
          completed: !task.completed,
        }
      }),
    )
  }

  return (
    <div className="app-shell">
      <Sidebar activeItem={activeSection} onSelect={selectSection} />

      <main className="main-panel">
        <Header
          title={sectionTitles[activeSection] || 'Dashboard'}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={openCreateForm}
          theme={theme}
          onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
          searchResults={searchResults}
          onTaskSelect={handleTaskSelect}
        />

        <Dashboard stats={stats} upcomingTasks={upcomingTasks} tasks={tasks} />

        <div className="content-grid">
          <TaskList
            tasks={visibleTasks}
            filters={filters}
            sortBy={sortBy}
            subjectOptions={subjectOptions}
            onFilterChange={updateFilter}
            onSortChange={setSortBy}
            onResetFilters={resetFilters}
            onToggleComplete={handleToggleComplete}
            onEdit={openEditForm}
            onDelete={handleDeleteTask}
            taskCardRefs={taskCardRefs}
            taskListRef={taskListRef}
            searchTerm={searchTerm}
          />

          {isFormOpen ? (
            <div ref={taskFormRef}>
              <TaskForm
                mode={formMode}
                initialValues={
                  formMode === 'edit' && editingTask
                    ? editingTask
                    : {
                        title: '',
                        description: '',
                        subject: '',
                        type: 'Assignment',
                        priority: 'Medium',
                        dueDate: '',
                      }
                }
                onSubmit={handleSubmitTask}
                onCancel={() => {
                  setIsFormOpen(false)
                  setEditingTask(null)
                  setFormMode('create')
                }}
              />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}

export default App
