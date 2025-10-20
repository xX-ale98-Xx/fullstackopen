import { useState } from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/FilteredList'

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
  

  const addName = (event) => {
    event.preventDefault();
    const newPersons = [...persons, {name: newName, number: newPhone, id: persons.length + 1}];
    const exist = persons.find(person => person.name.toUpperCase() === newName.toUpperCase());
    exist ? alert(`"${newName}" already exists in the phonebook. Insert a different name.`) : setPersons(newPersons);
  }

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNewName(name);
    // console.log(name);
  }

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setNewPhone(phone);
    // console.log('handlePhoneChange:', phone);
  }

  const handleFilterChange = (event) => {
    const name = event.target.value;
    setFilterName(name);
  }


  return (
    <div>

      <h1>Phonebook</h1>
      <Filter name={filterName} onChange={handleFilterChange}/>
      
      <h2>Add someone to phonebook</h2>
      <Form onSubmit={addName} states={[newName, handleNameChange, newPhone, handlePhoneChange]}/>

      <h2>Numbers</h2>
      <List filterName={filterName} persons={persons}/>

    </div>
  )
}

export default App