import { useState } from 'react'

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Button = ( {handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anecdote = ( {title, anecdote, totalVotes} ) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{anecdote}</p> 
      <p>has {totalVotes} votes</p>
    </div>
  )
}

const MostPopularAnecdote = ( {allAnecdotes, allAnecdotesPoints} ) => {
  let maxVotes = Math.max(...allAnecdotesPoints)

  if (maxVotes === 0) {
    return (
    <div>
      <h2>Anecdote with most votes</h2>
    </div>
    )
  }

  let mostPopularAnecdoteIdx = allAnecdotesPoints.indexOf(maxVotes)
 
  return (
    <Anecdote title="Anecdote with most votes" anecdote={allAnecdotes[mostPopularAnecdoteIdx]} totalVotes={allAnecdotesPoints[mostPopularAnecdoteIdx]} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [curntPoints, updateScore] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdoteClick = () => {
    let randomInt
    do {
      randomInt = getRandomInt(0, anecdotes.length - 1)
    } while (randomInt === selected);
    setSelected(randomInt)
  }

  const handleVoteClick = () => {
    const copy = [...curntPoints];
    copy[selected] += 1;
    updateScore(copy);
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} totalVotes={curntPoints[selected]}  />
      <Button handleClick={handleNextAnecdoteClick} text="next anecdote" />
      <Button handleClick={handleVoteClick} text="vote" />
      <MostPopularAnecdote allAnecdotes={anecdotes} allAnecdotesPoints={curntPoints}  />
    </div>
  )
}

export default App