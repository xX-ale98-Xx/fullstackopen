require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Phone = require("./models/phones");

//const cors = require('cors');
const app = express();

// const corsOptions = {
//   origin: 'http://127.0.0.1:5173',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions));

app.use(express.static("dist"));

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.use(express.json());
// app.use(morgan('tiny'))
app.use(
  morgan((tokens, req, res) => {
    const body = JSON.stringify(req.body);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      body,
    ].join(" ");
  }),
);

app.get("/", (request, response) => {
  response.send("<h1>Phonebook Backend</h1>");
});

app.get("/api/persons", (request, response) => {
  Phone.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Phone.findById(request.params.id).then((phone) => {
    response.json(phone);
  });
});

app.get("/info", (request, response) => {
  const text = `Phonebook has info for ${persons.length} people.\n${new Date()}`;
  response.send(text);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "content missing" });
  }

  const phone = new Phone({
    name: body.name,
    number: body.number,
  });

  phone.save().then((savedPhone) => {
    response.json(savedPhone);
  });
});


app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  // console.log(`param id: ${id}`, `person id: ${person.id}`)
  if (!person) return response.status(404).end();
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
