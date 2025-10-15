
export default function Statistics({text: [averageTxt, totalTxt, positiveTxt], totalVotes, feedbacks}) {
  const average = feedbacks.reduce((acc, curr) => acc + curr.weight*curr.votes, 0)/ (totalVotes || 0) || 0;
  const positive = feedbacks.find(pippo => pippo.name === "good")?.votes || 0;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{totalTxt}</td>
            <td>: {totalVotes}</td>
          </tr>
          <tr>
            <td>{averageTxt}</td>
            <td>: {average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>{positiveTxt}</td>
            <td>: {(positive/totalVotes*100).toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}