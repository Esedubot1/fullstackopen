import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const index = state.findIndex(blog => blog.id === updatedBlog.id)
      if (index !== -1) {
        state.splice(index, 1, updatedBlog)
      }
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = content => {
  return async dispatch => {
    await blogService.create(content)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = {...blog, likes: blog.likes + 1}
    await blogService.update(blog.id, likedBlog)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const { setBlogs, updateBlog } = blogSlice.actions
export default blogSlice.reducer