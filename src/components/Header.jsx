import { Bell, Moon, Plus, Search, Sun } from 'lucide-react'
import { useState } from 'react'
import SearchDropdown from './SearchDropdown'

function Header({ title = 'Dashboard', searchValue = '', onSearchChange, onAddTask, theme = 'light', onToggleTheme, searchResults = [], onTaskSelect }) {
  const isDarkTheme = theme === 'dark'
  const [isFocused, setIsFocused] = useState(false)

  return (
    <header className="topbar">
      <div className="topbar__title-group">
        <p className="eyebrow">Academic planner</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar__actions">
        <div className="search-wrapper">
          <label className="search-box" aria-label="Search tasks">
            <Search size={16} />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search tasks..."
            />
          </label>
          {isFocused && (
            <SearchDropdown 
              tasks={searchResults} 
              searchValue={searchValue}
              onTaskSelect={(task) => {
                onTaskSelect?.(task)
                setIsFocused(false)
              }}
            />
          )}
        </div>

        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <button
          className="icon-button"
          type="button"
          aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={isDarkTheme}
          onClick={onToggleTheme}
        >
          {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="primary-button" type="button" onClick={onAddTask}>
          <Plus size={18} />
          Add Task
        </button>
      </div>
    </header>
  )
}

export default Header
