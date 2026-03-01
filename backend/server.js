import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const JOBS_FILE = path.join(__dirname, 'jobs.json')

app.use(cors())
app.use(express.json())

function readJobs() {
  const data = fs.readFileSync(JOBS_FILE, 'utf-8')
  return JSON.parse(data)
}

function writeJobs(jobs) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf-8')
}

// GET /jobs
app.get('/jobs', (req, res) => {
  try {
    const jobs = readJobs()
    res.json(jobs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to read jobs' })
  }
})

// POST /jobs
app.post('/jobs', (req, res) => {
  try {
    const { company, position, status, notes } = req.body
    if (!company?.trim() || !position?.trim()) {
      return res.status(400).json({ error: 'Company and position are required' })
    }
    const jobs = readJobs()
    const job = {
      id: crypto.randomUUID(),
      company: company.trim(),
      position: position.trim(),
      status: status || 'Applied',
      notes: notes?.trim() || '',
    }
    jobs.push(job)
    writeJobs(jobs)
    res.status(201).json(job)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create job' })
  }
})

// PUT /jobs/:id
app.put('/jobs/:id', (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const jobs = readJobs()
    const index = jobs.findIndex((j) => j.id === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Job not found' })
    }
    const updated = { ...jobs[index], ...updates }
    jobs[index] = updated
    writeJobs(jobs)
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update job' })
  }
})

// DELETE /jobs/:id
app.delete('/jobs/:id', (req, res) => {
  try {
    const { id } = req.params
    const jobs = readJobs()
    const filtered = jobs.filter((j) => j.id !== id)
    if (filtered.length === jobs.length) {
      return res.status(404).json({ error: 'Job not found' })
    }
    writeJobs(filtered)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete job' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
