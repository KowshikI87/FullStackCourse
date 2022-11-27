const Note = ({ note, toggleImportance }) => {
  //label. If note.important is true, we should "make not important"
  //else we show "make important"
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note