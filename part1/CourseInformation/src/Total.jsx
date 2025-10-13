export default function Total({ parts }) {
  const total = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0)
  
  return (
    <div>
      <p>Total: {total}</p>
    </div>
  )
}