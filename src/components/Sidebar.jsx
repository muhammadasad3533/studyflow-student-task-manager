import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  LayoutGrid,
} from 'lucide-react'

const defaultItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'tasks', label: 'Tasks', icon: ClipboardList },
  { id: 'assignments', label: 'Assignments', icon: BookOpen },
  { id: 'exams', label: 'Exams', icon: CalendarDays },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
]

function Sidebar({ items = defaultItems, activeItem = 'dashboard', onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="brand-mark">S</div>
        <div>
          <p className="brand-label">StudyFlow</p>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Sidebar navigation">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = activeItem === id

          return (
            <button
              key={id}
              type="button"
              className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
              onClick={() => onSelect?.(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
