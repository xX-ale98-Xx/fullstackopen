import { useState, useEffect } from 'react'

import numbers from './services/numbers'

import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/FilteredList'
import Notification from './components/Notification'

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
  // const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState({type: null , text: null});
  // const [error, setError] = useState(null);

  const addName = async (event) => {
    event.preventDefault();

    const repeatedPers = persons.find(
      (person) => person.name.toUpperCase() === newName.toUpperCase()
    );

    try {
      // CASE 1: persona già esistente -> update
      if (repeatedPers) {
        const id = repeatedPers.id;

        if (
          !window.confirm(
            `"${newName}" already exists. Do you want to change the phone number?`
          )
        ) {
          return;
        }

        // WAIT server response
        const updated = await numbers.update(id, {
          name: newName,
          number: newPhone,
        });

        // update local state
        const newPersons = persons
          .filter((p) => p.id !== id)
          .concat(updated);

        setPersons(newPersons);
      }

      // CASE 2: persona nuova -> create
      else {
        const response = await numbers.create({
          name: newName,
          number: newPhone,
        });

        setPersons(persons.concat(response.data));
      }

      // clear form fields
      setNewName("");
      setNewPhone("");

      // SUCCESS NOTIFICATION
      const text = `"${newName}" saved successfully!`;
      setMessage({ type: "notification", text });
      setTimeout(() => setMessage({ type: null, text: null }), 5000);
    } catch (e) {
      console.error("Server error:", e);

      // ERROR NOTIFICATION
      const text = `"${newName}" was already removed from server!`;
      setMessage({ type: "error", text });
      setTimeout(() => setMessage({ type: null, text: null }), 5000);

      // OPTIONAL: remove stale entry from UI
      if (repeatedPers) {
        setPersons(persons.filter((p) => p.id !== repeatedPers.id));
      }
    }
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
      <Notification message={message}/>
      <Form onSubmit={addName} states={[newName, handleNameChange, newPhone, handlePhoneChange]}/>

      <h2>Numbers</h2>
      <List filterName={filterName} persons={persons} handleDelete={removeName}/>

    </div>
  )
};

export default App;