const AnecdoteForm = ({ submit }) => {

  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if(content.length < 5) {
      alert('anecdote too short')
      return
    }
    e.target.anecdote.value = ''
    submit(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
