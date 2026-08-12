import StatisticsCard from './StatisticsCard'
import StudyProgress from './StudyProgress'

function Dashboard({ stats = [], upcomingTasks = [], tasks = [] }) {
  return (
    <section className="dashboard">
      <div className="dashboard__header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Welcome back! 👋</h2>
        </div>

        <button type="button" className="ghost-button">This week</button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatisticsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
            accent={stat.accent}
          />
        ))}
      </div>

      <div className="summary-row">
        <div className="summary-panel">
          <div className="panel-header panel-header--compact">
            <div>
              <p className="eyebrow">Priority list</p>
              <h2>Upcoming deadlines</h2>
            </div>
          </div>

          <ul className="upcoming-list">
            {upcomingTasks.map((task) => (
              <li key={task.id} className="upcoming-item">
                <div>
                  <strong>{task.title}</strong>
                  <span>{task.subject}</span>
                </div>
                <small>{task.dueDate}</small>
              </li>
            ))}
          </ul>
        </div>

        <StudyProgress tasks={tasks} title="Study rhythm" color="blue" />
      </div>
    </section>
  )
}

export default Dashboard
