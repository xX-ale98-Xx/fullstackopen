import Part from "./Part"

export default function Content({feedbacks}) {
  return (
    <div>
      { feedbacks.map( (feedback, i) => <Part key={feedback.id ?? i} text={feedback.name} votes={feedback.votes} />) }
    </div>
  )
}