export default function Header({ exerNum }) {
  const total = exerNum.reduce((sum, curr) => sum + curr, 0)
  
  return (
    <div>
      <p>Total: {total}</p>
    </div>
  )
}