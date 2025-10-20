
export default function Form(props) {
  const addName = props.onSubmit;
  const [newName, handleNameChange, newPhone, handlePhoneChange] = props.states;
  return ( 
    <form onSubmit={addName}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', maxWidth: '200px'}}>
        name: <input value={newName} onChange={handleNameChange}/>
        phone: <input value={newPhone} onChange={handlePhoneChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    
  )
}