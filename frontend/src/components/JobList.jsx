import JobCard from './JobCard'

function JobList({ jobs, statusOptions, onUpdateStatus, onUpdate, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700/60 bg-slate-900/30 px-8 py-16 text-center backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 text-4xl">
          📋
        </div>
        <p className="text-base font-medium text-slate-400">No applications yet</p>
        <p className="mt-1 text-sm text-slate-500">Add your first job using the form on the left</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">
          Applications
        </h2>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
          {jobs.length} total
        </span>
      </div>
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            statusOptions={statusOptions}
            onUpdateStatus={onUpdateStatus}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default JobList
