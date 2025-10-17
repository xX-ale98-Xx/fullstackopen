import Part from "./Part"

export default function Content({parts}) {
  return (
    <div>
      <table>
        <tbody>
          { parts.map((part) => (
            // <Part key={part.id ?? i} part={part.name} exerNum={part.exercises} />
            <tr key={part.name}>
              <td>{part.name}</td>
              <td>: {part.exercises}</td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}