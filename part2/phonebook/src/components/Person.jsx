

export default function Person({person, handleDelete}) {
  
  return ( 
    <div style={{display:'flex', justifyContent: 'space-between', width: '100%', maxWidth:'300px'}}>
        <li key={person.id}>{person.name}: {person.number} id: {person.id}</li>
        <button id={`button-${person.id}`} onClick={() => handleDelete(person.id)}>Delete</button>        
    </div>
  )
}