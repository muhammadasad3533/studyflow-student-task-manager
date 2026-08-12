function StudyProgress({ tasks = [], title = 'Study rhythm', color = 'blue' }) {
  const total = tasks.length
  const completed = tasks.filter((task) => task?.completed === true).length
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  const colorClassMap = {
    blue: 'progress-bar',
    orange: 'progress-bar progress-bar--orange',
    green: 'progress-bar progress-bar--green',
  }

  return (
    <div className="summary-panel">
      <div className="panel-header panel-header--compact">
        <div>
          <p className="eyebrow">Progress</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="progress-box">
        <div className="progress-box__row">
          <span>Completed</span>
          <strong>{percentage}%</strong>
        </div>
        <div className={colorClassMap[color] || colorClassMap.blue}>
          <span style={{ width: `${percentage}%` }} />
        </div>
        <p className="progress-meta">{completed}/{total} tasks complete</p>
      </div>
    </div>
  )
}

export default StudyProgress
