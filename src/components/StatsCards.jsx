function StatsCards({ jobs }) {
  const counts = {
    Applied: jobs.filter((j) => j.status === 'Applied').length,
    Interview: jobs.filter((j) => j.status === 'Interview').length,
    Offer: jobs.filter((j) => j.status === 'Offer').length,
    Rejected: jobs.filter((j) => j.status === 'Rejected').length,
  }

  const cards = [
    { label: 'Applied', count: counts.Applied, color: 'blue', icon: '📤' },
    { label: 'Interview', count: counts.Interview, color: 'amber', icon: '📅' },
    { label: 'Offer', count: counts.Offer, color: 'emerald', icon: '🎉' },
    { label: 'Rejected', count: counts.Rejected, color: 'red', icon: '✕' },
  ]

  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400',
    amber: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400',
    emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
    red: 'from-red-500/10 to-red-600/5 border-red-500/20 text-red-400',
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, count, color, icon }) => (
        <div
          key={label}
          className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${colorClasses[color]} p-4 shadow-card transition-shadow hover:shadow-card-hover`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                {label}
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums">{count}</p>
            </div>
            <span className="text-2xl opacity-60">{icon}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
