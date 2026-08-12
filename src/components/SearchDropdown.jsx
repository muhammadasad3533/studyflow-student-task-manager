import { useState } from 'react'

function SearchDropdown({ tasks = [], searchValue = '', onTaskSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Show dropdown only if there's a search value and there are matching tasks
  if (!searchValue.trim() || tasks.length === 0) {
    return null
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % tasks.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + tasks.length) % tasks.length)
        break
      case 'Enter':
        event.preventDefault()
        if (tasks[selectedIndex]) {
          onTaskSelect?.(tasks[selectedIndex])
        }
        break
      default:
        break
    }
  }

  return (
    <div className="search-dropdown" onKeyDown={handleKeyDown}>
      <div className="search-dropdown__header">
        <p>{tasks.length} task{tasks.length !== 1 ? 's' : ''} found</p>
      </div>
      <ul className="search-dropdown__list">
        {tasks.map((task, index) => (
          <li key={task.id}>
            <button
              type="button"
              className={`search-dropdown__item ${index === selectedIndex ? 'search-dropdown__item--active' : ''}`}
              onClick={() => onTaskSelect?.(task)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="search-dropdown__item-title">{task.title}</div>
              <div className="search-dropdown__item-meta">
                <span>{task.subject}</span>
                <span>•</span>
                <span>{task.type}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchDropdown
