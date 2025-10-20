import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('');
  const [filterName, setFilterName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const filterRegex = new RegExp(filterName, 'i');

  const addName = (event) => {
    event.preventDefault();
    const exist = persons.find(person => person.name.toUpperCase() === newName.toUpperCase());
    exist ? alert(`"${newName}" already exists in the phonebook. Insert a different name.`) : setPersons([...persons, {name: newName, phone: newPhone}]);
  }

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNewName(name);
    // console.log(name);
  }

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setNewPhone(phone);
    // console.log(phone);
  }

  const handleFilterChange = (event) => {
    const name = event.target.value;
    setFilterName(name);
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', maxWidth: '200px'}}>
        Filter the phonebook by name: <input value={filterName} onChange={handleFilterChange}/>
      </div>
      <h2>Add someone to phonebook</h2>
      <form onSubmit={addName}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', maxWidth: '200px'}}>
          name: <input value={newName} onChange={handleNameChange}/>
          phone: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filterName ? persons.filter(person => person.name.match(filterRegex)).map((person) => <li key={person.id}>{person.name}: {person.number} </li>) : persons.map((person) => <li key={person.id}>{person.name}: {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App