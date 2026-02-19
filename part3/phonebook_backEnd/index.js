require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phone = require('./models/phones')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan((tokens, req, res) => {
    const body = JSON.stringify(req.body)
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      body,
    ].join(' ')
  }),
)

app.get('/', (request, response) => {
  response.send('<h1>Phonebook Backend</h1>')
})

app.get('/api/persons', (request, response) => {
  Phone.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then((phone) => {
      if (phone) {
        response.json(phone)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/info', (request, response, next) => {
  Phone.countDocuments({})
    .then((count) => {
      const text = `Phonebook has info for ${count} people.<br>${new Date()}`
      response.send(text)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  Phone.findOne({ name })
    .then((existing) => {
      if (existing) {
        // Se il nome esiste, aggiorna il numero
        existing.number = number
        return existing.save().then((updatedPhone) => {
          response.json(updatedPhone)
        })
      } else {
        // Se non esiste, crea nuovo
        const phone = new Phone({ name, number })
        return phone
          .save()
          .then((savedPhone) => {
            response.json(savedPhone)
          })
          .catch((error) => next(error))
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phone.findById(request.params.id)
    .then((phone) => {
      if (!phone) {
        return response.status(404).end()
      }

      phone.name = name
      phone.number = number

      return phone.save().then((updatedPhone) => {
        response.json(updatedPhone)
      })
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
