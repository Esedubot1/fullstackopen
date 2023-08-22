import { useState, useEffect } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const showIfOwner = { display: removeVisible ? '' : 'none' }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

  const toggleVisible = () => {
    setBlogVisible(!blogVisible)
    if (blog.user.username == loggedUser.username) {
      setRemoveVisible(true)
    } else {
      setRemoveVisible(false)
    }
  }
  
  return (
    <div>
      {blog.title} by {blog.author} <button style={hideWhenVisible} onClick={() => toggleVisible()}>view</button> <button style={showWhenVisible} onClick={() => toggleVisible()}>hide</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={() => handleLike(blog.id, blog)}>like</button></p>
        <p>{blog.user.name}</p>
        <button style={showIfOwner} onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog