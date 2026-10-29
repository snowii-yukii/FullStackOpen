const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = 3000

let entries = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(entries)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const entry = entries.find(entry => entry.id === id)

    if(entry) {
        res.json(entry)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const entryCount = entries.length
    const date = new Date()

    res.send(`
        <div>
            <p>Phonebook has info for ${entryCount} people</p>
            <p>${date}</p>
        </div>
        `)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    entries.filter(entry => entry.id !== id)

    if(entries) {
        res.json(entries)
    } else {
        res.status(204).end()
    }
} )

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    if (entries.some(entry => entry.name === body.name)) {
        return res.status(409).json({
            error: 'name must be unique' 
        })
    }

    const newEntry = {
        id: String(Math.floor(Math.random() * 1000)),
        name: body.name,
        number: body.number
    }

    entries = entries.concat(newEntry)
    res.json(newEntry)
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})