import { useState, useEffect, useCallback } from 'react'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import StatsCards from './components/StatsCards'
import * as api from './api'

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected']

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadJobs = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await api.fetchJobs()
      setJobs(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load jobs')
      setJobs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadJobs()
  }, [loadJobs])

  const addJob = useCallback(async (job) => {
    try {
      const created = await api.createJob(job)
      setJobs((prev) => [...prev, created])
    } catch (err) {
      setError(err.message || 'Failed to add job')
    }
  }, [])

  const updateJobStatus = useCallback(async (id, status) => {
    try {
      const updated = await api.updateJob(id, { status })
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? updated : j))
      )
    } catch (err) {
      setError(err.message || 'Failed to update status')
    }
  }, [])

  const deleteJob = useCallback(async (id) => {
    try {
      await api.deleteJob(id)
      setJobs((prev) => prev.filter((j) => j.id !== id))
    } catch (err) {
      setError(err.message || 'Failed to delete job')
    }
  }, [])

  const updateJob = useCallback(async (id, updates) => {
    try {
      const updated = await api.updateJob(id, updates)
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? updated : j))
      )
    } catch (err) {
      setError(err.message || 'Failed to update job')
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800/80 bg-slate-900/50 backdrop-blur-xl md:block">
          <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">Job Tracker</span>
          </div>
          <nav className="p-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg bg-emerald-500/10 px-4 py-2.5 text-emerald-400"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="#"
              className="mt-1 flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-slate-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="font-medium">Applications</span>
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:pl-64">
          <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
              <div className="flex h-16 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-3 md:block">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 md:hidden">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                    <p className="hidden text-sm text-slate-400 md:block">
                      Track and manage your job applications
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-4 md:p-8">
              {error && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-center justify-between">
                  <span>{error}</span>
                  <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300" aria-label="Dismiss">×</button>
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                </div>
              ) : (
                <>
                  <StatsCards jobs={jobs} />

                  <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <JobForm onAdd={addJob} statusOptions={STATUS_OPTIONS} />
                    </div>
                    <div className="lg:col-span-2">
                      <JobList
                        jobs={jobs}
                        statusOptions={STATUS_OPTIONS}
                        onUpdateStatus={updateJobStatus}
                        onUpdate={updateJob}
                        onDelete={deleteJob}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
