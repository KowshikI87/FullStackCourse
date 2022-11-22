import { useState } from 'react'

const Button = ( {handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ( {allFeedback} ) => {
  if (Object.keys(allFeedback).length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2> statistics </h2>
      <table>
        {/* need the tbody tag to avoid warning */}
        <tbody>
          <StatisticsLine curntFeedback="good" value={allFeedback["good"]} />
          <StatisticsLine curntFeedback="neutral" value={allFeedback["neutral"]} />
          <StatisticsLine curntFeedback="bad" value={allFeedback["bad"]} />
          <tr>
            <td> all</td>
            <td> {getObjKeysSum(allFeedback)}  </td>
          </tr>
          <tr>
            <td> average</td>
            <td> {getAverageRating(allFeedback)}  </td>
          </tr>
          <tr>
            <td> positive </td>
            <td> {getPositiveRating(allFeedback)}  </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ( {curntFeedback, value} ) => {
  //did not wrap tr in "div" as that would throu warning
  //about having div inside of tr
  return (
    <tr>
      <td>{curntFeedback}</td>
      <td>{value}</td>
    </tr>
  )
}

const getObjKeysSum = (obj) => {
  return Object.keys(obj).reduce((sum, curntKey) => {
    return sum + obj[curntKey];
  }, 0)
}

const getAverageRating = (allFeedback) => {
  if (!allFeedback["good"]) {return 0}

  let totalScore;

  if (!allFeedback["bad"]) {
    totalScore = allFeedback["good"]
  } else {
    totalScore = allFeedback["good"] - allFeedback["bad"]
  }

  return (totalScore / getObjKeysSum(allFeedback)).toFixed(2);
}

const getPositiveRating = (allFeedback) => {
  let positiveRating;
  if (!allFeedback["good"]) {
    positiveRating = 0
  } else {
    positiveRating = allFeedback["good"] / getObjKeysSum(allFeedback)
  }
  return `${(positiveRating* 100).toFixed(2)}%`;
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAll] = useState({})

  const handleGoodClick = () => {
    allFeedback["good"] = good + 1
    setAll(allFeedback)
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    allFeedback["neutral"] = neutral + 1
    setAll(allFeedback)
    setNeutral(neutral+ 1);
  }

  const handleBadClick = () => {
    allFeedback["bad"] = bad + 1
    setAll(allFeedback)
    setBad(bad + 1);
  }

  return (
    <div>
      <h2> give feedback </h2>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics allFeedback={allFeedback} />
    </div>
  )
}

export default App