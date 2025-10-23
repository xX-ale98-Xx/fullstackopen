import Person from './Person'
export default function FilteredList({filterName, persons, handleDelete}) {
  const filterRegex = new RegExp(filterName, 'i');
  let list = [];
  filterName ? list = persons.filter(person => person.name.match(filterRegex)) : list = persons;
  // console.log('Persons array: ', persons)
  return ( 
    <ul>
      {list.map( person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
    </ul>
  )
}