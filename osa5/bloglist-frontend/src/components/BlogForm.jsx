import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    newBlog({
      title: title,
      author: author,
      url: url
    })
  }
  
  return (
    <form onSubmit={addBlog}>
      <div>title <input id="titleInput" type="text" value={title} name="Title" className='titleInput' onChange={({ target }) => setTitle(target.value)}/></div>
      <div>author <input id="authorInput" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/></div>
      <div>url <input id="urlInput" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/></div>
      <button id="submitButton" type="submit" className='submitButton'>create</button>
    </form>    
  )  
}

BlogForm.propTypes = {
  newBlog: PropTypes.func.isRequired
}

export default BlogForm