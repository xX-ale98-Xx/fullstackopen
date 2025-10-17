export default function Total({parts}) {
  // const parts = props.parts;
  // console.log('parts:', parts);
  
  const total = parts?.map((part) => part.exercises).reduce((a, b) => a + b, 0)
  
  return (
    <div>
      <p><strong>Total of {total} exercises.</strong></p>
    </div>
  )
}