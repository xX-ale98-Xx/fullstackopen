const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "1"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "2"
    },
    {
      "name": "Ada Love",
      "number": "34-56-234346",
      "id": "3"
    },
    {
      "name": "CiccioGamer",
      "number": "34-56-234346",
      "id": "4"
    }
];

app.get('/', (request, response) => {
  response.send('<h1>Phonebook Backend</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    if (!person) return response.status(404).end();
    response.json(person)
})

app.get('/info', (request, response) => {
  const text = `Phonebook has info for ${persons.length} people.\n${new Date()}`
  response.send(text)
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number){
        return response.status(400).send({error: 'Error: body and number must be present'})
    }

    if (persons.find( p=> p.name === body.name)){
        return response.status(400).json({error: 'Name already present'})
    }

    let id;
    do {
        id = Math.floor(Math.random()*1000);
    }
    while(persons.find(p => Number(p.id) === id));

    const newP = {name: body.name, number: body.number, id: String(id) };
    // console.log(newP);
    persons.push(newP);
    response.status(201).send(newP);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    // console.log(`param id: ${id}`, `person id: ${person.id}`)
    if (!person) return response.status(404).end();
    persons = persons.filter(p => p.id !== id);
    response.status(204).end();
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})