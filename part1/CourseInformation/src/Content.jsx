import Part from "./Part"

export default function Content({ parts}) {
  return (
    <div>
      { parts.map((part, i) => (
        <Part key={part.id ?? i} part={part.name} exerNum={part.exercises} />
      )) 
      }
    </div>
  )
}