const express = require('express')

const app = express()
app.use(express.json())

const PORT = 3000

const entries = [
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
    const entry = entries.filter(entry => entry.id !== id)

    if(entry) {
        res.json(entry)
    } else {
        res.status(204).end()
    }
} )

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})