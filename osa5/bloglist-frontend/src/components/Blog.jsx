import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const showIfOwner = { display: removeVisible ? '' : 'none' }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

  const toggleVisible = () => {
    setBlogVisible(!blogVisible)
    if (loggedUser && blog.user.username == loggedUser.username) {
      setRemoveVisible(true)
    } else {
      setRemoveVisible(false)
    }
  }
  
  return (
    <div className='blog'>
      <p>{blog.title} by {blog.author} <button style={hideWhenVisible} className='viewButton' onClick={() => toggleVisible()}>view</button> <button style={showWhenVisible} onClick={() => toggleVisible()}>hide</button></p>
      <div style={showWhenVisible} className='togglable'>
        <p>{blog.url}</p>
        <p id="likeCount">Likes: {blog.likes} <button className='likeButton' onClick={() => handleLike(blog.id, blog)}>like</button></p>
        <p>{blog.user.name}</p>
        <button id="removeButton" style={showIfOwner} onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog