import React from 'react'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => {
    return state.blogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)     
      setUsername('')   
      setPassword('')   
    } catch (exception) {
      console.log(exception)
      dispatch(notify(`Wrong credentials`, 5))
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')

      blogService.setToken(null)
      setUser(null)     
    } catch (exception) {
      console.log(exception)
    }
    console.log('logging out')
  }

  const addBlog = async newBlog => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(notify(`created '${newBlog.title}'`, 5))
    } catch (exception) {
      console.log(exception)
    }
    console.log('adding blog', newBlog.title, newBlog.author)
  }

  const handleLike = async (id, blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(notify(`liked '${blog.title}'`, 5))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async blog => {
    if(window.confirm(`Delete blog ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(notify(`removed blog ${blog.title} by ${blog.author}`, 5))
      } catch (exception) {
        console.log(exception)
      }
    }
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <p>username<input id="usernameInput" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/></p>
      </div>
      <div>
        <p>password <input id="passwordInput" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/></p>
      </div>        
      <button type="submit" id="loginButton">login</button>
    </form>      
  )

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id="newBlogButton" onClick={() => setFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm newBlog={addBlog}/>
          <button id="cancelButton" onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const blogList = () => (
    <div>
      <h2>List</h2>
      {blogs.toSorted((a, b) => (a.likes < b.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
      )}
    </div> 
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {!user && loginForm()}
      {user && <div>
        <p id="loggedInAs">Logged in as {user.name} <button id="logoutButton" onClick={handleLogout}>logout</button></p>
        {user && blogForm()}
        {user && blogList()}
      </div>
      }
    </div>
  )
}

export default App