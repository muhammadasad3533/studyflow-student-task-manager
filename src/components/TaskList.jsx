import TaskCard from './TaskCard'
import EmptyState from './EmptyState'

const statusOptions = ['All', 'Pending', 'Completed']
const priorityOptions = ['All', 'Low', 'Medium', 'High']
const typeOptions = ['All', 'Assignment', 'Quiz', 'Exam', 'Project', 'Study']
const sortOptions = [
  { value: 'dueDateAsc', label: 'Due date — earliest first' },
  { value: 'dueDateLatest', label: 'Due date — latest first' },
  { value: 'priorityHighToLow', label: 'Priority — high to low' },
  { value: 'recentlyAdded', label: 'Recently added' },
]

function TaskList({
  tasks = [],
  filters = {},
  sortBy = 'dueDateAsc',
  subjectOptions = ['All subjects'],
  onFilterChange,
  onSortChange,
  onResetFilters,
  onToggleComplete,
  onEdit,
  onDelete,
  taskCardRefs,
  taskListRef,
  searchTerm = '',
}) {
  return (
    <section className="task-panel" ref={taskListRef}>
      <div className="panel-header">
        <div>
          <p className="eyebrow">Academic workload</p>
          <h2>Upcoming tasks</h2>
        </div>

        <span className="task-count">{tasks.length} items</span>
      </div>

      <div className="task-toolbar task-toolbar--stacked">
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={filters.status || 'All'}
            onChange={(event) => onFilterChange?.('status', event.target.value)}
            className="filter-select"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">Priority</label>
          <select
            id="priority-filter"
            value={filters.priority || 'All'}
            onChange={(event) => onFilterChange?.('priority', event.target.value)}
            className="filter-select"
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter">Type</label>
          <select
            id="type-filter"
            value={filters.type || 'All'}
            onChange={(event) => onFilterChange?.('type', event.target.value)}
            className="filter-select"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="subject-filter">Subject</label>
          <select
            id="subject-filter"
            value={filters.subject || 'All subjects'}
            onChange={(event) => onFilterChange?.('subject', event.target.value)}
            className="filter-select"
          >
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Sort</label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(event) => onSortChange?.(event.target.value)}
            className="filter-select"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="ghost-button" onClick={onResetFilters}>
          Reset filters
        </button>
      </div>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
              cardRef={(node) => {
                if (!taskCardRefs) return

                if (node) {
                  taskCardRefs.current[task.id] = node
                  return
                }

                delete taskCardRefs.current[task.id]
              }}
            />
          ))
        ) : searchTerm.trim() ? (
          <EmptyState
            title="No tasks found"
            description={`No tasks match your search for "${searchTerm}". Try a different keyword or clear the search.`}
          />
        ) : (
          <EmptyState
            title="No matching tasks"
            description="Try a different keyword or clear the active filters."
          />
        )}
      </div>
    </section>
  )
}

export default TaskList
