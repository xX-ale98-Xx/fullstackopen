export default function Header({ parts, exerNum }) {
  return (
    <div>
      <p>{parts[0]}: {exerNum[0]}</p>
      <p>{parts[1]}: {exerNum[1]}</p>
      <p>{parts[2]}: {exerNum[2]}</p>
    </div>
  )
}