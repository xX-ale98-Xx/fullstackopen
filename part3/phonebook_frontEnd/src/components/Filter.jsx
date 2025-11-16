
export default function Filter({name: filterName, onChange: handleFilterChange}) {
  
  return ( 
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', maxWidth: '200px'}}>
      Filter the phonebook by name: <input value={filterName} onChange={handleFilterChange}/>
    </div>
    
  )
}