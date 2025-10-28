

export default function Notification({message}) {
  // console.log('maessage from component:',message)
  if (message.type === null) return null;
  let className = null;
  if (message.type === 'notification') className=message.type;
  else if (message.type === 'error') className='errNot';
  // console.log('type:', message.type)
  // console.log('class:',className)
  return ( 
      className && <div className={className}>{message.text}</div> 
  );
}