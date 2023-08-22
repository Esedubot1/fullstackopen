import React from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState([])
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      const blog = await blogService.create(newBlog)  
      setBlogs(blogs.concat(blog))

      setNotification(`added blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
    console.log('adding blog', newBlog.title, newBlog.author)
  }

  const handleLike = async (id, likedBlog) => {
    try {
      likedBlog.likes += 1
      console.log('new blog:' + likedBlog)
      await blogService.update(likedBlog.id, likedBlog)


      setNotification(`edited blog ${likedBlog.title} by ${likedBlog.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
    console.log('liked blog', likedBlog.title, likedBlog.author)
  }

  const handleRemove = async blog => {
    if(window.confirm(`Delete blog ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id)
        blogs.splice(blogs.indexOf(blog), 1)
  
        setNotification(`removed blog ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (exception) {
        console.log(exception)
      }
      console.log('removed blog', blog.title, blog.author)
    }
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>        
      </div>        
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm newBlog={addBlog}/>
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const blogList = () => (
    <div>
      <h2>List</h2>
      {blogs.sort((a, b) => (a.likes < b.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
      )}
    </div> 
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notification}/>

      {!user && loginForm()}
      {user && <div>
        <p>Logged in as {user.name} <button onClick={handleLogout}>logout</button></p>
        {user && blogForm()}
        {user && blogList()}
      </div>
      }
    </div>
  )
}

export default App