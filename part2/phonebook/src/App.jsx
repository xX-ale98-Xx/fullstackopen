import { useState, useEffect } from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/FilteredList'

const App = () => {

  useEffect(() => {
    
    console.log('effect');
    console.log('fetching data...');
    setTimeout(() => {
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Fetched. The response is: ', response.data);
        setPersons(response.data);
      });
    }, 1000);

    
  

  }, []);

  const [persons, setPersons] = useState([]); 
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