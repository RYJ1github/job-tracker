import { useState } from 'react'

function JobForm({ onAdd, statusOptions }) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Applied')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!company.trim() || !position.trim()) return

    onAdd({
      company: company.trim(),
      position: position.trim(),
      status,
      notes: notes.trim(),
    })

    setCompany('')
    setPosition('')
    setStatus('Applied')
    setNotes('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 shadow-card backdrop-blur-sm transition-shadow hover:shadow-card-hover"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8v8H4V4h8" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-white">Add New Job</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="company" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">
            Company
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Corp"
            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition text-sm"
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">
            Position
          </label>
          <input
            id="position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Software Engineer"
            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition text-sm"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition cursor-pointer text-sm"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-800">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="notes" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">
            Notes <span className="text-slate-600">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes..."
            rows={2}
            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition resize-none text-sm"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/30"
      >
        Add Job
      </button>
    </form>
  )
}

export default JobForm
