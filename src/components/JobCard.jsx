import { useState } from 'react'

function JobCard({ job, statusOptions, onUpdateStatus, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [company, setCompany] = useState(job.company)
  const [position, setPosition] = useState(job.position)
  const [status, setStatus] = useState(job.status)
  const [notes, setNotes] = useState(job.notes || '')

  const statusColors = {
    Applied: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Interview: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Offer: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  const statusColor = statusColors[job.status] || 'bg-slate-500/20 text-slate-400'

  const handleSave = () => {
    if (!company.trim() || !position.trim()) return
    onUpdate(job.id, { company: company.trim(), position: position.trim(), status, notes: notes.trim() })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setCompany(job.company)
    setPosition(job.position)
    setStatus(job.status)
    setNotes(job.notes || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-slate-900/60 p-5 shadow-card backdrop-blur-sm transition-all">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">Edit Job</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-auto min-w-[140px] px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-800">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="rounded-lg border border-slate-600 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700/60"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 shadow-card backdrop-blur-sm transition-all hover:border-slate-700/80 hover:shadow-card-hover">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{job.position}</h3>
          <p className="text-slate-400 text-sm mt-0.5">{job.company}</p>
          {job.notes && (
            <p className="text-slate-500 text-sm mt-2 line-clamp-2">{job.notes}</p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <select
            value={job.status}
            onChange={(e) => onUpdateStatus(job.id, e.target.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition ${statusColor}`}
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-800 text-white">
                {opt}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            title="Edit"
            aria-label="Edit job"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Delete"
            aria-label="Delete job"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobCard
