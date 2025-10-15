import Button from './Button'

export default function Controls({feedbacks}) {
  return (
    <div style={{display: 'flex', gap: '10px'}}>
        {feedbacks.map((feedback) => <Button key={feedback.name} text={feedback.name} onClick={feedback.handleClick}/>)}
    </div>
  )
}