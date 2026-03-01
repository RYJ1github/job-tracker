const API_BASE = '/api'

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || res.statusText)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function fetchJobs() {
  const res = await fetch(`${API_BASE}/jobs`)
  return handleResponse(res)
}

export async function createJob(job) {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  })
  return handleResponse(res)
}

export async function updateJob(id, updates) {
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  return handleResponse(res)
}

export async function deleteJob(id) {
  const res = await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' })
  return handleResponse(res)
}
