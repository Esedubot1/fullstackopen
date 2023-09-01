import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({ submit }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const notify = (message, time) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, time * 1000);
  }

  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if(content.length < 5) {
      notify('anecdote must be at least 5 characters long', 5)
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
