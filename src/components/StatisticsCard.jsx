function StatisticsCard({ label, value, detail, accent = 'blue' }) {
  return (
    <article className={`stat-card stat-card--${accent}`}>
      <p className="stat-card__label">{label}</p>
      <h3>{value}</h3>
      <span>{detail}</span>
    </article>
  )
}

export default StatisticsCard
