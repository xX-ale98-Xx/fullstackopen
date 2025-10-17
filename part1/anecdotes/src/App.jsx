import { useState } from 'react'
import Button from './components/Button'

function createVotes(anecdotes) {
  const votes = {};
  for (const anecdote of anecdotes) {
    votes[anecdote]=0;
  };
  return votes;
};

function findMax(votes){
  let maxAnecdote = '';
  let maxVotes = 0;
  for (const [anecdote, votesNum] of Object.entries(votes)){
    // console.log(maxVotes, votesNum);
    if (votesNum > maxVotes) {
      maxVotes = votesNum;
      maxAnecdote = anecdote;
    }
  };
  return [maxAnecdote, maxVotes];  
};

const App = () => {
    const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [votes, setVotes] = useState(createVotes(anecdotes));
  const [selected, setSelected] = useState(0);
  const [shownVote, setShownVote] = useState(0);
  const [maxVotesAn, setMaxVotesAn] = useState('');
  const [maxVotesNum, setMaxVotesNum] = useState(0);

  const handleNext = (max) => {
    const random = Math.floor(Math.random() * max); setShownVote(votes[anecdotes[random]]); setSelected(random)
  };
  
  const handleVote = (anecdote) => {
    const volatile = {...votes};
    volatile[anecdote]+=1; 
    // console.log('prev: ', votes, 'next: ', volatile); 
    setVotes(volatile);
    setShownVote(volatile[anecdote]);
    const [maxAn, maxVot] = findMax(volatile);
    setMaxVotesAn(maxAn);
    setMaxVotesNum(maxVot);
  };
  ;
  
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Votes: {shownVote}</p>
      <div style={{display: 'flex', gap: '10px'}}>
        <Button text='next anecdote' onClick={() => handleNext(anecdotes.length)}/>
        <Button text='vote' onClick={() => handleVote(anecdotes[selected])}/>
      </div>
      <h1>Anecdote with most votes</h1>
      {maxVotesAn ? <p>"{maxVotesAn}" has {maxVotesNum} votes.</p> : <p>Vote your favorite anecdote!</p>}

      
    </div>
  )
}

export default App