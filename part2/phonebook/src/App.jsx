import { useState, useEffect } from 'react'

import numbers from './services/numbers'

import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/FilteredList'

const App = () => {

  useEffect(() => {
      numbers.getAll()
      .then(data => {
        setPersons(data);
      })  
  }, []);

 

  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [filterName, setFilterName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  

  const addName = (event) => {
    event.preventDefault();
    const repeatedPers = persons.find(person => person.name.toUpperCase() === newName.toUpperCase());

    if (repeatedPers){
      const id = repeatedPers.id;
      if (window.confirm(`"${newName}" already exists in the phonebook. Do you want to change the phone number?`)) {
        console.log('put logic')
        numbers.update(id, {name: newName, number: newPhone, id: id});
        const newPersons = persons.filter(p => p.id !== id).concat({name: newName, number: newPhone, id: id});
        setPersons(newPersons);
        setNewName('');
        setNewPhone('');
      };

    } else {

      numbers.create({name: newName, number: newPhone})
      .then(response => {
        // console.log('Posted, response: ', response);
        const newPersons = persons.concat(response.data);
        setPersons(newPersons);
        setNewName('');
        setNewPhone('');
      });

    };   
  };

  const removeName = (id) => {
    
    // console.log(`${id} needs to be canceled`);
    if (window.confirm(`Do you want to cancel this contact?`)) {
      numbers.cancel(id).catch(e => console.log("Contact not deleted. Error: ", e));}
    else {return};
    const newPersons = persons.filter(p => p.id !== id);
    // console.log(newPersons)
    setPersons(newPersons);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNewName(name);
    // console.log(name);
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setNewPhone(phone);
    // console.log('handlePhoneChange:', phone);
  };

  const handleFilterChange = (event) => {
    const name = event.target.value;
    setFilterName(name);
  };


  return (
    <div>

      <h1>Phonebook</h1>
      <Filter name={filterName} onChange={handleFilterChange}/>
      
      <h2>Add someone to phonebook</h2>
      <Form onSubmit={addName} states={[newName, handleNameChange, newPhone, handlePhoneChange]}/>

      <h2>Numbers</h2>
      <List filterName={filterName} persons={persons} handleDelete={removeName}/>

    </div>
  )
};

export default App;