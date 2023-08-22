import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  
  return <div>
    {blog.title} by {blog.author} <button style={hideWhenVisible} onClick={() => setBlogVisible(true)}>view</button> <button style={showWhenVisible} onClick={() => setBlogVisible(false)}>hide</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      {/* <p>{blog.u</p> */}
    </div>
  </div>  
}

export default Blog