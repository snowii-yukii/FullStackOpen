require('dotenv').config()

const dns = require('node:dns') 
dns.setServers(['8.8.8.8', '1.1.1.1'])

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

mongoose.set('strictQuery', false)

const PORT = process.env.PORT || 3000

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })

app.get('/api/persons', (req, res, next) => {
    Person.find({})
    .then(person => {
        res.json(person)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if(person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date()
            res.send(`
                <div>
                    <p>Phonebook has info for ${count} people</p>
                    <p>${date}</p>
                </div>
            `)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id,
       { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
        if(updatedPerson) {
            res.json(updatedPerson)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})