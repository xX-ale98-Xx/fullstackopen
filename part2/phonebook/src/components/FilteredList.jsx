
export default function FilteredList({filterName, persons}) {
  const filterRegex = new RegExp(filterName, 'i');
  return ( 
    <ul>
        {filterName ? persons.filter(person => person.name.match(filterRegex)).map((person) => <li key={person.id}>{person.name}: {person.number} </li>) : persons.map((person) => <li key={person.id}>{person.name}: {person.number}</li>)}
    </ul>
  )
}