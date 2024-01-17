import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'title',
  author: 'author',
  url: 'url',
  likes: 0,
  user: {
    username: 'username',
    name:'name',
    id:'64dde11220ff2f032ce7c04d'
  },
  id: '64dde15320ff2f032ce7c054'
}

test('renders title', () => {
  const { container } = render(<Blog blog={blog}/>)

  const element = container.querySelector('.blog')
  expect(element).toBeDefined()
  expect(element).toBeVisible()
  expect(element).toHaveTextContent('title')
})

test('clicking the button shows details', async () => {
  const { container } = render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = container.querySelector('.viewButton')
  console.log('lol' + button)
  await user.click(button)

  const togglable = container.querySelector('.togglable')

  expect(togglable).toBeVisible()
})

test('clicking like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = container.querySelector('.likeButton')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})