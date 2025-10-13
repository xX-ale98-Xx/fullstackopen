import Part from "./Part"

export default function Content({ parts, exerNum }) {
  return (
    <div>
      { parts.map((part, i) => (
        <Part key={part.id ?? i} part={part} exerNum={exerNum[i]} />
      )) 
      }
    </div>
  )
}