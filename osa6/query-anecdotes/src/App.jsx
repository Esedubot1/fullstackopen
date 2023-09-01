import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useReducer } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return null
    default:
      return state
  }
}

const App = () => {
  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  
  const notify = (message, time) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, time * 1000);
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const addAnecdote = async (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notify(`created anecdote ${content}`, 5)
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notify(`voted for ${anecdote.content}`, 5)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if(result.isError) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <Notification message={notification}/>
      
        <AnecdoteForm submit={addAnecdote}/>

        {anecdotes.sort((a, b) => (a.votes < b.votes)).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </NotificationContext.Provider>
    </div>
  )
}

export default App
