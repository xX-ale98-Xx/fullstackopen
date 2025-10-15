import Header from './Header'
import Controls from './Controls'
import Content from './Content'
import Statistics from './Statistics'
import Total from './Total'

import { useState } from 'react'



export default function App(){

  const [goodVotes, setGoodVotes] = useState(0);
  const [neutralVotes, setNeutralVotes] = useState(0);
  const [badVotes, setBadVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  const feedbacks = [
      {name: 'good', weight: 1, votes: goodVotes, handleClick: () => {const gV = goodVotes + 1; setGoodVotes(gV), setTotalVotes(gV + neutralVotes + badVotes)}},
      {name: 'neutral', weight: 0, votes: neutralVotes, handleClick: () => {const nV = neutralVotes + 1; setNeutralVotes(nV), setTotalVotes(nV + goodVotes + badVotes)}},
      {name:'bad', weight: -1, votes: badVotes, handleClick: () => {const bV = badVotes + 1; setBadVotes(bV), setTotalVotes(bV + neutralVotes + goodVotes)}},
  ]

  const statistics = ['average', 'total', 'positive'];

  // console.log(totalVotes)

  return (
    <div>
      <Header title='Give Feedback' />
      <Controls feedbacks={feedbacks}/>      
      <Header title='Statistics' />
      <Content feedbacks={feedbacks}/>
      {totalVotes ? <Statistics text={statistics} feedbacks={feedbacks} totalVotes={totalVotes}/> : <p>No feedback given</p>}
    </div>
  )
}